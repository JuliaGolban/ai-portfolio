import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ContactSection = styled.section`
  padding: 140px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  @media (min-width: 768px) {
    padding: 160px 80px;
  }
`;

export const ContactLayout = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 80px;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 100px;
  }
`;

export const ContactLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContactTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 200;
  font-style: italic;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.1;
`;

export const ContactSub = styled.p`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.8;
  max-width: 320px;
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  transition: color 0.3s;
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    transition:
      width 0.3s,
      background 0.3s;
    flex-shrink: 0;
  }
  &:hover {
    color: rgba(255, 255, 255, 0.72);
    &::before {
      width: 36px;
      background: rgba(255, 255, 255, 0.35);
    }
  }
`;

export const BriefForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
`;

const inputBase = `
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.72);
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.04em;
  padding: 10px 0;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
  &::placeholder { color: rgba(255,255,255,0.16); }
  &:focus { border-color: rgba(255,255,255,0.3); }
`;

export const FormInput = styled.input`
  ${inputBase}
`;
export const FormTextarea = styled.textarea`
  ${inputBase} resize: none;
  height: 76px;
  line-height: 1.7;
`;
export const FormSelect = styled.select`
  ${inputBase}
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.18)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  padding-right: 20px;
  option {
    background: #111;
    color: #fff;
  }
`;

export const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PackageCard = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.07)'};
  border-radius: 2px;
  background: ${({ $selected }) =>
    $selected ? 'rgba(255,255,255,0.05)' : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.25s,
    background 0.25s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export const PackageCardTitle = styled.span`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.4;
`;

export const PackageCardPrice = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 200;
  font-style: italic;
  color: rgba(255, 255, 255, 0.65);
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.32);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.65);
  }
  input {
    accent-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;

export const FileUploadArea = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  padding: 24px;
  cursor: pointer;
  transition:
    border-color 0.3s,
    background 0.3s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.02);
  }
  input {
    display: none;
  }
`;

export const FileUploadText = styled.span`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.18);
`;

export const FileUploadName = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.04em;
`;

export const SubmitBtn = styled(motion.button)`
  align-self: flex-start;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 14px 36px;
  border-radius: 1px;
  cursor: pointer;
  transition:
    color 0.3s,
    border-color 0.3s,
    background 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.88);
    border-color: rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.03);
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const FormStatus = styled.p`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: ${({ $success }) =>
    $success ? 'rgba(170,220,150,0.7)' : 'rgba(220,110,90,0.7)'};
`;
