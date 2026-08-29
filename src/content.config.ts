import { defineCollection } from "astro:content";

import { glob, file } from "astro/loaders";

import { string, z } from "astro/zod";

const project = defineCollection({
  loader: glob({ base: "./content/project", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
    languages: z.array(string()),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
  }),
});

const post = defineCollection({
  loader: glob({ base: "./content/post", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(string()),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
  }),
});

export const collections = { post, project };
