import { z } from "zod";

/**
 * Content schemas.
 *
 * Every MDX file under content/ is validated against these on build. An
 * article with a missing DOI or an unparseable date fails `next build`
 * rather than shipping broken.
 *
 * Zod 4 top-level string formats: z.url(), z.email()
 */

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

/** The paper being appraised — never authored by the club. */
export const originalWorkSchema = z.object({
  title: z.string().min(1, "original.title is required"),
  authors: z.array(z.string().min(1)).min(1, "original.authors needs at least one"),
  journal: z.string().min(1, "original.journal is required"),
  year: z.coerce.number().int().min(1900),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  doi: z.string().optional(),
  url: z.url().optional(),
  studyDesign: z.string().optional(),
});

/** PICO / SPIDER-style structured summary. */
export const picoSchema = z.object({
  population: z.string().min(1, "pico.population is required"),
  intervention: z.string().min(1, "pico.intervention is required"),
  comparator: z.string().min(1, "pico.comparator is required"),
  outcome: z.string().min(1, "pico.outcome is required"),
  studyType: z.string().min(1, "pico.studyType is required"),
});

export const figureSchema = z.object({
  src: z.string().min(1),
  caption: z.string().min(1),
  credit: z.string().optional(),
});

export const referenceSchema = z.object({
  authors: z.string().optional(),
  title: z.string().min(1),
  source: z.string().optional(),
  year: z.coerce.number().int().optional(),
  doi: z.string().optional(),
  url: z.url().optional(),
});

export const articleSchema = z
  .object({
    title: z.string().min(1, "title is required"),
    slug: z
      .string()
      .regex(/^\d{4}-\d{2}-[a-z0-9-]+$/, "must look like 2026-09-topic-slug"),
    date: isoDate,
    displayDate: z.string().min(1, 'displayDate is required, e.g. "September 2026"'),
    discipline: z.string().min(1, "discipline is required"),
    status: z.enum(["draft", "published"]).default("published"),
    /** Optional: an appraisal of a single published paper. Omitted for
     *  club-authored reviews, which have no paper under review. */
    original: originalWorkSchema.optional(),
    pico: picoSchema.optional(),
    whySelected: z.string().optional(),
    summary: z.string().min(1, "summary is required"),
    strengths: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    takeaways: z.array(z.string()).default([]),
    contributors: z.array(z.string()).default([]),
    figure: figureSchema.optional(),
    references: z.array(referenceSchema).default([]),
  })
  .superRefine((value, ctx) => {
    if (value.original && !value.whySelected) {
      ctx.addIssue({
        code: "custom",
        path: ["whySelected"],
        message: "whySelected is required when original (the paper under review) is set",
      });
    }
  });

/** One article as stored in an MDX file: validated frontmatter + raw body. */
export const articleFileSchema = z.object({
  data: articleSchema,
  body: z.string(),
});

export const entrySchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "must be lowercase and hyphenated"),
  section: z.string().min(1),
  authors: z.array(z.string().min(1)).default([]),
  abstract: z.string().min(1, "abstract is required"),
  pages: z.string().optional(),
  keywords: z.array(z.string()).default([]),
});

export const issueSchema = z.object({
  year: z.coerce.number().int().min(2000),
  volume: z.string().min(1, 'volume is required, e.g. "I"'),
  title: z.string().min(1),
  publishedAt: isoDate,
  season: z.string().optional(),
  theme: z.string().optional(),
  coverNote: z.string().optional(),
  editor: z.string().optional(),
  editorialTitle: z.string().optional(),
  editorialBody: z.string().default(""),
  entries: z.array(z.string().min(1)).default([]),
});

export const issueFileSchema = z.object({
  data: issueSchema,
  body: z.string(),
});

export const entryFileSchema = z.object({
  data: entrySchema,
  body: z.string(),
});

export type OriginalWork = z.infer<typeof originalWorkSchema>;
export type Pico = z.infer<typeof picoSchema>;
export type Figure = z.infer<typeof figureSchema>;
export type Reference = z.infer<typeof referenceSchema>;
export type Article = z.infer<typeof articleSchema>;
export type ArticleFile = z.infer<typeof articleFileSchema>;
export type Entry = z.infer<typeof entrySchema>;
export type Issue = z.infer<typeof issueSchema>;
export type IssueFile = z.infer<typeof issueFileSchema>;
export type EntryFile = z.infer<typeof entryFileSchema>;
