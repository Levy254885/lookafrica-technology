import { Atom, BarChart3, Braces, Code2, Database, FileCode, Figma, Flame, GitBranch, Github, Palette, Search, Server, Sparkles, Triangle, Webhook, Wind, Zap, type LucideIcon } from 'lucide-react'
export type Tool = { name: string; icon: LucideIcon; color: string }
export const toolGroups: [string, string[]][] = [['Front end', ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3', 'Motion']], ['Back end & data', ['Node.js', 'Firebase', 'Firestore', 'REST APIs']], ['Design & delivery', ['Figma', 'GitHub', 'Git']], ['Growth & analytics', ['Google Analytics', 'Search Console']]]
export const tools: Tool[] = [
  { name: 'React', icon: Atom, color: '#0EA5C6' }, { name: 'Next.js', icon: Triangle, color: '#171717' }, { name: 'TypeScript', icon: FileCode, color: '#3178C6' },
  { name: 'JavaScript', icon: Braces, color: '#D4A017' }, { name: 'Vite', icon: Zap, color: '#8B5CF6' }, { name: 'Node.js', icon: Server, color: '#3C873A' },
  { name: 'Tailwind CSS', icon: Wind, color: '#06B6D4' }, { name: 'Firebase', icon: Flame, color: '#F59E0B' }, { name: 'Firestore', icon: Database, color: '#F97316' },
  { name: 'Figma', icon: Figma, color: '#F24E1E' }, { name: 'GitHub', icon: Github, color: '#171717' }, { name: 'Git', icon: GitBranch, color: '#F05033' },
  { name: 'HTML5', icon: Code2, color: '#E34F26' }, { name: 'CSS3', icon: Palette, color: '#1572B6' }, { name: 'REST APIs', icon: Webhook, color: '#B71C2B' },
  { name: 'Motion', icon: Sparkles, color: '#EC4899' }, { name: 'Google Analytics', icon: BarChart3, color: '#E37400' }, { name: 'Search Console', icon: Search, color: '#4285F4' },
]
