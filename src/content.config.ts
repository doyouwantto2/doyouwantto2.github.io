import { glob } from "astro/loaders";
import { array, date, string } from "astro/zod";
import { defineCollection } from "astro:content";

const knowledgePostCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/knowledge-post/" }),
  schema: Object({
    author: string(),
    title: string(),
    description: string(),
    tags: array(string()),
    date: date(),
  }),
});

const projectPhaseCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/project-phase/" }),
  schema: Object({
    author: string(),
    name: string(),
    languages: array(string()),
    objective: string(),
  }),
});

export const collections = {
  knowledgePost: knowledgePostCollection,
  projectPhase: projectPhaseCollection,
};
