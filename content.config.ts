import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    caseStudies: defineCollection({
      type: 'page',
      source: 'work/**/*.md',
      schema: z.object({
        slug: z.string(),
        translationKey: z.string(),
        locale: z.enum(['en', 'es']),
        title: z.string(),
        description: z.string(),
        organization: z.string(),
        projectType: z.enum(['professional', 'personal']),
        sortOrder: z.number().int(),
        publishedAt: z.string().optional(),
        role: z.string(),
        period: z.string(),
        technologies: z.array(z.string()),
        skills: z.array(z.string()),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
