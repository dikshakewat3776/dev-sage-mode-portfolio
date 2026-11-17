import type { SkillGroup } from '../types/content'

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend & Architecture',
    items: [
      'TypeScript',
      'Node.js',
      'NestJS',
      'Python',
      'FastAPI',
      'Django',
      'Flask',
      'Express',
      'Microservices',
      'BFF & API Gateways',
      'Event-driven architecture',
    ],
  },
  {
    title: 'Fintech & Credit Systems',
    items: [
      'Digital lending ecosystems',
      'Multi-lender marketplaces',
      'Credit rule engines (BRE)',
      'Bureau & KYC integrations',
      'Banking data & account aggregators',
      'LOS/LMS platforms',
      'Underwriting workflows',
    ],
  },
  {
    title: 'Databases & Search',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'BigQuery', 'Apache Solr'],
  },
  {
    title: 'Observability, DevOps & Developer Experience',
    items: [
      'SigNoz APM',
      'OpenTelemetry',
      'Backstage',
      'Docker',
      'Kubernetes',
      'AWS',
      'Jenkins',
      'Prometheus',
      'Grafana',
      'Circuit breakers',
    ],
  },
  {
    title: 'AI & LLM Engineering',
    items: [
      'OpenAI',
      'Anthropic (Claude)',
      'Google (Gemini)',
      'LiteLLM gateway',
      'Langfuse observability',
      'Conversational AI agents',
      'RAG',
      'AI governance & guardrails',
    ],
  },
  {
    title: 'Engineering Leadership',
    items: [
      'System design',
      'Stack modernization',
      'Technical strategy',
      'Team leadership',
      'Architecture reviews',
      'Engineering execution',
    ],
  },
]