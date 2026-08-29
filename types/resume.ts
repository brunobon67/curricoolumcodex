export type TemplateId = "classic" | "modern" | "minimal";
export type SectionId = "profile" | "experience" | "education" | "skills" | "languages" | "certifications" | "projects" | "links";

export interface PersonalInfo { firstName: string; lastName: string; jobTitle: string; email: string; phone: string; city: string; country: string; linkedin: string; website: string; photo?: string }
export interface Experience { id: string; company: string; role: string; city: string; startDate: string; endDate: string; current: boolean; description: string }
export interface Education { id: string; school: string; degree: string; field: string; city: string; startDate: string; endDate: string; description: string }
export interface Language { id: string; name: string; level: string }
export interface Certification { id: string; name: string; issuer: string; date: string; link: string }
export interface Project { id: string; name: string; description: string; technologies: string; link: string }
export interface CustomLink { id: string; label: string; url: string }
export interface ResumeContent {
  personal: PersonalInfo; profile: string; experience: Experience[]; education: Education[];
  skills: string[]; languages: Language[]; certifications: Certification[]; projects: Project[]; links: CustomLink[];
  sectionOrder: SectionId[]; hiddenSections: SectionId[];
}
export interface ResumeSettings { font: "inter" | "serif" | "system"; color: string; textSize: "small" | "medium" | "large"; spacing: "compact" | "normal" | "airy"; showPhoto: boolean }
export interface ResumeDocument { id: string; name: string; templateId: TemplateId; content: ResumeContent; settings: ResumeSettings; updatedAt?: string }
