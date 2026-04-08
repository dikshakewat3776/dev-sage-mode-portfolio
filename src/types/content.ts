export type ThemeMode = 'dark' | 'light'
export type StudySubject = string
export type StudyContentType = 'markdown' | 'text' | 'link'
export type AnimationType =
  | 'amaterasu'
  | 'chakra_pulse'
  | 'chidori'
  | 'crystal_style'
  | 'fireball'
  | 'mokuton'
  | 'rasengan'
  | 'rinnegan'
  | 'shadow_clone'
  | 'sharingan'
  | 'summoning_jutsu'
  | 'susanoo'

export interface SocialLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  tagline: string
  bio: string
  socialLinks: SocialLink[]
}

export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl?: string
  animationType: AnimationType
}

export interface StudyEntry {
  id: string
  subject: StudySubject
  title?: string
  contentType: StudyContentType
  content: string
  tags: string[]
}

