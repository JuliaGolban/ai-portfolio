import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

// Синхронізовано з briefQuestionsTranslations в translations.js
const SYSTEM_PROMPT = `Ти - AI-асистент Юлії (@juliagolban), яка займається AI-генерацією фото та відео для комерційних клієнтів.

Твоє завдання - зібрати бриф. Веди розмову природньо, по-українськи або мовою клієнта (укр/рос/англ). Задавай питання по одному. Збери такі параметри:

1. ТИП ПРОЕКТУ - запропонуй клієнту обрати з варіантів:
   Фото: Персональна фотосесія (Звичайна $30 / Преміум $55 / Кінематографічна $100)
   AI Модель + продукт: Mini 5 фото $80 / Full 8 фото $150 / Campaign 15 фото $250
   Предметна зйомка: Одиночний кадр $40 / Серія 5-7 $120 / Surreal Edit $90
   Інші зображення: Одне $30-55 / Серія 5+ від $120
   Відео: З ефектом $40 / Product Loop $80 / Reels-TikTok $150 / Fashion Film $300
   Кампанія: Starter $450 / Full $900 / Custom за запитом

2. МЕТА: Продаж / Впізнаваність бренду / Презентація колекції / Анонс акції / Контент для соцмереж / Освітній контент / Інше
3. СТИЛЬ: Dark editorial / Floral-Romantic / Skin close-up / Brutalist-Architectural / Golden hour-Cinematic / Surreal-Conceptual / Minimalist-Clean / Luxury-Opulent / Wellness-Spa / Food-Lifestyle
4. ФОРМАТ: Reels-Stories-TikTok 9:16 / Instagram-Facebook 4:5 / Square 1:1 / YouTube 16:9 / Print-Web / Custom
5. ТОН: Легкий / Трендовий / Експертний / Розкішний Luxury / Мінімалістичний / Креативний
6. ОБ'ЄКТИ У КАДРІ - конкретні продукти, люди, техніка
7. НАСТРІЙ - емоція та атмосфера
8. КОЛЬОРИ - палітра та акценти
9. ОСВІТЛЕННЯ - тип освітлення
10. РЕФЕРЕНСИ - посилання або опис
11. ДЕДЛАЙН І БЮДЖЕТ

Якщо клієнт надсилає зображення або PDF — проаналізуй їх і прокоментуй як референс: що бачиш, який стиль, настрій, колір, освітлення. Потім продовжуй збирати бриф.

Після збору всіх параметрів підсумуй і запитай чи все вірно. Якщо клієнт підтвердив - поверни ТІЛЬКИ JSON без зайвого тексту:

{"complete":true,"summary":"2-3 речення для клієнта","visual_description":"як виглядатиме результат зрозумілою мовою","prompt_image":"промпт для Midjourney/SD","prompt_video":"промпт для Runway/Kling або null","client_brief":"повний бриф для архіву"}

Якщо бриф не зібраний - продовжуй діалог, НЕ повертай JSON.`;

// content може бути: string | { text, file: { base64, mimeType } }
function toGeminiParts(content) {
  if (typeof content === 'string') {
    return [{ text: content }];
  }
  const parts = [];
  if (content.text) parts.push({ text: content.text });
  if (content.file) {
    parts.push({
      inlineData: {
        mimeType: content.file.mimeType,
        data: content.file.base64,
      },
    });
  }
  return parts;
}

async function withRetry(fn, retries = 3, delayMs = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      const isRetryable =
        err?.status === 503 ||
        err?.status === 529 ||
        err?.message?.includes('503') ||
        err?.message?.includes('overloaded');
      if (isRetryable && i < retries - 1) {
        await new Promise(r => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
}

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // History — всі повідомлення крім останнього
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: toGeminiParts(m.content),
    }));

    const lastMessage = messages[messages.length - 1];
    const chat = model.startChat({ history });

    const reply = await withRetry(async () => {
      const parts = toGeminiParts(lastMessage.content);
      const result = await chat.sendMessage(parts);
      return result.response.text();
    });

    return Response.json({ reply });
  } catch (err) {
    console.error('[brief-chat API]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
