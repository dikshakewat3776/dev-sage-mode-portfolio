import type { Project } from '../types/content'

export const projects: Project[] = [
  {
    id: 'p0',
    title: 'lead-lens',
    description: 'Lead Lens is a FastAPI + PostgreSQL + Redis backend and React (Leaflet + Chart.js) UI for Indian pincode–keyed lead analytics, mapping, filters, portfolio charts, and cross-sell recommendations..',
    stack: ['Python', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/dikshakewat3776/lead-lens',
    animationType: 'chidori',
  },
  {
    id: 'p1',
    title: 'product-config-deck',
    description: 'Production-focused FastAPI + React admin backend for safe static product configuration patching.',
    stack: ['Python', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/dikshakewat3776/product-config-deck',
    animationType: 'sharingan',
  },
  {
    id: 'p2',
    title: 'prompt-guard',
    description: 'Prompt Guard is a Python library and CLI that analyzes text before it is sent to AI tools (Cursor, Copilot, etc.). It detects sensitive patterns (PII, secrets, profanity, India/global/org rules), masks them with stable placeholders, assigns a risk score (0–100), and optionally persists analytics to SQLite and logs. It does not block prompts.',
    stack: ['Python'],
    githubUrl: 'https://github.com/dikshakewat3776/prompt-guard',
    animationType: 'crystal_style',
  },
  {
    id: 'p3',
    title: 'Stranger-Things-Mongo-Quest',
    description: 'Portfolio-grade full-stack game + learning experience built around MongoDB missions.',
    stack: ['JavaScript', 'MongoDB', 'Full Stack'],
    githubUrl: 'https://github.com/dikshakewat3776/Stranger-Things-Mongo-Quest',
    animationType: 'fireball',
  },
  {
    id: 'p4',
    title: 'snap-stock',
    description: 'Smart inventory scanner app for shelf-image processing, stock updates, and reorder exports.',
    stack: ['TypeScript', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/dikshakewat3776/snap-stock',
    animationType: 'rasengan',
  }
]

