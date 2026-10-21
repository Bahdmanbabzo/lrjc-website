# Writing a new article

Adding a monthly appraisal takes one file. Create it, fill in the frontmatter,
push. No CMS, no database, no edit to any page.

```
content/articles/2026-10-my-topic.mdx
```

If any required field is wrong, `next build` fails and names the file and the
problem. Nothing broken can reach the archive.

---

## Frontmatter reference

```yaml
title: "The article title, phrased as the question being discussed"
slug: 2026-10-my-topic        # must be YYYY-MM-kebab-case
date: "2026-10-09"            # YYYY-MM-DD
displayDate: "October 2026"   # human-readable month
discipline: "Cardiology"      # one discipline for the archive index
status: "published"           # or "draft" — drafts are hidden everywhere

original:                     # the paper under review, never club-authored
  title: "Full title as published"
  authors: ["First A", "Second B"]
  journal: "New England Journal of Medicine"
  year: 2024
  volume: "390"
  issue: "2"
  pages: "100-110"
  doi: "10.1056/NEJMoa0000000"
  url: "https://doi.org/10.1056/NEJMoa0000000"
  studyDesign: "Randomised controlled trial"

pico:                         # optional — omit for non-PICO designs
  studyType: "Phase III RCT"
  population: "..."
  intervention: "..."
  comparator: "..."
  outcome: "..."

whySelected: >-               # why the club chose this paper
  One paragraph.
summary: >-                   # the club's own summary, 2-4 sentences
  One paragraph.
strengths:                    # rendered in the sidebar, accent rule
  - "..."
limitations:
  - "..."
takeaways:                    # numbered in the sidebar
  - "..."
contributors:                 # club members who wrote the appraisal
  - "A. Name"
figure:                       # optional
  src: "/figures/example.png"
  caption: "Figure 1. ..."
  credit: "Reproduced from ..."
references:                    # optional, rendered as a numbered list
  - authors: "..."
    title: "..."
    source: "..."
    year: 2020
    doi: "..."
```

## Body

Everything below the frontmatter is MDX, rendered inside the site's prose
style. Use standard Markdown plus:

| Element | Use it for |
|---|---|
| `##` | Major sections — *The study*, *What the authors found*, *Critical appraisal* |
| `###` | Subsections within an appraisal — *Design*, *The missing comparator* |
| `> ` | Pull quote or a key definition |
| Figure | See `components/mdx.tsx` for the `figure` component |

`figure` is available in the body:

```mdx
<Figure
  src="/figures/roc-curve.png"
  caption="Figure 3. Area under the ROC curve for the primary outcome."
  credit="Reproduced from Gulshan et al., JAMA 2016"
/>
```

The component name is `figure` (lowercase, as MDX resolves custom elements).

## House style

The appraises read as academic writing, not as blog posts. What that means in
practice, based on the three sample articles:

- **Say what the study establishes, and what it does not.** Precision beats
  confidence every time. "This study cannot address whether the intervention
  changes outcomes" is a stronger sentence than "further research is needed".
- **Critique the design, not the authors.** "The comparator is absent" rather
  than "the authors failed to include a comparator".
- **Do not manufacture weaknesses.** If a study is well designed, say so
  plainly and explain why. An appraisal that finds nothing wrong is not a
  failure of the reader.
- **Separate the paper's own claim from the field's use of it.** These drift.
- **Quote the numbers.** Sensitivity, effect size, n, confidence intervals.
  A critical appraisal that never mentions a figure is a paraphrase.
- **Finish with takeaways a reader could apply to the next paper**, not a
  summary of this one.

## Adding an annual volume

```
content/journal/2027/issue.mdx           # metadata + editorial + entry list
content/journal/2027/entries/<slug>.mdx  # one file per contribution
```

`entries:` in `issue.mdx` lists entry filenames in publication order. An
entry file listed but missing throws a descriptive build error, so the volume
can never render half-populated.

## Where things live

| Path | What it is |
|---|---|
| `content/schema.ts` | Zod schemas — the contract for every content file |
| `lib/content.ts` | Loaders: `getPublishedArticles`, `getArticle`, `getIssue` |
| `lib/site.ts` | Site name, navigation, pillars, process steps |
| `lib/research.ts` | Structured records for the Research page |
| `app/globals.css` | Design tokens and the prose style |

---

## Before launch

Sample content that must be replaced:

- [ ] `content/articles/*` — the three sample articles
- [ ] `content/journal/2026/*` — the sample volume and its eight entries
- [ ] `lib/research.ts` — placeholder projects, publications, presentations
- [ ] Team names and roles in `app/about/page.tsx` (marked in-page)
- [ ] `site.name`, `site.contact`, `site.url` in `lib/site.ts`
- [ ] Confirm the expansion of **LASUSMA** — currently assumed to be
      "Lagos State University Medical Students' Association"
