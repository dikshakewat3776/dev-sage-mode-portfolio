import type { Profile } from '../types/content'

export const profile: Profile = {
  name: 'Diksha Kewat',
  title: 'Engineering Manager',
  roleLine: 'Engineering Manager · Fintech & Credit Platforms · Distributed Systems · Enterprise AI',
  headlinePhrases: [
    'Engineering Leadership',
    'Fintech & Credit Stacks',
    'Marketplace Architecture',
    'Underwriting & Risk Engines',
    'Enterprise AI Governance',
  ],
  intro:
    'I build and lead engineering teams that turn complex financial technology problems into scalable, reliable products. My experience spans digital lending ecosystems, multi-lender marketplaces, automated underwriting stacks, and governed enterprise AI platforms.',
  about: [
    'I’ve grown from full-stack lending engineering to leading fintech marketplace modernization, credit platforms, and governed enterprise AI initiatives.',
    'My journey has been shaped by building consumer and partner lending journeys, evolving into larger platform architecture and engineering leadership responsibilities where scalability, credit risk, compliance, and reliability are as important as clean code.',
    'At **Spice Money**, I lead the modernization of the **Credit platform**, spanning a new marketplace stack — Loan Center 2.0, Vyapaar Loan, Personal Loan, Digital Dukaan, and Gold Loan — alongside a Unified Integration Layer (UIL) connecting 23+ lending partners, the Backstage vendor API gateway, underwriting engines, and LOS/LMS operations portals.',
    'A key focus of my work is pragmatic modernization: evolving legacy Express and JavaScript services toward **Python, FastAPI, Nodejs, NestJS and TypeScript**, introducing stronger dependency injection and compile-time contract safety while maintaining product delivery momentum.',
    'I work closely with Product, Risk & Credit, Data Science, Operations, and Business teams to translate complex requirements into scalable engineering solutions. I work with **bureau and banking integrations and aggregators** across credit and onboarding journeys. I also focus on production observability through **SigNoz APM** and building governed, compliance-aware AI capabilities using **LiteLLM and Langfuse**.',
    'Previously, at **Aditya Birla Finance**, I built digital and partner lending capabilities across LOS/LMS systems. That experience continues to shape how I approach credit platforms, financial integrations, and end-to-end lending architecture.',
  ],
  aboutFocusAreas: [
    'Engineering Leadership',
    'Fintech Platforms',
    'Digital Lending',
    'Backend Architecture',
    'Distributed Systems',
    'Bureau & Banking Integrations',
    'Credit & Underwriting Systems',
    'Enterprise AI',
    'LLM Infrastructure',
  ],
  email: 'dikshakewat3776@gmail.com',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/diksha-kewat-3356a516b' },
    { label: 'GitHub', href: 'https://github.com/dikshakewat3776' },
    { label: 'Email', href: 'mailto:dikshakewat3776@gmail.com' },
  ],
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  photoUrl: `${import.meta.env.BASE_URL}profile.jpg`,
  contactClosing:
    'Open to conversations about engineering leadership, fintech and credit platforms, platform reliability, and governed enterprise AI.',
}