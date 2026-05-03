// import Groq from 'groq-sdk';
// const groq = new Groq({ apiKey: process.env.GROQ_KEY });
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const SYSTEM_PROMPT = `Ти - AI-асистент Юлії (@julia.neural), яка займається AI-генерацією фото та відео для комерційних клієнтів.

Твоє завдання - зібрати бриф. Веди розмову природньо, по-українськи або мовою клієнта (укр/рос/англ). Задавай питання по одному. Збери такі параметри:

ПОРЯДОК ЗБОРУ ДАНИХ — СУВОРО ДОТРИМУЙСЯ:
КРОК 1 — КОНТАКТНІ ДАНІ (зібрати першими, по одному):
- Ім'я клієнта
- Телефон або зручний спосіб зв'язку (Telegram, WhatsApp тощо)
- Посилання на сайт або сторінку в соцмережах (для аналізу стилю та місії бренду)
 
Після отримання посилання — коротко прокоментуй: який стиль бачиш, яка аудиторія, яка місія бренду (1-2 речення). Потім переходь до КРОКУ 2.
 
КРОК 2 — ПАРАМЕТРИ ПРОЕКТУ (по одному питанню):
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
6. ОБ'ЄКТИ У КАДРІ - конкретні продукти, люди, техніка, які деталі підкреслити (логотип,етикетки, шви, тканини в русі, брендова упаковка).
7. НАСТРІЙ - емоція та атмосфера
8. КОЛЬОРИ - палітра та акценти
9. ОСВІТЛЕННЯ - тип освітлення
10. РЕФЕРЕНСИ - посилання або опис. Якщо клієнт надсилає зображення - проаналізуй стиль, настрій, колір, освітлення і прокоментуй як референс. Чи потрібні текст/скрипт/субтитри?
11. (Тільки для відео) ДИНАМІКА - рух камери, об'єктів, ефекти (зум, панорамування, слоу-мо, таймлапс, анімація). Чи потрібен текст/озвучка/музика? Якщо так - які побажання/якою мовою?
12. ДЕДЛАЙН - коли потрібен результат
13. ЗАБОРОНИ ТА ПОБАЖАННЯ - що категорично не можна, які є обмеження (наприклад, заборона на певні кольори, стилі, елементи). Чи є особливі побажання щодо композиції, ракурсів, фону?

Після збору всіх параметрів підсумуй текстом і запитай чи все вірно. Чекай явного підтвердження ("так", "вірно", "підтверджую" або аналог).
ТІЛЬКИ після підтвердження поверни JSON і більше нічого:

{"complete":true,"client_name":"ім'я клієнта","client_contact":"телефон або TG","client_url":"посилання на сайт/соцмережі","summary":"2-3 речення для клієнта","visual_description":"як виглядатиме результат зрозумілою мовою","prompt_image":"промпт для Midjourney/SD","prompt_video":"промпт для Runway/Kling або null","client_brief":"повний бриф для архіву з усіма 14 пунктами"}
 
ВАЖЛИВО: НЕ повертай JSON поки клієнт явно не підтвердив підсумок.`;

// Groq не підтримує файли нативно — конвертуємо content у текст
// content може бути: string | { text, file: { base64, mimeType } }
function contentToText(content) {
  // if (typeof content === 'string') return content;
  if (typeof content === 'string') {
    return [{ text: content }];
  }
  const parts = [];
  // if (content.text) parts.push(content.text);
  if (content.text) parts.push({ text: content.text });
  if (content.file) {
    // parts.push(`[Клієнт надіслав файл: ${content.file.mimeType}]`);
    parts.push({
      inlineData: {
        mimeType: content.file.mimeType,
        data: content.file.base64,
      },
    });
  }
  // return parts.join('\n');
  return parts;
}

async function withRetry(fn, retries = 3, delayMs = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      const isRetryable =
        err?.status === 503 ||
        err?.status === 529 ||
        err?.status === 429 ||
        err?.message?.includes('503') ||
        err?.message?.includes('overloaded');
      if (isRetryable && i < retries - 1) {
        await new Promise(r => setTimeout(r, delayMs * (i + 1)));
        continue;
      }
      throw err;
    }
  }
}

// ─── Надсилання брифу в Telegram ─────────────────────────────────────────────
async function sendToTelegram(brief) {
  const token = process.env.NEXT_PUBLIC_TG_BOT_TOKEN;
  const adminId = process.env.NEXT_PUBLIC_TG_CHAT_ID;
  if (!token || !adminId) return;

  const text = [
    '📋 *Новий бриф з сайту*',
    '',
    `👤 *Клієнт:* ${brief.client_name || '—'}`,
    `📞 *Контакт:* ${brief.client_contact || '—'}`,
    `🔗 *Сайт/Соцмережі:* ${brief.client_url || '—'}`,
    '',
    `📝 *Резюме:*\n${brief.summary}`,
    '',
    `🎨 *Візуал:*\n${brief.visual_description}`,
    '',
    `📄 *Повний бриф:*\n${brief.client_brief}`,
    '',
    `🖼 *Image prompt:*\n\`${brief.prompt_image}\``,
    brief.prompt_video ? `\n🎬 *Video prompt:*\n\`${brief.prompt_video}\`` : '',
  ]
    .filter(Boolean)
    .join('\n');

  // Telegram має ліміт 4096 символів — ділимо якщо треба
  const chunks = [];
  for (let i = 0; i < text.length; i += 4000) {
    chunks.push(text.slice(i, i + 4000));
  }

  for (const chunk of chunks) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: adminId,
        text: chunk,
        parse_mode: 'Markdown',
      }),
    });
  }
}

// // ─── Надсилання брифу на email через EmailJS ──────────────────────────────────
// async function sendToEmail(brief) {
//   const svc = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
//   const tpl = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE; // той самий темплейт що й форма
//   const key = process.env.NEXT_PUBLIC_EMAILJS_KEY;
//   if (!svc || !tpl || !key) return;

//   await fetch('https://api.emailjs.com/api/v1.0/email/send', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       service_id: svc,
//       template_id: tpl,
//       user_id: key,
//       template_params: {
//         client_name: brief.client_name || '—',
//         client_contact: brief.client_contact || '—',
//         client_url: brief.client_url || '—',
//         summary: brief.summary,
//         visual_desc: brief.visual_description,
//         client_brief: brief.client_brief,
//         prompt_image: brief.prompt_image,
//         prompt_video: brief.prompt_video || '—',
//       },
//     }),
//   });
// }

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
      parts: contentToText(m.content),
    }));

    const lastMessage = messages[messages.length - 1];
    const chat = model.startChat({ history });

    const reply = await withRetry(async () => {
      //   const completion = await groq.chat.completions.create({
      //     model: 'llama-3.3-70b-versatile',
      //     max_tokens: 2000,
      //     temperature: 0.7,
      //     messages: [
      //       { role: 'system', content: SYSTEM_PROMPT },
      //       ...messages.map(m => ({
      //         role: m.role === 'assistant' ? 'assistant' : 'user',
      //         content: contentToText(m.content),
      //       })),
      //     ],
      //   });
      //   return completion.choices[0].message.content;
      // });

      const parts = toGeminiParts(lastMessage.content);
      const result = await chat.sendMessage(parts);
      return result.response.text();
    });

    // Якщо відповідь містить завершений бриф — надсилаємо нотифікації
    try {
      const start = reply.indexOf('{');
      const end = reply.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        const parsed = JSON.parse(reply.slice(start, end + 1));
        if (parsed.complete === true) {
          // Надсилаємо паралельно, не блокуємо відповідь клієнту
          Promise.all([
            sendToTelegram(parsed).catch(e => console.error('[TG]', e)),
            // sendToEmail(parsed).catch(e => console.error('[Email]', e)),
          ]);
        }
      }
    } catch (_) {}

    return Response.json({ reply });
  } catch (err) {
    console.error('[brief-chat API]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
