// Structured marketing content.
// Positioning: an IT solutions company that builds custom software,
// management systems and websites. ERP and Ocean ERP copy is taken from the
// live WordPress service pages. The theme's "service" post type
// is not exposed to the WordPress REST API, so services live here; blog posts
// and the contact form go through WordPress (see src/lib/wordpress.ts).
import { asset } from "@/lib/asset";

export type IconKey =
  | "buildings"
  | "browser"
  | "phone"
  | "users"
  | "chalkboard"
  | "cloud"
  | "database"
  | "truck"
  | "code"
  | "gear"
  | "brain"
  | "chart"
  | "kanban"
  | "lifebuoy"
  | "pen"
  | "scales"
  | "stethoscope"
  | "graduation"
  | "package"
  | "badge"
  | "handshake"
  | "rocket"
  | "search";

export const site = {
  name: "Parco Solutions",
  url: "https://parcosolutions.in",
  description:
    "Parco Solutions is an IT solutions company that builds custom software, management systems and websites around the way each client works.",
  phone: "+91 40-45019962",
  phoneHref: "tel:+914045019962",
  email: "info@parcosolutions.in",
  address: [
    "4th Floor, Gumedelli Commercial Complex",
    "Old Airport Rd, Begumpet",
    "Hyderabad, Telangana 500011",
  ],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Gumedelli+Commercial+Complex+Begumpet+Hyderabad",
};

export const nav = [
  { label: "Solutions", href: "/solutions/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about-us/" },
  { label: "Insights", href: "/blog/" },
];

/* ------------------------------------------------------------------ */
/* Capabilities (from the About page)                                  */
/* ------------------------------------------------------------------ */

export const capabilities: { title: string; body: string; icon: IconKey; href?: string }[] = [
  {
    title: "Custom software development",
    body: "Applications designed around your workflows and rules, not a template you have to work around.",
    icon: "code",
    href: "/service/custom-software/",
  },
  {
    title: "Management systems",
    body: "Case, patient, student, inventory, HR and client management systems built to your process.",
    icon: "kanban",
    href: "/service/management-systems/",
  },
  {
    title: "Websites and web apps",
    body: "Fast, professional websites and portals that are easy for your team to keep up to date.",
    icon: "browser",
    href: "/service/web-development/",
  },
  {
    title: "Mobile applications",
    body: "Android and iOS apps connected to the same data as your web systems.",
    icon: "phone",
    href: "/service/mobile-apps/",
  },
  {
    title: "IT solutions",
    body: "Cloud hosting, automation, AI and reporting layered onto the systems you already rely on.",
    icon: "cloud",
    href: "/solutions/",
  },
  {
    title: "Support and maintenance",
    body: "Hosting, backups, updates and a team to call when something needs to change.",
    icon: "lifebuoy",
  },
];

/* Management systems we are commonly asked to build. */
export const systemTypes: { title: string; body: string; icon: IconKey }[] = [
  { title: "Case management", body: "Matters, hearings, documents and client records for law practices.", icon: "scales" },
  { title: "Hospital and clinic", body: "Patients, appointments, doctors and billing in one place.", icon: "stethoscope" },
  { title: "School and institute", body: "Admissions, attendance, fees, timetables and results.", icon: "graduation" },
  { title: "Inventory and billing", body: "Stock, purchases, invoices and supplier records.", icon: "package" },
  { title: "HR and payroll", body: "Employees, attendance, leave and monthly payroll.", icon: "badge" },
  { title: "CRM and sales", body: "Leads, follow-ups, quotations and customer history.", icon: "handshake" },
];

export const process: { title: string; body: string; icon: IconKey }[] = [
  { title: "Understand", body: "We sit with the people who will use the system and map how work really flows.", icon: "search" },
  { title: "Design", body: "Screens and data structures agreed with you before production code starts.", icon: "pen" },
  { title: "Build", body: "Short, reviewable iterations so you see working software every few weeks.", icon: "code" },
  { title: "Launch and support", body: "Hosting, training, handover and ongoing updates as your needs change.", icon: "rocket" },
];

export const industries = ["Healthcare", "Manufacturing", "Education", "Retail", "Government"];

/* ------------------------------------------------------------------ */
/* Services (one page each under /service/[slug]/, matching old URLs)  */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  icon: IconKey;
  image: string;
  imageAlt: string;
  figure: string;
  sections: { title: string; items: { title: string; body?: string }[] }[];
  specs?: { label: string; value: string }[];
  useCases?: string[];
  useCasesLabel?: string;
  /** "build" = core custom work; "enterprise" = platforms and products */
  group: "build" | "enterprise";
};

export const services: Service[] = [
  {
    slug: "custom-software",
    group: "build",
    name: "Custom Software Development",
    short: "Software designed around your workflows, not the other way round.",
    summary:
      "Off-the-shelf tools force your team to work their way. We build applications around how your business actually runs: your processes, your rules, your reports.",
    icon: "code",
    image: asset("/images/svc-custom.webp"),
    imageAlt: "Developer working at a desk with three bright monitors, seen from above",
    figure: "Built to your process",
    sections: [
      {
        title: "What we build",
        items: [
          { title: "Business applications", body: "Internal tools that replace spreadsheets, paper registers and email chains." },
          { title: "Client and partner portals", body: "Secure logins where customers, vendors or staff see exactly what they need." },
          { title: "Automation and integrations", body: "Connect the systems you already use so data is entered once." },
          { title: "Dashboards and reports", body: "Live numbers for owners and managers, without waiting for month end." },
        ],
      },
      {
        title: "What you get",
        items: [
          { title: "Software that matches how your team works" },
          { title: "Role-based access for staff, managers and clients" },
          { title: "Web access from any device, with optional mobile apps" },
          { title: "Clear ownership of your data and source code" },
          { title: "Training for your team at handover" },
          { title: "Ongoing support, hosting and updates" },
        ],
      },
    ],
  },
  {
    slug: "management-systems",
    group: "build",
    name: "Management Systems",
    short: "Case, patient, student, inventory, HR and client management, built to fit.",
    summary:
      "A management system keeps every record, task and document for your operation in one secure place. We build them to match your exact workflow, from a law practice to a hospital.",
    icon: "kanban",
    image: asset("/images/svc-management.webp"),
    imageAlt: "Hand arranging workflow cards on a whiteboard process map",
    figure: "Every record in one place",
    sections: [
      {
        title: "Systems we build",
        items: [
          { title: "Case management", body: "Matters, hearing dates, documents and client records for advocates and law firms." },
          { title: "Hospital and clinic management", body: "Patient records, appointments, doctor schedules and billing." },
          { title: "School and institute management", body: "Admissions, attendance, fees, timetables and results." },
          { title: "Inventory and billing", body: "Stock levels, purchases, invoices and supplier records." },
          { title: "HR and payroll", body: "Employee records, attendance, leave and payroll runs." },
          { title: "CRM and sales", body: "Leads, follow-ups, quotations and full customer history." },
        ],
      },
      {
        title: "Built into every system",
        items: [
          { title: "Secure logins with roles and permissions" },
          { title: "Search across every record" },
          { title: "Document uploads and storage" },
          { title: "Reports and exports to Excel or PDF" },
          { title: "Reminders and notifications" },
          { title: "Daily backups" },
        ],
      },
    ],
    useCases: ["Legal", "Healthcare", "Education", "Retail", "Manufacturing", "Services"],
    useCasesLabel: "Industries",
  },
  {
    slug: "web-development",
    group: "build",
    name: "Websites and Web Apps",
    short: "Professional websites and web applications, designed, built and hosted for you.",
    summary:
      "Your website is often the first conversation a client has with you. We design and build fast, professional sites that are easy to update, then keep them secure and running.",
    icon: "browser",
    image: asset("/images/svc-web.webp"),
    imageAlt: "Code editor open on a laptop in a dark room",
    figure: "Designed, built and hosted in-house",
    sections: [
      {
        title: "What we build",
        items: [
          { title: "Business and professional websites", body: "For practices, clinics, hospitals, schools and companies." },
          { title: "Web applications", body: "Booking, enquiry and records systems that run in the browser." },
          { title: "Headless WordPress", body: "Edit content in WordPress while visitors get a fast static site." },
          { title: "Redesigns", body: "Bring an older site up to date without losing search rankings." },
        ],
      },
      {
        title: "How we work",
        items: [
          { title: "Discovery with the people who will use it" },
          { title: "Design and build in short, reviewable iterations" },
          { title: "Mobile-first, accessible and search-friendly" },
          { title: "Domain, hosting and email setup" },
          { title: "Launch, training and handover" },
          { title: "Ongoing support and updates" },
        ],
      },
    ],
  },
  {
    slug: "mobile-apps",
    group: "build",
    name: "Mobile App Development",
    short: "Android and iOS apps connected to your systems and data.",
    summary:
      "Give staff and customers the same system in their pocket. We build mobile apps that share data with your web software, so everything stays in sync.",
    icon: "phone",
    image: asset("/images/svc-mobile.webp"),
    imageAlt: "Person holding a smartphone beside an open laptop",
    figure: "Your system, in every pocket",
    sections: [
      {
        title: "What we build",
        items: [
          { title: "Staff and field apps", body: "Attendance, visits, orders and updates captured on the move." },
          { title: "Customer apps", body: "Bookings, orders, status tracking and notifications." },
          { title: "Companion apps", body: "Mobile access to an existing management system or portal." },
          { title: "Android and iOS", body: "One codebase where it makes sense, native where it matters." },
        ],
      },
    ],
  },
  {
    slug: "oceanerp",
    group: "enterprise",
    name: "Ocean ERP",
    short: "One affordable system for finance, inventory, sales, projects and HR.",
    summary:
      "Ocean ERP is our integrated ERP for emerging and growing businesses. It brings company data and processes into a single system and database, with real-time control from finance through to quality management.",
    icon: "chart",
    image: asset("/images/svc-oceanerp.webp"),
    imageAlt: "Analytics dashboard with line and histogram charts on a laptop screen",
    figure: "Finance to HR, one database",
    sections: [
      {
        title: "Modules",
        items: [
          {
            title: "Financial management",
            body: "Excel-based financial statements, balance sheet and income statement setup, GL budgeting and reconciliation.",
          },
          {
            title: "Project management",
            body: "Active project analysis, estimated versus actual profitability and WBS support.",
          },
          {
            title: "Service management",
            body: "Equipment performance tracking, automated maintenance, scheduling and warranty cost control.",
          },
          {
            title: "Sales management",
            body: "Incentive setup, quotation and sales tracking, and sales performance insights.",
          },
          {
            title: "HR management",
            body: "Payroll analysis, asset management integration, hiring cycle and PRO activities.",
          },
        ],
      },
      {
        title: "Built-in tools",
        items: [
          { title: "Smart purchasing with Purchase Analyzer" },
          { title: "Custom payment terms with automatic enforcement" },
          { title: "Purchase insights and quick-facts dashboards" },
          { title: "Performance management and monitoring" },
          { title: "Integrated workflow engine and reporting" },
        ],
      },
    ],
  },
  {
    slug: "erp",
    group: "enterprise",
    name: "ERP Services",
    short: "Vendor-neutral ERP selection, implementation and support.",
    summary:
      "An independent, technology-agnostic approach to choosing and implementing ERP, so you avoid vendor lock-in and keep time, cost and risk under control.",
    icon: "gear",
    image: asset("/images/svc-erp.webp"),
    imageAlt: "Engineer working at a laptop beside automated manufacturing equipment",
    figure: "Phased, controlled rollouts",
    sections: [
      {
        title: "Capabilities",
        items: [
          { title: "ERP selection and implementation", body: "Pick the platform that fits your processes, not the vendor's quota." },
          { title: "Support and upgrades", body: "Stable, current systems with predictable maintenance windows." },
          { title: "Templates and rollouts", body: "Phased deployments that minimise disruption across sites." },
          { title: "Custom development and integrations", body: "Connect ERP to the rest of your stack." },
          { title: "Programme governance", body: "Project management that keeps scope, budget and timelines visible." },
          { title: "Vendor negotiation", body: "Licensing and contract guidance that lowers total cost of ownership." },
        ],
      },
    ],
    useCases: ["Ocean ERP", "Microsoft Dynamics"],
    useCasesLabel: "Platforms",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const buildServices = services.filter((s) => s.group === "build");
export const enterpriseServices = services.filter((s) => s.group === "enterprise");

/* ------------------------------------------------------------------ */
/* Solutions (from the Our Solutions page)                             */
/* ------------------------------------------------------------------ */

export const solutions: {
  id: string;
  name: string;
  body: string;
  image: string;
  imageAlt: string;
  icon: IconKey;
  items: string[];
}[] = [
  {
    id: "cloud",
    name: "Cloud",
    body: "Build secure, scalable and cost-effective applications on cloud infrastructure, and move existing workloads without downtime surprises.",
    image: asset("/images/sol-cloud.webp"),
    imageAlt: "Night-time satellite view of city lights across a continent",
    icon: "cloud",
    items: [
      "Ocean ERP in the cloud",
      "Cloud migration",
      "Microsoft Azure solutions",
      "Cloud infrastructure",
      "Backup and disaster recovery",
      "Cloud security",
      "DevOps and CI/CD",
    ],
  },
  {
    id: "ai",
    name: "AI and automation",
    body: "Automate repetitive work, extract information from documents and make decisions on data instead of instinct.",
    image: asset("/images/sol-ai.webp"),
    imageAlt: "A half-open laptop glowing in a dark room",
    icon: "brain",
    items: [
      "AI-powered chatbots",
      "Document processing",
      "Predictive analytics",
      "Machine learning solutions",
      "Business intelligence dashboards",
      "Intelligent workflow automation",
    ],
  },
  {
    id: "data",
    name: "Data and analytics",
    body: "Turn the data your systems already collect into dashboards and reports that leadership reads every week.",
    image: asset("/images/sol-data.webp"),
    imageAlt: "Laptop showing business charts and a ring chart on a desk",
    icon: "chart",
    items: [
      "Interactive dashboards",
      "Business intelligence",
      "Data visualisation",
      "KPI reporting",
      "Performance analytics",
      "Executive reports",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Client work (replaces the old theme logo strip)                     */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string;
  client: string;
  role: string;
  sector: string;
  deliverables: string[];
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
  detailImage?: string;
  detailAlt?: string;
  /** Live site URL. Add it here to show a "Visit site" link. */
  url?: string;
};

export const work: CaseStudy[] = [
  {
    slug: "mohammed-fasi-uddin",
    client: "Mohammed Fasi Uddin",
    role: "Advocate, High Court",
    sector: "Legal",
    deliverables: ["Custom website", "Case Management System"],
    summary:
      "A professional web presence for a High Court advocate, plus a private Case Management System that keeps every matter and client record in one place.",
    points: [
      "Public website presenting the practice and its areas of work",
      "Case Management System for matters, hearings and client records",
      "Designed, built and supported by Parco end to end",
    ],
    image: asset("/images/work-advocate.webp"),
    imageAlt: "Bronze statue of Lady Justice holding scales",
    detailImage: asset("/images/work-advocate-cms.webp"),
    detailAlt: "Library shelves of bound law volumes",
  },
  {
    slug: "oxygen-hospital",
    client: "Oxygen Hospital",
    role: "Multi-speciality hospital",
    sector: "Healthcare",
    deliverables: ["Custom website"],
    summary:
      "A custom website that helps patients find the right department, specialist and contact route quickly, on any device.",
    points: [
      "Department and specialist information",
      "Clear contact and enquiry routes for patients",
      "Responsive build tuned for mobile visitors",
    ],
    image: asset("/images/work-hospital.webp"),
    imageAlt: "Modern hospital building with a covered entrance",
    detailImage: asset("/images/work-hospital-interior.webp"),
    detailAlt: "Bright hospital reception and waiting area",
  },
];
