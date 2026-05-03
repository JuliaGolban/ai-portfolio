'use client';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Reveal from '../shared/Reveal';
import { SectionTitle } from '../shared/shared.styled';
import {
  ContactSection,
  ContactLayout,
  ContactLeft,
  ContactTitle,
  ContactSub,
  SocialLinks,
  SocialLink,
  BriefForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  PackageGrid,
  PackageCard,
  PackageCardTitle,
  PackageCardPrice,
  CheckboxGroup,
  CheckboxLabel,
  FileUploadArea,
  FileUploadText,
  FileUploadName,
  SubmitBtn,
  FormStatus,
} from './Brief.styled';

export default function Brief({ lang, t, contact, briefQuestions }) {
  const { projectTypes, goals, formats, styles, tones } = briefQuestions[lang];

  const EMPTY = {
    name: '',
    email: '',
    telegram: '',
    website: '',
    brandName: '',
    brandDesc: '',
    packageId: '',
    goal: '',
    format: '',
    tone: '',
    styles: [],
    details: '',
    textNeeded: '',
    references: '',
    accents: '',
    videoDynamic: '',
    deadline: '',
    restrictions: '',
    tzFile: null,
  };

  const [fields, setFields] = useState(EMPTY);
  const [status, setStatus] = useState(null);
  const fileRef = useRef(null);

  const set = (k, v) => setFields(f => ({ ...f, [k]: v }));
  const toggleStyle = s =>
    set(
      'styles',
      fields.styles.includes(s)
        ? fields.styles.filter(x => x !== s)
        : [...fields.styles, s],
    );

  const selectedPkg = projectTypes.find(p => p.id === fields.packageId);
  const autoPrice = selectedPkg ? selectedPkg.price : '—';
  const autoLabel = selectedPkg ? selectedPkg.label : '—';
  const isVideoType =
    selectedPkg?.group === 'video' || selectedPkg?.group === 'campaign';

  const handleFile = e => {
    if (e.target.files[0]) set('tzFile', e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    const lines = [
      `NEW REQUEST [${lang.toUpperCase()}] — Julia Golban`,
      '',
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `TG: ${fields.telegram || '—'}`,
      `Website/Social: ${fields.website || '—'}`,
      '',
      `Brand: ${fields.brandName || '—'}`,
      `About: ${fields.brandDesc || '—'}`,
      '',
      `Package: ${autoLabel} · ${autoPrice}`,
      '',
      `Goal: ${fields.goal || '—'}`,
      `Format: ${fields.format || '—'}`,
      `Tone: ${fields.tone || '—'}`,
      `Style: ${fields.styles.join(', ') || '—'}`,
      '',
      `Details: ${fields.details || '—'}`,
      `Text needed: ${fields.textNeeded || '—'}`,
      `References: ${fields.references || '—'}`,
      `Video dynamics: ${fields.videoDynamic || '—'}`,
      '',
      `Deadline: ${fields.deadline || '—'}`,
      `Restrictions: ${fields.restrictions || '—'}`,
      '',
      `File: ${fields.tzFile ? fields.tzFile.name : '—'}`,
    ];

    try {
      const TG_BOT = process.env.NEXT_PUBLIC_TG_BOT_TOKEN;
      const TG_CHAT = process.env.NEXT_PUBLIC_TG_CHAT_ID;
      if (TG_BOT && TG_CHAT) {
        await fetch(`https://api.telegram.org/bot${TG_BOT}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TG_CHAT, text: lines.join('\n') }),
        });
        if (fields.tzFile) {
          const fd = new FormData();
          fd.append('chat_id', TG_CHAT);
          fd.append('document', fields.tzFile);
          fd.append('caption', `File from ${fields.name} · ${autoLabel}`);
          await fetch(`https://api.telegram.org/bot${TG_BOT}/sendDocument`, {
            method: 'POST',
            body: fd,
          });
        }
      }

      // const EJS_SVC = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
      // const EJS_TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
      // const EJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY;
      // if (EJS_SVC && EJS_TPL && EJS_KEY) {
      //   const { default: emailjs } = await import('@emailjs/browser');
      //   await emailjs.send(
      //     EJS_SVC,
      //     EJS_TPL,
      //     {
      //       from_name: fields.name,
      //       from_email: fields.email,
      //       telegram: fields.telegram || '—',
      //       website: fields.website || '—',
      //       brand_name: fields.brandName || '—',
      //       brand_desc: fields.brandDesc || '—',
      //       package_label: autoLabel,
      //       package_price: autoPrice,
      //       goal: fields.goal || '—',
      //       format: fields.format || '—',
      //       tone: fields.tone || '—',
      //       styles: fields.styles.join(', ') || '—',
      //       details: fields.details || '—',
      //       text_needed: fields.textNeeded || '—',
      //       references: fields.references || '—',
      //       video_dynamic: fields.videoDynamic || '—',
      //       deadline: fields.deadline || '—',
      //       restrictions: fields.restrictions || '—',
      //       tz_filename: fields.tzFile ? fields.tzFile.name : '—',
      //       lang: lang.toUpperCase(),
      //     },
      //     EJS_KEY,
      //   );
      // }

      setStatus('ok');
      setFields(EMPTY);
      if (fileRef.current) fileRef.current.value = '';
    } catch {
      setStatus('err');
    }
  };

  const tb = t.brief;

  return (
    <ContactSection id="contact">
      <ContactLayout>
        <Reveal>
          <ContactLeft>
            <ContactTitle>
              {t.contact.title.split('\n').map((l, i) => (
                <React.Fragment key={i}>
                  {l}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
            </ContactTitle>
            <ContactSub>
              {t.contact.sub.split('\n').map((l, i) => (
                <React.Fragment key={i}>
                  {l}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
            </ContactSub>
            <SocialLinks>
              <SocialLink href={contact.instagram} target="_blank">
                Instagram
              </SocialLink>
              <SocialLink href={contact.telegram} target="_blank">
                Telegram
              </SocialLink>
              <SocialLink href={`mailto:${contact.email}`}>
                {contact.email}
              </SocialLink>
            </SocialLinks>
          </ContactLeft>
        </Reveal>

        <Reveal delay={0.15}>
          <BriefForm onSubmit={handleSubmit}>
            {/* ── Контактні дані ── */}
            <FormGroup>
              <FormLabel>{tb.name}</FormLabel>
              <FormInput
                required
                placeholder={tb.namePh}
                value={fields.name}
                onChange={e => set('name', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.email}</FormLabel>
              <FormInput
                required
                type="email"
                placeholder={tb.emailPh}
                value={fields.email}
                onChange={e => set('email', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.telegram}</FormLabel>
              <FormInput
                placeholder={tb.telegramPh}
                value={fields.telegram}
                onChange={e => set('telegram', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                {tb.website ||
                  (lang === 'ua'
                    ? 'Сайт або сторінка в соцмережах'
                    : 'Website or social page')}
              </FormLabel>
              <FormInput
                placeholder={lang === 'ua' ? 'https://...' : 'https://...'}
                value={fields.website}
                onChange={e => set('website', e.target.value)}
              />
            </FormGroup>

            {/* ── Бренд ── */}
            <FormGroup>
              <FormLabel>{tb.brandName}</FormLabel>
              <FormInput
                placeholder={tb.brandNamePh}
                value={fields.brandName}
                onChange={e => set('brandName', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.brandDesc}</FormLabel>
              <FormTextarea
                placeholder={tb.brandDescPh}
                value={fields.brandDesc}
                onChange={e => set('brandDesc', e.target.value)}
              />
            </FormGroup>

            {/* ── Пакет ── */}
            <FormGroup>
              <FormLabel>{tb.packageLabel}</FormLabel>
              <PackageGrid>
                {projectTypes.map(pkg => (
                  <PackageCard
                    key={pkg.id}
                    type="button"
                    $selected={fields.packageId === pkg.id}
                    onClick={() => set('packageId', pkg.id)}
                  >
                    <PackageCardTitle>{pkg.label}</PackageCardTitle>
                    <PackageCardPrice>{pkg.price}</PackageCardPrice>
                  </PackageCard>
                ))}
              </PackageGrid>
              {selectedPkg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.3)',
                    marginTop: 10,
                    letterSpacing: '0.06em',
                  }}
                >
                  ✓ {autoLabel} · {autoPrice}
                </motion.p>
              )}
            </FormGroup>

            {/* ── Параметри ── */}
            <FormGroup>
              <FormLabel>{tb.goal}</FormLabel>
              <FormSelect
                value={fields.goal}
                onChange={e => set('goal', e.target.value)}
              >
                <option value="">{tb.goalPh}</option>
                {goals.map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.format}</FormLabel>
              <FormSelect
                value={fields.format}
                onChange={e => set('format', e.target.value)}
              >
                <option value="">{tb.formatPh}</option>
                {formats.map(f => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.style}</FormLabel>
              <CheckboxGroup>
                {styles.map(s => (
                  <CheckboxLabel key={s}>
                    <input
                      type="checkbox"
                      checked={fields.styles.includes(s)}
                      onChange={() => toggleStyle(s)}
                    />
                    {s}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.tone}</FormLabel>
              <FormSelect
                value={fields.tone}
                onChange={e => set('tone', e.target.value)}
              >
                <option value="">{tb.tonePh}</option>
                {tones.map(tone => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.details}</FormLabel>
              <FormTextarea
                placeholder={tb.detailsPh}
                value={fields.details}
                onChange={e => set('details', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.textNeeded}</FormLabel>
              <FormInput
                placeholder={tb.textNeededPh}
                value={fields.textNeeded}
                onChange={e => set('textNeeded', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>{tb.references}</FormLabel>
              <FormTextarea
                placeholder={tb.referencesPh}
                style={{ height: 60 }}
                value={fields.references}
                onChange={e => set('references', e.target.value)}
              />
            </FormGroup>

            {/* тільки для відео */}
            {isVideoType && (
              <FormGroup>
                <FormLabel>
                  {lang === 'ua' ? 'Динаміка відео' : 'Video dynamics'}
                </FormLabel>
                <FormTextarea
                  placeholder={
                    lang === 'ua'
                      ? 'Рух камери, ефекти (зум, слоу-мо, таймлапс...). Озвучка/музика? Якою мовою?'
                      : 'Camera movement, effects (zoom, slow-mo, timelapse...). Voiceover/music? Language?'
                  }
                  style={{ height: 70 }}
                  value={fields.videoDynamic}
                  onChange={e => set('videoDynamic', e.target.value)}
                />
              </FormGroup>
            )}

            <FormGroup>
              <FormLabel>
                {tb.deadline ||
                  (lang === 'ua' ? 'Дедлайн' : 'Deadline')}
              </FormLabel>
              <FormInput
                placeholder={
                  lang === 'ua'
                    ? 'Коли потрібен результат?'
                    : 'When do you need the result?'
                }
                value={fields.deadline}
                onChange={e => set('deadline', e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>
                {tb.restrictions ||
                  (lang === 'ua'
                    ? 'Заборони та обмеження'
                    : 'Restrictions')}
              </FormLabel>
              <FormTextarea
                placeholder={
                  lang === 'ua'
                    ? 'Що категорично не можна? Кольори, стилі, елементи. Особливі побажання щодо композиції, ракурсів, фону'
                    : 'What is strictly forbidden? Colors, styles, elements. Special requests for composition, angles, background'
                }
                style={{ height: 70 }}
                value={fields.restrictions}
                onChange={e => set('restrictions', e.target.value)}
              />
            </FormGroup>

            {/* ── Файл ── */}
            <FormGroup>
              <FormLabel>{tb.fileLabel}</FormLabel>
              <FileUploadArea>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                  onChange={handleFile}
                />
                <FileUploadText>{tb.fileBtn}</FileUploadText>
                {fields.tzFile ? (
                  <FileUploadName>{fields.tzFile.name}</FileUploadName>
                ) : (
                  <FileUploadName style={{ opacity: 0.3 }}>
                    {tb.fileHint}
                  </FileUploadName>
                )}
              </FileUploadArea>
            </FormGroup>

            <SubmitBtn
              type="submit"
              disabled={status === 'sending'}
              whileTap={{ scale: 0.97 }}
            >
              {status === 'sending' ? tb.submitting : tb.submit}
            </SubmitBtn>
            {status === 'ok' && (
              <FormStatus $success>{tb.successMsg}</FormStatus>
            )}
            {status === 'err' && <FormStatus>{tb.errorMsg}</FormStatus>}
          </BriefForm>
        </Reveal>
      </ContactLayout>
    </ContactSection>
  );
}

Brief.propTypes = {
  lang: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  briefQuestions: PropTypes.object.isRequired,
};
