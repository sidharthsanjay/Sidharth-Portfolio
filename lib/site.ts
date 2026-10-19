// Everything the page says lives here, so updating the portfolio is an edit to
// this file rather than a hunt through components.

export const site = {
  name: "Sidharth S S",
  shortName: "Sidharth",
  role: "Technical Consultant & Developer",
  url: "https://sidharthsanjay.github.io/Sidharth-Portfolio",
  description:
    "Sidharth S S builds data products end to end: Next.js platforms, AI-powered search and BI dashboards on top of ERP data. Currently shipping internal platforms at NEXT for RHS Middle East.",
  email: "sidsidsapkaal@gmail.com",
  links: {
    github: "https://github.com/sidharthsanjay",
    linkedin: "https://linkedin.com/in/sidharthsapkaal",
  },
  company: {
    name: "NEXT",
    longName: "Navigators of Enterprise eXcellence & Technology",
    blurb: "the IT and backend services arm of RHS Middle East",
  },
} as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const heroWords = ["decisions.", "dashboards.", "AI search.", "live portals."];

export const stats = [
  { value: 3, suffix: "", label: "production systems built at NEXT" },
  { value: 50, suffix: "K+", label: "ERP items made searchable" },
  { value: 3, suffix: "", label: "countries' stock in one portal" },
  { value: 12, suffix: "", label: "projects shipped, work and personal" },
];

export type Metric = { value: string; label: string };

export type FeaturedProject = {
  id: "rhsme" | "aba" | "rdms";
  eyebrow: string;
  status: string;
  title: string;
  tagline: string;
  summary: string;
  role: string;
  highlights: string[];
  stack: string[];
  metrics: Metric[];
  accent: "violet" | "teal" | "coral";
  caseStudy: { heading: string; body: string }[];
};

export const featured: FeaturedProject[] = [
  {
    id: "rhsme",
    eyebrow: "NEXT · RHS Middle East",
    status: "Live in production",
    title: "RHSME Portal",
    tagline:
      "A stock-aware catalogue and RFQ portal for a hospitality supplier trading across Qatar, the UAE and Saudi Arabia.",
    summary:
      "Sales teams and clients browse interactive product catalogues where every item carries live stock, pricing and on-order figures from the Infor LN ERP, then raise a request for quotation in a couple of clicks. An executive dashboard turns the quotation book into conversion, sales and receivables views.",
    role: "Technical Consultant & Developer, NEXT team",
    highlights: [
      "Interactive PDF catalogues with 2,600+ hover zones that show per-country stock and price right on the page",
      "Daily ERP ingestion keeps 50K+ item records, stock and selling prices in sync across three countries",
      "Executive dashboard for quotations, conversion, sales and receivables, with currency rules and data retention",
      "Eight-role access model: Microsoft Entra ID sign-in, device enrolment, office network allow-lists and row-level security on every table",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
      "PostgreSQL",
      "Cloudflare Workers",
      "Entra ID",
      "pdf.js",
    ],
    metrics: [
      { value: "50K+", label: "ERP items synced daily" },
      { value: "3", label: "countries' stock live" },
      { value: "40+", label: "tables under RLS" },
    ],
    accent: "violet",
    caseStudy: [
      {
        heading: "The problem",
        body: "Product catalogues were static PDFs. To answer “do we have it, and at what price?” a salesperson had to leave the catalogue, search the ERP for each country and copy figures into an email. Quotations, conversion and receivables lived in separate spreadsheets per country.",
      },
      {
        heading: "What we built",
        body: "A Next.js portal on Cloudflare Workers backed by Supabase. Catalogue PDFs are processed in the browser with pdf.js and pdf-lib, and every product on every page becomes a hover zone linked to the ERP item master. A daily job ingests stock, selling prices, on-order quantities and sales categories, so discontinued or clearance lines are flagged on the page. Requests for quotation are numbered per year and routed to the sales team by email.",
      },
      {
        heading: "Data you can trust",
        body: "The executive dashboard is built on two written rules (what is counted, and what converts), each enforced in exactly one function and checked by tests against real exports. Currency conversion, retention windows and skipped-row reporting are all visible to administrators rather than hidden in code.",
      },
      {
        heading: "Security",
        body: "Eight roles, Microsoft Entra ID single sign-on, a per-person device limit, approved office networks, expiring client access and row-level security policies on every table, with automated tests for roles, sign-up gates and RLS.",
      },
    ],
  },
  {
    id: "aba",
    eyebrow: "NEXT · AI / ML",
    status: "In use on live enquiries",
    title: "ABA: AI Quotation Matching",
    tagline:
      "Matches messy customer requirement lines to the right ERP item code, by supplier code, free-text description or product photo.",
    summary:
      "Hotel and restaurant enquiries arrive as spreadsheets full of shorthand, sizes and brand names. ABA reads each line, searches 50K+ catalogue items with hybrid text, fuzzy and image retrieval, re-ranks the candidates with a learned model and agreed business rules, and puts every line in front of a person with a confidence score and an audit trail.",
    role: "ML & backend developer, NEXT team",
    highlights: [
      "Hybrid retrieval: bge-base text embeddings, SigLIP image embeddings and pg_trgm fuzzy matching over pgvector HNSW indexes",
      "A learned re-ranker trained on confirmed answers, plus brand-preference and in-stock rules agreed with the business",
      "Benchmark first: every change is measured on held-out Top-1/3/5 accuracy before it ships",
      "Human-in-the-loop review: workbook upload, column detection, background search, per-line decisions and Excel export",
    ],
    stack: [
      "Python",
      "FastAPI",
      "PyTorch",
      "sentence-transformers",
      "SigLIP",
      "pgvector",
      "PostgreSQL",
      "Supabase",
    ],
    metrics: [
      { value: "50K+", label: "catalogue items indexed" },
      { value: "3", label: "signals: code, text, image" },
      { value: "100%", label: "decisions audited" },
    ],
    accent: "teal",
    caseStudy: [
      {
        heading: "The problem",
        body: "A single hotel enquiry can hold hundreds of lines like “wine glass 35cl crystal” or a supplier code from another distributor. Matching each one to an Infor LN item code by hand took hours and depended on who knew the catalogue best.",
      },
      {
        heading: "How it works",
        body: "Each line is normalised (sizes, units, plurals, shorthand), then candidates come from three places: exact and fuzzy supplier codes, text embeddings over item descriptions and image embeddings over product photos. A re-ranker learned from confirmed answers orders them, and business rules put the customer's named brand and in-stock items first without ever swapping in a different product or size.",
      },
      {
        heading: "Measured, not guessed",
        body: "A ground-truth set of confirmed lines and held-out splits track Top-1, Top-3 and Top-5 accuracy for every change. The confidence model was tested against the business's accuracy bar, and because no threshold met it, nothing is routed automatically: the system proposes and a person decides.",
      },
      {
        heading: "The review workflow",
        body: "Drop a customer workbook in a folder or upload it. ABA proposes which tables and columns hold the requirements, searches every line in the background and opens a review screen where each decision is recorded with who and when. Unsure lines can be revisited, and the result downloads as Excel.",
      },
    ],
  },
  {
    id: "rdms",
    eyebrow: "NEXT · Logistics",
    status: "Phase 0 complete, backend in build",
    title: "RDMS: Royal Delivery Management",
    tagline:
      "Dispatch, live tracking and proof of delivery for a distribution fleet: one portal, a driver app and customer tracking.",
    summary:
      "Operations plan routes against vehicle capacity and delivery windows, dispatch them to drivers and watch every stop on a live map. Drivers record proof of delivery from their phones and customers follow their order in real time, all sharing one state so a dispatch in the portal shows up everywhere at once.",
    role: "Front-end & data developer, NEXT team",
    highlights: [
      "Route planning with capacity and time-window constraints, a review step and one-click dispatch",
      "Live operations map (Leaflet + MapLibre) with stop timelines and at-risk or failed-stop alerts",
      "25K-item master loaded into Supabase with change-aware upserts that retire items instead of deleting them",
      "Supabase Auth with role-based portal access and row-level security on every table",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Zustand",
      "Leaflet",
      "MapLibre GL",
      "Supabase",
    ],
    metrics: [
      { value: "25K+", label: "items in the master" },
      { value: "3", label: "apps: portal, driver, tracking" },
      { value: "11", label: "core tables, all with RLS" },
    ],
    accent: "coral",
    caseStudy: [
      {
        heading: "The problem",
        body: "Deliveries were planned on paper and phone calls. Nobody could see where a van was, which stops were at risk, or prove a delivery had happened without chasing the driver.",
      },
      {
        heading: "What's built",
        body: "The full UI for all three surfaces: a portal (dashboard, orders with Excel/CSV import, items, route planning, live operations, vehicles, drivers, reports), a mobile driver app and a customer tracking page. One client store connects them, so a dispatched route appears in the driver app and a “Delivered” tap appears on the live map and the customer's page.",
      },
      {
        heading: "Real data underneath",
        body: "Staff sign-in is real (Supabase Auth with admin and manager roles), and the item master is live: a loader matches on brand and SKU, updates what changed and marks items that left a supplier's file inactive rather than deleting them.",
      },
      {
        heading: "Next",
        body: "Phase 1 brings the Python API with PostgreSQL + PostGIS and OR-Tools route optimisation behind the screens that already exist.",
      },
    ],
  },
];

export type Category = "Data & BI" | "AI / ML" | "Web" | "Automation";

export type Project = {
  title: string;
  year: string;
  category: Category;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
  note?: string;
  gallery?: { key: "validation" | "engine" | "errors"; label: string }[];
};

const gh = (repo: string) => `https://github.com/sidharthsanjay/${repo}`;

export const projects: Project[] = [
  {
    title: "Area Insights",
    year: "2025",
    category: "Data & BI",
    description:
      "An end-to-end property insights dashboard joining sales, rental, census and crime data, with geo filtering by postcode, outcode and district, and modules for pricing trends, agent performance, tax bands, crime severity and Census 2021 demographics.",
    tags: ["Python", "Streamlit", "MongoDB", "Plotly", "Pandas", "AWS S3"],
    repo: gh("Area-Insisghts"),
  },
  {
    title: "Auto Pal",
    year: "2025",
    category: "Data & BI",
    description:
      "A suite of dashboards for property-data validation, engine performance and error-log tracking. Analysts review listings with live images and their decisions are logged to MongoDB; AWS logs are parsed into tables and charts.",
    tags: ["Python", "Streamlit", "Power BI", "MongoDB", "AWS S3", "SQL"],
    repo: gh("Auto-Pal"),
    gallery: [
      { key: "validation", label: "Validation tool" },
      { key: "engine", label: "Engine dashboard" },
      { key: "errors", label: "Error log viewer" },
    ],
  },
  {
    title: "Nutrition Tracker",
    year: "2026",
    category: "Web",
    description:
      "A mobile-first calorie and macro logger organised by meal, with a built-in South Indian food database, custom foods, and daily defaults that add your regular items automatically. Works offline, with data kept on the device.",
    tags: ["JavaScript", "HTML", "CSS", "localStorage"],
    repo: gh("Nutrition-Tracker"),
    demo: "https://sidharthsanjay.github.io/Nutrition-Tracker/",
  },
  {
    title: "NEXT Company Website",
    year: "2026",
    category: "Web",
    description:
      "The public site for NEXT, the IT and backend services arm of RHS Middle East: how the infrastructure, ERP, Infor LN and support pipeline fits together, plus client and team sign-in entry points.",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: gh("website"),
    note: "In progress",
  },
  {
    title: "Multi-Mail",
    year: "2025",
    category: "Automation",
    description:
      "Sends personalised emails with a PDF attachment to a long contact list, one message at a time so recipients never see each other, using Gmail SMTP with an app password.",
    tags: ["Python", "SMTP", "MIME"],
    repo: gh("Multi-Mail"),
  },
  {
    title: "Design2Style",
    year: "2024",
    category: "AI / ML",
    description:
      "Interactive clothing image generation that combines neural style transfer, U2-Net segmentation and saliency mapping to restyle a garment while keeping the person and background intact.",
    tags: ["Python", "PyTorch", "U2-Net", "Style transfer"],
    repo: gh("Design2Style"),
  },
  {
    title: "Smart Kids Care",
    year: "2024",
    category: "AI / ML",
    description:
      "Live CCTV monitoring that detects children reaching for harmful objects and recognises risky activity, with a working alert system.",
    tags: ["Python", "YOLO", "CNN", "OpenCV"],
    repo: gh("Smart-Kids-Care"),
  },
  {
    title: "Adidas Sales Dashboard",
    year: "2024",
    category: "Data & BI",
    description:
      "Power BI report on Adidas US sales: revenue, operating profit and units sold by region, retailer, product and sales method.",
    tags: ["Power BI", "DAX", "Excel"],
    repo: gh("Adidas-Sales-Dashboard"),
  },
  {
    title: "Blinkit Sales Dashboard",
    year: "2024",
    category: "Data & BI",
    description:
      "Power BI report on grocery sales for Blinkit, breaking down sales, ratings, outlet size, location tier and item type.",
    tags: ["Power BI", "DAX", "Excel"],
    repo: gh("blink-it-Sales-Dashboard"),
  },
];

export const categories: ("All" | Category)[] = ["All", "Data & BI", "AI / ML", "Web", "Automation"];

export const skills = [
  {
    title: "Full-stack web",
    blurb: "Production apps with auth, roles and real data underneath.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "FastAPI", "REST APIs"],
    accent: "violet",
  },
  {
    title: "Data & BI",
    blurb: "Dashboards people actually open on Monday morning.",
    items: ["Power BI", "DAX", "Tableau", "Excel", "Plotly", "Streamlit", "Pandas"],
    accent: "teal",
  },
  {
    title: "AI / ML",
    blurb: "Search and vision models, measured before they ship.",
    items: ["PyTorch", "Embeddings", "Vector search", "sentence-transformers", "SigLIP", "YOLO", "CNNs"],
    accent: "coral",
  },
  {
    title: "Data & cloud",
    blurb: "Pipelines and stores that keep the numbers honest.",
    items: ["PostgreSQL", "pgvector", "Supabase", "MongoDB", "MySQL", "AWS S3", "Cloudflare Workers"],
    accent: "amber",
  },
  {
    title: "ERP",
    blurb: "Where the business data actually lives.",
    items: ["Infor LN", "iSeries (ISER)", "ERP data modelling", "Item master & stock feeds"],
    accent: "violet",
  },
  {
    title: "Practices",
    blurb: "The unglamorous parts that make it last.",
    items: ["ETL", "Row-level security", "Benchmarking", "Git", "CI/CD", "Documentation"],
    accent: "teal",
  },
] as const;

export const marquee = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Power BI",
  "PostgreSQL",
  "Supabase",
  "pgvector",
  "PyTorch",
  "FastAPI",
  "Tailwind CSS",
  "Cloudflare",
  "Infor LN",
  "MongoDB",
  "Streamlit",
  "Plotly",
  "AWS S3",
  "DAX",
  "SQL",
  "Tableau",
];

export const approach = [
  {
    title: "Start from the business question",
    body: "What does the person need to decide, and what would make them trust the number? The rules get written down before the code.",
  },
  {
    title: "Measure before building",
    body: "Benchmarks, held-out sets and data-quality checks first, so every change can be shown to help rather than assumed to.",
  },
  {
    title: "Ship to production",
    body: "Real auth, real roles, row-level security and deployments that keep running, not a demo that only works on my laptop.",
  },
  {
    title: "Leave it explainable",
    body: "Audit trails, plain-English docs and handover notes, so the next person can see why a figure is what it is.",
  },
];
