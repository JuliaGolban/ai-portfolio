'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../shared/Reveal';
import { SectionLabel, SectionTitle } from '../shared/shared.styled';
import {
  PricingSection,
  DesktopTable, TabList, Tab, TabIcon, TabLabel,
  PanelWrap, PanelDesc, PlansGrid, PlanCell, PlanName, PlanPrice, PlanDesc, CampaignCTA,
  MobileList, AccordionRow, AccordionBtn, AccordionIcon, AccordionTitle,
  AccordionBody, AccordionDesc, MobilePlanRow, MobilePlanLeft, MobilePlanName, MobilePlanDesc, MobilePlanPrice,
  AdditionalWrap, AdditionalRow, AdditionalTitle, AdditionalDesc, AdditionalPrice,
  PricingNote,
  FAQSection, FAQItem, FAQQuestion, FAQIcon, FAQAnswer, FAQAnswerInner,
} from './Pricing.styled';

// ── FAQ row
function FAQRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <FAQItem>
      <FAQQuestion onClick={() => setOpen(o => !o)}>
        {item.q}
        <FAQIcon $open={open}>+</FAQIcon>
      </FAQQuestion>
      <AnimatePresence initial={false}>
        {open && (
          <FAQAnswer
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <FAQAnswerInner>{item.a}</FAQAnswerInner>
          </FAQAnswer>
        )}
      </AnimatePresence>
    </FAQItem>
  );
}
FAQRow.propTypes = { item: PropTypes.object.isRequired };

// ── Desktop panel
function DesktopPanel({ category, lang, onCampaignOpen }) {
  return (
    <PanelWrap
      key={category.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
    >
      <PanelDesc>{category[`desc_${lang}`]}</PanelDesc>

      <PlansGrid $count={category.plans.length}>
        {category.plans.map(plan => (
          <PlanCell key={plan.id} $accent={plan.accent}>
            <PlanName>{plan[`title_${lang}`]}</PlanName>
            <PlanPrice>{plan.price}</PlanPrice>
            <PlanDesc>{plan[`desc_${lang}`]}</PlanDesc>
          </PlanCell>
        ))}
      </PlansGrid>

      {category.id === 'ai-campaign' && (
        <CampaignCTA onClick={onCampaignOpen}>
          {category[`cta_${lang}`] || (lang === 'ua' ? 'Дивись приклад →' : 'See example →')}
        </CampaignCTA>
      )}
    </PanelWrap>
  );
}
DesktopPanel.propTypes = { category: PropTypes.object.isRequired, lang: PropTypes.string.isRequired, onCampaignOpen: PropTypes.func.isRequired };

// ── Mobile accordion row
function AccordionCategory({ category, lang, onCampaignOpen }) {
  const [open, setOpen] = useState(false);
  return (
    <AccordionRow>
      <AccordionBtn onClick={() => setOpen(o => !o)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.18)', width: 18, flexShrink: 0 }}>
            {category.icon}
          </span>
          <AccordionTitle $open={open}>{category[`label_${lang}`]}</AccordionTitle>
        </div>
        <AccordionIcon $open={open}>+</AccordionIcon>
      </AccordionBtn>

      <AnimatePresence initial={false}>
        {open && (
          <AccordionBody
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div style={{ paddingBottom: 24 }}>
              <AccordionDesc>{category[`desc_${lang}`]}</AccordionDesc>

              {category.plans.map(plan => (
                <MobilePlanRow key={plan.id}>
                  <MobilePlanLeft>
                    <MobilePlanName>{plan[`title_${lang}`]}</MobilePlanName>
                    <MobilePlanDesc>{plan[`desc_${lang}`]}</MobilePlanDesc>
                  </MobilePlanLeft>
                  <MobilePlanPrice>{plan.price}</MobilePlanPrice>
                </MobilePlanRow>
              ))}

              {category.id === 'ai-campaign' && (
                <div style={{ paddingLeft: 32, marginTop: 14 }}>
                  <CampaignCTA onClick={onCampaignOpen}>
                    {category[`cta_${lang}`] || (lang === 'ua' ? 'Дивись приклад →' : 'See example →')}
                  </CampaignCTA>
                </div>
              )}
            </div>
          </AccordionBody>
        )}
      </AnimatePresence>
    </AccordionRow>
  );
}
AccordionCategory.propTypes = { category: PropTypes.object.isRequired, lang: PropTypes.string.isRequired, onCampaignOpen: PropTypes.func.isRequired };

// ── Main Pricing component
export default function Pricing({ serviceCategories, additionalServices, pricingNote, faq, lang, t, onCampaignOpen }) {
  const [activeId, setActiveId] = useState(serviceCategories[0].id);
  const activeCategory = serviceCategories.find(c => c.id === activeId);
  const addSvc = additionalServices[lang];
  const addLabel = lang === 'ua' ? 'Додатково' : 'Additional';

  return (
    <PricingSection id="pricing">
      <Reveal>
        <SectionLabel>{t.label}</SectionLabel>
        <SectionTitle>{t.title}</SectionTitle>
      </Reveal>

      {/* Desktop */}
      <Reveal delay={0.1}>
        <DesktopTable>
          <TabList>
            {serviceCategories.map(cat => (
              <Tab key={cat.id} $active={cat.id === activeId} onClick={() => setActiveId(cat.id)}>
                <TabIcon $active={cat.id === activeId}>{cat.icon}</TabIcon>
                <TabLabel $active={cat.id === activeId}>{cat[`label_${lang}`]}</TabLabel>
              </Tab>
            ))}
          </TabList>

          <AnimatePresence mode="wait">
            <DesktopPanel
              key={activeId}
              category={activeCategory}
              lang={lang}
              onCampaignOpen={onCampaignOpen}
            />
          </AnimatePresence>
        </DesktopTable>
      </Reveal>

      {/* Mobile */}
      <MobileList>
        {serviceCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.04}>
            <AccordionCategory category={cat} lang={lang} onCampaignOpen={onCampaignOpen} />
          </Reveal>
        ))}
      </MobileList>

      {/* Additional */}
      <Reveal>
        <AdditionalWrap>
          <SectionLabel style={{ marginBottom: 12 }}>{addLabel}</SectionLabel>
          {addSvc.map(s => (
            <AdditionalRow key={s.title}>
              <div>
                <AdditionalTitle>{s.title}</AdditionalTitle>
                <AdditionalDesc>{s.desc}</AdditionalDesc>
              </div>
              <AdditionalPrice>{s.price}</AdditionalPrice>
            </AdditionalRow>
          ))}
        </AdditionalWrap>
      </Reveal>

      <Reveal>
        <PricingNote>{pricingNote[lang]}</PricingNote>
      </Reveal>

      {/* FAQ */}
      <FAQSection>
        <Reveal><SectionLabel style={{ marginBottom: 40 }}>{t.faqLabel}</SectionLabel></Reveal>
        {faq.map(item => <FAQRow key={item.q} item={item} />)}
      </FAQSection>
    </PricingSection>
  );
}

Pricing.propTypes = {
  serviceCategories:  PropTypes.array.isRequired,
  additionalServices: PropTypes.object.isRequired,
  pricingNote:        PropTypes.object.isRequired,
  faq:                PropTypes.array.isRequired,
  lang:               PropTypes.string.isRequired,
  t:                  PropTypes.object.isRequired,
  onCampaignOpen:     PropTypes.func.isRequired,
};
