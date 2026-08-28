import { slugify } from '../utils/slugify'

const modules = import.meta.glob('/src/content/writing/*.mdx', { eager: true })

export const writingPosts = Object.entries(modules)
  .map(([, mod]) => ({
    Content: mod.default,
    ...mod.frontmatter,
    slug: slugify(mod.frontmatter.title),
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date))
