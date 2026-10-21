import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { ZodType } from "zod";
import {
  articleFileSchema,
  entryFileSchema,
  issueFileSchema,
  type Article,
  type ArticleFile,
  type Entry,
  type Issue,
} from "@/content/schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ARTICLES_DIR = path.join(CONTENT_DIR, "articles");
const JOURNAL_DIR = path.join(CONTENT_DIR, "journal");

/**
 * YAML turns an unquoted `2026-09-01` into a Date object, which then fails the
 * ISO string schema. Normalise every Date to a plain YYYY-MM-DD string.
 */
function normaliseDates<T>(value: T): T {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => normaliseDates(v)) as unknown as T;
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value as object)) {
      (value as Record<string, unknown>)[key] = normaliseDates(
        (value as Record<string, unknown>)[key],
      );
    }
  }
  return value;
}

async function listMdx(dir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".mdx")).sort();
  } catch {
    return [];
  }
}

async function readAndValidate<T>(
  file: string,
  schema: ZodType<T>,
): Promise<T> {
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  const result = schema.safeParse({ data: normaliseDates(data), body: content });
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  · ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid content in ${path.relative(process.cwd(), file)}:\n${issues}\n`,
    );
  }
  return result.data;
}

let articlesPromise: Promise<ArticleFile[]> | undefined;

async function loadArticles(): Promise<ArticleFile[]> {
  const files = await listMdx(ARTICLES_DIR);
  return Promise.all(
    files.map((f) => readAndValidate(path.join(ARTICLES_DIR, f), articleFileSchema)),
  );
}

/** Every article, newest first. Drafts included so /journal-club can flag them. */
export function getAllArticles(): Promise<ArticleFile[]> {
  articlesPromise ??= loadArticles();
  return articlesPromise;
}

/** Published articles only, newest first — what the site renders. */
export const getPublishedArticles = cache(async (): Promise<Article[]> => {
  const all = await getAllArticles();
  return all
    .filter((a) => a.data.status === "published")
    .sort((a, b) => b.data.date.localeCompare(a.data.date))
    .map((a) => a.data);
});

export const getArticle = cache(async (slug: string): Promise<ArticleFile | null> => {
  const all = await getAllArticles();
  return all.find((a) => a.data.slug === slug) ?? null;
});

export async function getArticleSlugs(): Promise<string[]> {
  const all = await getPublishedArticles();
  return all.map((a) => a.slug);
}

/** The most recent published article, used for the homepage feature. */
export async function getLatestArticle(): Promise<Article | null> {
  const all = await getPublishedArticles();
  return all[0] ?? null;
}

/** Descending list of years that have at least one published article. */
export const getArticleYears = cache(async (): Promise<number[]> => {
  const all = await getPublishedArticles();
  return [...new Set(all.map((a) => new Date(a.date).getFullYear()))].sort(
    (a, b) => b - a,
  );
});

export const getArticlesByYear = cache(
  async (year: number): Promise<Article[]> => {
    const all = await getPublishedArticles();
    return all.filter((a) => new Date(a.date).getFullYear() === year);
  },
);

/* ------------------------------------------------------------------ */
/* Annual journal                                                      */
/* ------------------------------------------------------------------ */

export interface IssueWithEntries {
  issue: Issue;
  entries: Entry[];
}

export async function getIssues(): Promise<IssueWithEntries[]> {
  let years: string[] = [];
  try {
    years = (await fs.readdir(JOURNAL_DIR, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
      .reverse();
  } catch {
    return [];
  }

  const issues = await Promise.all(years.map((year) => getIssue(year)));
  return issues.filter(
    (issue): issue is IssueWithEntries => issue !== null,
  );
}

export async function getIssue(year: string): Promise<IssueWithEntries | null> {
  const dir = path.join(JOURNAL_DIR, year);
  const issuePath = path.join(dir, "issue.mdx");
  try {
    await fs.access(issuePath);
  } catch {
    return null;
  }

  const { data: issue, body: editorialBody } = await readAndValidate(
    issuePath,
    issueFileSchema,
  );

  const entries = await Promise.all(
    issue.entries.map(async (name) => {
      const entryPath = path.join(dir, "entries", `${name}.mdx`);
      try {
        await fs.access(entryPath);
      } catch {
        throw new Error(
          `Issue ${year} lists entry "${name}" but content/journal/${year}/entries/${name}.mdx does not exist.`,
        );
      }
      const { data } = await readAndValidate(entryPath, entryFileSchema);
      return data;
    }),
  );

  return { issue: { ...issue, editorialBody }, entries };
}

export async function getIssueYears(): Promise<string[]> {
  try {
    return (await fs.readdir(JOURNAL_DIR, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
      .reverse();
  } catch {
    return [];
  }
}
