import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PricingSection = styled.section`
  padding: 140px 24px;
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  @media (min-width: 768px) {
    padding: 160px 80px;
  }
`;

/* ── Desktop: left tabs + right panel ── */
export const DesktopTable = styled.div`
  display: none;
  margin-top: 56px;
  @media (min-width: 900px) {
    display: grid;
  }
  grid-template-columns: 210px 1fr;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
`;

export const TabList = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.01);
`;

export const Tab = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px;
  background: ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.04)' : 'transparent'};
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  border-left: 2px solid
    ${({ $active }) => ($active ? 'rgba(255,255,255,0.3)' : 'transparent')};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
`;

export const TabIcon = styled.span`
  font-size: 12px;
  color: ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.45)'};
  flex-shrink: 0;
  transition: color 0.2s;
`;

export const TabLabel = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)'};
  transition: color 0.2s;
  line-height: 1.4;
`;

export const PanelWrap = styled(motion.div)`
  padding: 28px 32px;
`;

export const PanelDesc = styled.p`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.7;
  margin-bottom: 24px;
  max-width: 520px;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => Math.min($count, 3)}, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 3px;
  overflow: hidden;
`;

export const PlanCell = styled.div`
  background: ${({ $accent }) =>
    $accent ? 'rgba(255,255,255,0.03)' : '#0a0a0a'};
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  ${({ $accent }) =>
    $accent &&
    `
    &::after {
      content: '★';
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 8px;
      color: rgba(255,255,255,0.4);
    }
  `}
`;

export const PlanName = styled.span`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
`;

export const PlanPrice = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 200;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1;
`;

export const PlanDesc = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.65;
  white-space: pre-line;
  margin-top: 2px;
`;

export const CampaignCTA = styled.button`
  margin-top: 20px;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2px;
  cursor: pointer;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

/* ── Mobile: accordion ── */
export const MobileList = styled.div`
  margin-top: 48px;
  @media (min-width: 900px) {
    display: none;
  }
`;

export const AccordionRow = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const AccordionBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;
  gap: 16px;
  text-align: left;
`;

export const AccordionIcon = styled.span`
  font-size: 20px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  transition: transform 0.35s;
  transform: ${({ $open }) => ($open ? 'rotate(45deg)' : 'none')};
`;

export const AccordionTitle = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1.05rem, 2.5vw, 1.4rem);
  font-weight: 200;
  color: ${({ $open }) =>
    $open ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)'};
  transition: color 0.3s;
`;

export const AccordionBody = styled(motion.div)`
  overflow: hidden;
`;

export const AccordionDesc = styled.p`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.8;
  margin-bottom: 16px;
  padding-left: 32px;
`;

export const MobilePlanRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 12px 0 12px 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

export const MobilePlanLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MobilePlanName = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
`;

export const MobilePlanDesc = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;
  white-space: pre-line;
`;

export const MobilePlanPrice = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.25rem;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.65);
  flex-shrink: 0;
`;

/* ── Additional & Note ── */
export const AdditionalWrap = styled.div`
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const AdditionalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

export const AdditionalTitle = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const AdditionalDesc = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  margin-left: 12px;
`;

export const AdditionalPrice = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.25rem;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.65);
`;

export const PricingNote = styled.p`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.7;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 560px;
`;

/* ── FAQ ── */
export const FAQSection = styled.div`
  margin-top: 80px;
`;

export const FAQItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
  gap: 16px;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.82);
  }
`;

export const FAQIcon = styled.span`
  font-size: 18px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.45);
  flex-shrink: 0;
  transition: transform 0.35s;
  transform: ${({ $open }) => ($open ? 'rotate(45deg)' : 'none')};
`;

export const FAQAnswer = styled(motion.div)`
  overflow: hidden;
`;

export const FAQAnswerInner = styled.p`
  font-size: 13px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.45);
  padding-bottom: 22px;
  max-width: 640px;
`;
