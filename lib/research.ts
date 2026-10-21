/**
 * Structured records for the Research page.
 *
 * SAMPLE CONTENT — replace with the club's actual projects before launch.
 */

export type ProjectStatus = "Ongoing" | "Completed" | "In analysis" | "Recruiting";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  status: ProjectStatus;
  discipline: string;
  summary: string;
  method: string;
  members: string[];
  outputs: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: "beckleynet",
    title: "BeckleyNet",
    subtitle: "Brain tumour segmentation",
    year: 2026,
    status: "Ongoing",
    discipline: "Neuro-oncology",
    summary:
      "A convolutional segmentation network for multi-parametric brain MRI, with attention to the boundary-error problem that overlap metrics do not capture. Evaluated on a local cohort rather than a public benchmark alone.",
    method:
      "Deep learning · CNN / attention · Multi-parametric MRI",
    members: ["O. Eze", "T. Okafor", "N. Bello"],
    outputs: [
      "1 manuscript in preparation",
      "Poster — LASU College of Medicine research day",
    ],
  },
  {
    id: "malaria-cv",
    title: "Malaria Parasite Detection",
    subtitle: "Computer vision for thin-film microscopy",
    year: 2026,
    status: "In analysis",
    discipline: "Infectious disease",
    summary:
      "Classification of Plasmodium species in thin blood films, developed with a focus on performance under the staining and illumination variation of routine local microscopy rather than curated image sets.",
    method: "Computer vision · Transfer learning · Thin-film microscopy",
    members: ["A. Balogun", "F. Adeyemi"],
    outputs: ["1 manuscript in preparation"],
  },
  {
    id: "reporting-audit",
    title: "Reporting Quality Audit",
    subtitle: "CONSORT and STROBE adherence in Nigerian journals",
    year: 2026,
    status: "Completed",
    discipline: "Medical education",
    summary:
      "A structured audit of 412 abstracts across four indexed Nigerian medical journals, assessing which reporting items were present and which were systematically absent. Published in the 2026 annual journal.",
    method: "Cross-sectional audit · Reporting checklist",
    members: ["A. Balogun", "T. Okafor", "N. Bello", "F. Adeyemi"],
    outputs: [
      "Published — Annual Journal Vol. I, 2026",
      "Journal Club Commentary, July 2026",
    ],
    link: "/annual-journal/2026",
  },
  {
    id: "student-survey",
    title: "Final-Year Research Survey",
    subtitle: "Barriers to undergraduate research",
    year: 2026,
    status: "Completed",
    discipline: "Medical education",
    summary:
      "A cross-sectional survey of final-year students examining research participation, perceived barriers, and the association between early research exposure and later involvement.",
    method: "Cross-sectional survey · 214 respondents",
    members: ["N. Bello", "O. Eze", "A. Balogun", "T. Okafor", "F. Adeyemi"],
    outputs: ["Published — Annual Journal Vol. I, 2026"],
    link: "/annual-journal/2026",
  },
];

export interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: number;
  link?: string;
}

export const publications: Publication[] = [
  {
    authors: "Balogun A, Okafor T, Bello N, Adeyemi F",
    title:
      "Reporting quality of clinical research studies in Lagos teaching hospitals: a preliminary audit",
    venue: "LASUSMA R&JC Annual Journal, Vol. I",
    year: 2026,
    link: "/annual-journal/2026",
  },
  {
    authors: "Bello N, Okafor T",
    title: "When a screening test reaches the clinic",
    venue: "LASUSMA R&JC Annual Journal, Vol. I",
    year: 2026,
    link: "/annual-journal/2026",
  },
  {
    authors: "Eze O, Okafor T, Bello N",
    title: "Segmentation beyond the benchmark: designing evaluations for clinical use",
    venue: "LASUSMA R&JC Annual Journal, Vol. I",
    year: 2026,
    link: "/annual-journal/2026",
  },
];

export interface Presentation {
  presenters: string;
  title: string;
  venue: string;
  when: string;
  type: "Poster" | "Oral" | "Workshop";
}

export const presentations: Presentation[] = [
  {
    presenters: "Eze O, Okafor T, Bello N",
    title: "Boundary-sensitive evaluation for brain tumour segmentation",
    venue: "LASU College of Medicine Annual Research Day",
    when: "2026",
    type: "Poster",
  },
  {
    presenters: "Balogun A",
    title: "What CONSORT items are we not reporting?",
    venue: "West African Medical Education Forum",
    when: "2026",
    type: "Oral",
  },
  {
    presenters: "R&JC Journal Club",
    title: "Monthly critical appraisal sessions — open to all years",
    venue: "LASU College of Medicine",
    when: "Monthly",
    type: "Workshop",
  },
];

export interface Opportunity {
  title: string;
  commitment: string;
  body: string;
  suitedTo: string;
}

export const opportunities: Opportunity[] = [
  {
    title: "Join an ongoing project",
    commitment: "4–6 hrs / month",
    body:
      "Contribute to a running study — data collection, annotation, analysis, or writing. Projects list a named lead and a concrete next task, so you can see what your first month looks like.",
    suitedTo: "Students who want a supervised, structured start.",
  },
  {
    title: "Lead your own project",
    commitment: "Project-dependent",
    body:
      "Propose a question you can realistically answer within your remaining time. We work on scope before anything else — a bounded question that gets finished beats an ambitious one that does not.",
    suitedTo: "Students with a specific question and a supervisor in mind.",
  },
  {
    title: "Appraise with the journal club",
    commitment: "One session / month",
    body:
      "Read the month's paper, prepare your appraisal, and take part in the discussion. No prior research experience is assumed; several members have never written critically before joining.",
    suitedTo: "Everyone, including students who have never done research.",
  },
];
