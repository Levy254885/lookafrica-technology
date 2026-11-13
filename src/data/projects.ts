export type Project = { slug: string; name: string; industry: string; client?: string; summary: string; challenge: string; solution: string; technologies: string[]; images: { src: string; alt: string }[]; outcomes?: string[]; url?: string }
// Add verified, authorised projects here. They appear automatically on /work and get a case study at /work/<slug>.
export const projects: Project[] = []
