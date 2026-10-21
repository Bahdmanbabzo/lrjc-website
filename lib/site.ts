export const site = {
  name: "LASUMSA Research & Journal Club",
  mark: "LASUMSA RJC",
  wordmark: {
    primary: "LASUMSA",
    secondary: "Research + Journal Club",
  },
  institution: "Lagos State University College of Medicine",
  organisation: "Lagos State University Medical Students' Association",
  tagline: "Building a culture of evidence, inquiry & research.",
  description:
    "A student-led platform for critical appraisal, scientific discussion, research development and scholarly communication at Lagos State University College of Medicine.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lrjc.org",
  locale: "en_NG",
  contact: {
    email: "research@lasuma.edu.ng",
    social: [
      { label: "Instagram", href: "https://instagram.com/lasumarjc" },
      { label: "LinkedIn", href: "https://linkedin.com/company/lasumarjc" },
    ],
  },
} as const;

export const nav = [
  { label: "Research", href: "/research" },
  { label: "Journal Club", href: "/journal-club" },
  { label: "Annual Journal", href: "/annual-journal" },
  { label: "About", href: "/about" },
] as const;

/** Editorial pillars shown on the homepage and About page. */
export const pillars = [
  {
    number: "01",
    title: "Research",
    body: "Developing research skills and supporting students in turning questions into rigorous scientific work.",
  },
  {
    number: "02",
    title: "Critical Appraisal",
    body: "Reading beyond the abstract. Examining methodology, evidence, limitations and clinical relevance.",
  },
  {
    number: "03",
    title: "Scientific Communication",
    body: "Creating opportunities to present, discuss, write and communicate scientific ideas clearly.",
  },
  {
    number: "04",
    title: "Collaboration",
    body: "Connecting students interested in research across disciplines, institutions and countries.",
  },
] as const;

/** The journal club's working method, shown as a five-step process. */
export const journalProcess = [
  {
    number: "01",
    verb: "Select",
    body: "A contemporary research article, chosen for its relevance and methodological interest.",
  },
  {
    number: "02",
    verb: "Read",
    body: "Members independently examine the paper before the session meets.",
  },
  {
    number: "03",
    verb: "Appraise",
    body: "Design, analysis, findings and limitations are examined line by line.",
  },
  {
    number: "04",
    verb: "Question",
    body: "What does the evidence actually tell us? What could it not tell us?",
  },
  {
    number: "05",
    verb: "Communicate",
    body: "We publish our discussion, appraisal and takeaways as a permanent record.",
  },
] as const;

export const disciplines = [
  "Oncology",
  "Neuroscience",
  "Public Health",
  "Cardiology",
  "Infectious Disease",
  "Medical Education",
  "Pharmacology",
  "Maternal & Child Health",
] as const;
