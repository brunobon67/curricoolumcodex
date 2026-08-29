import type { ResumeContent, ResumeSettings } from "@/types/resume";

export const defaultSettings: ResumeSettings = { font: "inter", color: "#31553f", textSize: "medium", spacing: "normal", showPhoto: true };
export const emptyContent: ResumeContent = {
  personal: { firstName: "", lastName: "", jobTitle: "", email: "", phone: "", city: "", country: "", linkedin: "", website: "" },
  profile: "", experience: [], education: [], skills: [], languages: [], certifications: [], projects: [], links: [],
  sectionOrder: ["profile", "experience", "education", "skills", "languages", "certifications", "projects", "links"], hiddenSections: []
};
export const demoContent: ResumeContent = {
  personal: { firstName: "Giulia", lastName: "Bianchi", jobTitle: "Senior Product Designer", email: "giulia.bianchi@example.com", phone: "+39 02 555 0198", city: "Milano", country: "Italia", linkedin: "linkedin.com/in/giuliabianchi", website: "giuliabianchi.design" },
  profile: "Product designer con 7 anni di esperienza nella creazione di prodotti digitali semplici e inclusivi. Trasformo problemi complessi in esperienze chiare, lavorando a stretto contatto con team di prodotto e tecnologia.",
  experience: [{ id: "exp-demo", company: "Northstar Labs", role: "Senior Product Designer", city: "Milano", startDate: "2022-03", endDate: "", current: true, description: "Guidato il redesign della piattaforma B2B, aumentando l'attivazione del 24%. Creato e adottato un design system condiviso da 4 squadre di prodotto." }, { id: "exp-demo-2", company: "Studio Forma", role: "UX/UI Designer", city: "Torino", startDate: "2019-01", endDate: "2022-02", current: false, description: "Progettato esperienze web e mobile per clienti fintech e retail, dalla ricerca utente alla consegna agli sviluppatori." }],
  education: [{ id: "edu-demo", school: "Politecnico di Milano", degree: "Laurea Magistrale", field: "Design della comunicazione", city: "Milano", startDate: "2016", endDate: "2018", description: "Tesi sui sistemi di progettazione accessibili." }],
  skills: ["Product strategy", "UX research", "Figma", "Design systems", "Prototyping"],
  languages: [{ id: "lang-demo", name: "Italiano", level: "Madrelingua" }, { id: "lang-demo-2", name: "Inglese", level: "C1 — Avanzato" }],
  certifications: [], projects: [{ id: "proj-demo", name: "Orbit Design System", description: "Sistema multi-brand accessibile usato da 30+ designer e developer.", technologies: "Figma, Storybook, React", link: "orbit.example.com" }], links: [],
  sectionOrder: ["profile", "experience", "education", "skills", "projects", "languages", "certifications", "links"], hiddenSections: []
};
