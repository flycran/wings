export type Accent = 'blue' | 'orange' | 'green' | 'red'

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  summary: string
  role: string
  year: string
  stack: string[]
  accent: Accent
  category: string
  href: string
  homepage?: string
  docs?: string
}

export interface WingsProject {
  id: 'wings'
  index: string
  title: string
  description: string
  linkLabel: string
  href?: string
}

export type ProjectEntry = Project | WingsProject

export interface ProjectMeta {
  id: 'smart-unit' | 'github-gravity' | 'rtk-to-endpoints'
  index: string
  title: string
  year: string
  stack: string[]
  accent: Accent
  category: string
  href: string
  homepage?: string
  docs?: string
}
