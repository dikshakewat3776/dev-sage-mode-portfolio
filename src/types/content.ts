export type ProjectCategory =
  | 'all'
  | 'marketplace'
  | 'platform'
  | 'underwriting'
  | 'ai'
  | 'observability'

export interface SocialLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  title: string
  /** Shown under the name in the hero */
  roleLine: string
  headlinePhrases: string[]
  intro: string
  about: string[]
  /** Optional emphasis labels rendered as chips below the about narrative */
  aboutFocusAreas?: string[]
  socialLinks: SocialLink[]
  resumeUrl?: string
  coverLetterUrl?: string
  photoUrl?: string
  email: string
  contactClosing: string
}

export interface ExperienceRole {
  id: string
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
  technologies?: string[]
}

export interface Project {
  id: string
  title: string
  category: Exclude<ProjectCategory, 'all'>
  problem: string
  solution: string
  contribution: string
  architecture?: string[]
  stack: string[]
  impact?: string
  githubUrl?: string
  liveUrl?: string
  internal?: boolean
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface PhilosophyPoint {
  title: string
  description: string
}

export interface RecognitionHighlight {
  value: string
  label: string
}

export type StudySubject = string
export type StudyContentType = 'markdown' | 'text' | 'link'

export interface StudyEntry {
  id: string
  subject: StudySubject
  title?: string
  contentType: StudyContentType
  content: string
  tags: string[]
}