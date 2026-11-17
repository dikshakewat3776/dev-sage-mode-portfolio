import type { ExperienceRole } from '../types/content'

export const experience: ExperienceRole[] = [
  {
    id: 'spice-money',
    company: 'Spice Money',
    role: 'Engineering Manager',
    period: 'November 2021 – Present',
    summary:
      'Lead engineering for the Diksha fintech marketplace and credit ecosystem—marketplace modernization, UIL, API gateways, underwriting engines, LOS/LMS ops, SigNoz observability, and governed enterprise AI.',
    highlights: [
      'New Marketplace Stack: Gateway & BFF orchestration, product-first domain layer, shared platform modules, and NestJS/TypeScript (“Neo”) upgrade with strict DI and compile-time contract safety.',
      '3 live product flows (Loan Center 2.0, Vyapaar Loan 1.0, Personal Loan 1.0); Phase 2 expansion (Digital Dukaan & Gold Loan); 23 live lending partners; 48K+ total lead pipeline (20× growth in 60 days, peak 19K+ monthly leads).',
      'Unified Integration Layer (UIL) and Backstage vendor API gateway—config-first abstraction for KYC, bureau, and onboarding vendors with circuit breakers, OpenAPI, and service catalog.',
      'SIK engines across marketplace, core lending, business loan, and NBFC programs; Vyapar PD AI interview bot & knowledge portal; LOS/LMS CMS manual review; SigNoz APM and AI rails (LiteLLM + Langfuse).',
    ],
    technologies: [
      'NestJS',
      'TypeScript',
      'Node.js',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'Backstage',
      'SigNoz',
      'LiteLLM',
      'Langfuse',
      'Microservices',
      'BFF & API gateways',
    ],
  },
  {
    id: 'aditya-birla-finance',
    company: 'Aditya Birla Finance',
    role: 'Full Stack Developer',
    period: 'September 2019 – October 2021',
    summary:
      'Digital team delivering consumer lending and partner-based lending journeys within a B2B framework.',
    highlights: [
      'Built transformative digital experiences for consumer and partner lending with a focus on low-friction origination.',
      'Developed and optimized LOS/LMS capabilities—streamlining credit decisioning and loan disbursal processes.',
      'Shipped partner integrations and backend services connecting external partners to core lending workflows.',
    ],
    technologies: ['Node.js', 'Python', 'MEAN stack', 'MySQL', 'MongoDB', 'REST APIs', 'LOS/LMS'],
  },
]