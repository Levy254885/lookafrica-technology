import { part1 } from './articles/part1'
import { part2 } from './articles/part2'
import { part3 } from './articles/part3'
import { part4 } from './articles/part4'

export const categories = ['Technology', 'Software Engineering', 'Business Technology', 'Digital Transformation', 'Search and Digital Growth', 'Industry Insights'] as const
export type Block = { h: string; p?: string[]; ul?: string[]; ol?: string[]; code?: string }
export type Article = {
  slug: string; title: string; excerpt: string; category: (typeof categories)[number]; date: string; author: string
  keywords: string[]; service: string; blocks: Block[]; faq: [string, string][]
}
export const articles: Article[] = [...part1, ...part2, ...part3, ...part4]
export const articleText = (a: Article) => [...a.blocks.flatMap((b) => [b.h, ...(b.p ?? []), ...(b.ul ?? []), ...(b.ol ?? [])]), ...a.faq.flat()].join(' ')
export const readingTime = (a: Article) => Math.max(1, Math.round(articleText(a).split(/\s+/).length / 200))
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
