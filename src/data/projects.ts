import type { Project } from '../types/content'

export const projectCategories = [
  { id: 'all' as const, label: 'All' },
  { id: 'marketplace' as const, label: 'Marketplace & Credit Stacks' },
  { id: 'platform' as const, label: 'Platform Engineering & API Gateways' },
  { id: 'underwriting' as const, label: 'Underwriting Engines & Ops Portals' },
  { id: 'ai' as const, label: 'AI & LLM Governance' },
  { id: 'observability' as const, label: 'Observability & Data' },
]

export const projects: Project[] = [
  {
    id: 'diksha-marketplace',
    title: 'Marketplace Stack (Credit Platform Modernization)',
    category: 'marketplace',
    problem:
      'Slower time-to-market from tightly coupled marketplace stacks, legacy Express/JS drift, and fragmented lender integrations—creating scaling bottlenecks and tech debt.',
    solution:
      'Resilient financial marketplace with Gateway & BFF orchestration, Product-First Domain Layer, Shared Platform Modules, Unified Integration Layer (UIL) with plug-and-play adapters, and NestJS & TypeScript (“Neo”) upgrade with strict DI and compile-time contract safety.',
    architecture: [
      'Gateway & BFF orchestration layer',
      'Product-first domain modules',
      'Shared platform services',
      'UIL plug-and-play lender adapters',
      'NestJS/TypeScript “Neo” core with DI & contract safety',
    ],
    contribution:
      'Engineering leadership across architecture, migration, and delivery for marketplace products and lender connectivity.',
    stack: ['NestJS', 'TypeScript', 'Node.js', 'BFF', 'UIL', 'Microservices', 'PostgreSQL'],
    impact:
      '3 live flows (Loan Center 2.0, Vyapaar Loan 1.0, Personal Loan 1.0); Phase 2 (Digital Dukaan & Gold Loan); 23 live lending partners; 48K+ lead pipeline—20× growth in 60 days (peak 19K+ monthly leads).',
    internal: true,
  },
  {
    id: 'backstage-gateway',
    title: 'Backstage — Unified Vendor API Gateway & Developer Portal',
    category: 'platform',
    problem:
      'Every new vendor or partner integration required a bespoke build with no shared catalog and no safe way to switch vendors without code changes.',
    solution:
      'Config-first single API abstraction in front of third-party vendors (KYC, Bureau, Mobile Prefetch, Name Match) with circuit breakers, OpenAPI specs, and Backstage service catalog mapping provider–consumer dependency graphs.',
    architecture: [
      'Config-first vendor abstraction layer',
      'Circuit breakers & failure isolation',
      'OpenAPI contract definitions',
      'Backstage service catalog & dependency graph',
    ],
    contribution:
      'Led platform engineering for vendor gateway patterns, catalog design, and safe provider switching.',
    stack: ['Backstage', 'OpenAPI', 'API Gateway', 'Circuit breakers', 'NestJS', 'TypeScript'],
    impact:
      '6 third-party APIs live across Credit Marketplace & Onboarding; 104K+ monthly peak volume; 99.9% uptime SLA; 30× volume growth; zero vendor blast radius.',
    internal: true,
  },
  {
    id: 'ai-rails',
    title: 'AI Rails & Enterprise Governance Platform',
    category: 'ai',
    problem:
      'Need for compliant, observable, and cost-controlled LLM adoption across fintech and merchant onboarding without black-box risks.',
    solution:
      'Enterprise AI gateway via LiteLLM routing across OpenAI, Anthropic (Claude), and Google (Gemini); Langfuse for hop-by-hop tracing, token/cost attribution per user, central AI & model inventory, and live AI kill switch for instant rerouting on hallucination detection.',
    architecture: [
      'LiteLLM multi-provider routing',
      'Langfuse tracing & cost attribution',
      'Central model inventory & policies',
      'Live kill switch & rerouting controls',
    ],
    contribution:
      'Architected governed AI rails and observability patterns for production fintech and onboarding workflows.',
    stack: ['LiteLLM', 'Langfuse', 'OpenAI', 'Anthropic Claude', 'Google Gemini'],
    impact:
      'Full auditability and traceability on every model call (“compliant from Day 1”) with live cost, latency, and quality monitoring.',
    internal: true,
  },
  {
    id: 'vyapar-pd',
    title: 'Vyapar PD — AI Personal Discussion Bot & Underwriting Knowledge Engine',
    category: 'ai',
    problem:
      'Manual merchant Personal Discussion (PD) interviews and credit assessments are time-intensive and require strict adherence to multi-version credit policies.',
    solution:
      'Applicant-facing conversational AI (multilingual/Hinglish, Udyam vs. shop discrepancies, stock/sales verification) backed by internal PD Knowledge & Operations portal—89 live questions, mandatory baseline rules, fired probes, policy rule sets (Policy 4/5/6), scorecard parameters, and evaluation cases.',
    architecture: [
      'Conversational AI interview layer',
      'Policy versioning & rule sets',
      'PD knowledge base & question catalog',
      'Operations portal for probes & evaluation',
    ],
    contribution:
      'Led engineering for agentic PD workflows and credit-policy-aligned knowledge operations.',
    stack: ['LLM agents', 'Conversational AI', 'Policy engines', 'NestJS', 'TypeScript'],
    internal: true,
  },
  {
    id: 'sik-engines',
    title: 'SIK Engines — Marketplace, Core, Business & NBFC Lending',
    category: 'underwriting',
    problem:
      'Eligibility, scoring, and offer logic diverged across marketplace journeys, core lending rails, business loan programs, and NBFC partner flows—slowing policy changes and producing inconsistent credit decisions.',
    solution:
      'SIK engines: shared rule and integration kits with line-specific policy packs for marketplace (merchant & lead funnels), core lending, business loan (MSME/FOS field scoring, bureau cross-tabs, FOIR, EDI/ROI offers), and NBFC partner programs—including business profile scoring, Experian obligation mapping, and dynamic soft-offer generation.',
    architecture: [
      'Marketplace eligibility & funnel rules',
      'Core lending decision modules',
      'Business loan / MSME scoring & FOIR engine',
      'NBFC partner policy adapters',
      'Shared bureau parsers & obligation mapping',
    ],
    contribution:
      'Engineering leadership for SIK engine architecture, lending-line policy modules, bureau parsers, and FOS/partner-facing offer flows.',
    stack: ['SIK engines', 'Rule engine', 'BRE', 'Bureau integrations', 'Python', 'Node.js', 'PostgreSQL'],
    internal: true,
  },
  {
    id: 'los-lms-cms',
    title: 'Credit Underwriting & LOS/LMS Operations CMS Portal',
    category: 'underwriting',
    problem:
      'Operations and credit teams needed unified visibility across loan journeys, bureau reports, KYC, banking, and rule engine decisions.',
    solution:
      'Internal CMS Admin & Manual Review Portal with Bureau Analysis dashboard (score breakdown, secured/unsecured exposure, defaults), Business Rule Engine (BRE) inspection, and multi-stage LOS/LMS journey tracking with advanced filtering and log diagnostics.',
    architecture: [
      'Bureau analysis dashboards',
      'BRE decision inspection',
      'LOS/LMS journey timeline',
      'Manual review & ops workflows',
    ],
    contribution:
      'Delivered ops and credit visibility tooling across journeys, bureau, and rule engine outcomes.',
    stack: ['LOS/LMS', 'CMS', 'React', 'NestJS', 'PostgreSQL', 'MongoDB'],
    internal: true,
  },
  {
    id: 'signoz-data',
    title: 'SigNoz APM & Data Infrastructure',
    category: 'observability',
    problem:
      'Rapid root-cause diagnosis was difficult across microservices, database queries, external lender APIs, and search/analytics layers.',
    solution:
      'SigNoz APM for p50/p90/p99 latency, throughput, PostgreSQL call RPS/duration, and external dependency metrics; analytical pipelines including BigQuery↔Solr sync and MongoDB→BigQuery for reporting and search.',
    architecture: [
      'SigNoz APM & distributed tracing',
      'DB and external dependency metrics',
      'BigQuery → Solr search sync',
      'MongoDB → BigQuery analytics pipelines',
    ],
    contribution:
      'Instituted end-to-end observability and data movement patterns across marketplace and integration services.',
    stack: ['SigNoz', 'OpenTelemetry', 'PostgreSQL', 'BigQuery', 'Apache Solr', 'MongoDB'],
    internal: true,
  },
  {
    id: 'prompt-guard',
    title: 'Prompt Guard',
    category: 'ai',
    problem:
      'Prompts to AI tools can leak PII, secrets, or policy violations without teams noticing.',
    solution:
      'Open-source Python library and CLI: sensitive-pattern detection, stable-placeholder masking, risk scoring (0–100), optional SQLite analytics—inform teams without hard-blocking.',
    contribution: 'Created the library, CLI, and detection/masking pipeline (personal OSS).',
    stack: ['Python', 'SQLite', 'CLI', 'AI guardrails'],
    githubUrl: 'https://github.com/dikshakewat3776/prompt-guard',
  },
  {
    id: 'product-config-deck',
    title: 'Product Config Deck',
    category: 'platform',
    problem: 'Production product configuration changes need guardrails and auditable, safe patching.',
    solution: 'FastAPI + React admin for safe static product configuration patching.',
    contribution: 'Built production-focused admin APIs and UI (personal OSS).',
    stack: ['Python', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/dikshakewat3776/product-config-deck',
  },
  {
    id: 'lead-lens',
    title: 'Lead Lens',
    category: 'observability',
    problem: 'Pincode-keyed lead and portfolio insights need unified analytics and mapping.',
    solution:
      'FastAPI + PostgreSQL + Redis with React (Leaflet + Chart.js) for geography-keyed analytics, filters, and cross-sell views.',
    contribution: 'Designed and built the full-stack analytics product (personal OSS).',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'React'],
    githubUrl: 'https://github.com/dikshakewat3776/lead-lens',
  },
  {
    id: 'bazaar-eye',
    title: 'Bazaar Eye',
    category: 'marketplace',
    problem:
      'Merchant and bazaar workflows need sharper visibility into inventory, shelf context, and day-to-day operations.',
    solution:
      'Open-source project exploring bazaar and retail “eye” experiences—capture, processing, and operational insights for small-business and marketplace contexts. [Refine from README when public.]',
    contribution: 'Built and maintain the project (personal OSS).',
    stack: ['TypeScript', 'Node.js', 'Full stack'],
    githubUrl: 'https://github.com/dikshakewat3776/bazaar-eye',
  },
  {
    id: 'stranger-things-mongo-quest',
    title: 'Stranger Things Mongo Quest',
    category: 'observability',
    problem:
      'MongoDB concepts are easier to retain when practice is structured, narrative-driven, and hands-on.',
    solution:
      'Portfolio-grade full-stack app combining a playable mission game, step-by-step MongoDB guides, and a technical showcase with story-driven challenges.',
    contribution: 'Designed missions, learning flows, and full-stack implementation (personal OSS).',
    stack: ['JavaScript', 'MongoDB', 'Node.js', 'Full stack'],
    githubUrl: 'https://github.com/dikshakewat3776/Stranger-Things-Mongo-Quest',
  },
  {
    id: 'personawise-ai',
    title: 'PersonaWiseAI',
    category: 'ai',
    problem:
      'Traditional credit signals alone miss behavioral and alternative data that reflect real-world financial personas.',
    solution:
      'AI-powered financial persona platform for evolving creditworthiness profiles and personalized guidance—using alternative data, habits, and demographics tailored to the Indian market.',
    contribution: 'Built core platform capabilities and AI-driven persona flows (personal OSS).',
    stack: ['Python', 'AI/ML', 'Alternative data', 'Fintech'],
    githubUrl: 'https://github.com/dikshakewat3776/PersonaWiseAI',
  },
]