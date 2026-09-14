export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'uiux' | 'brand' | 'frontend';
  categoryLabel: string;
  description: string;
  tags: string[];
  image?: string;
  caseStudyLink?: string;
  behanceUrl?: string;
  liveLink?: string;
  githubLink?: string;
  figmaEmbedUrl?: string;
  summary?: string;
  overview?: string; // Added
  problem?: string;
  research?: string[];
  process?: string[];
  solution?: string;
  targetAudience?: string[]; // Added
  challenges?: string[]; // Added
  impact?: string[];
  metrics?: { label: string; value: string }[];
  prototypeUrl?: string;
  timeline?: string;
  role?: string;
  featured: boolean;
}

export const portfolioData: Project[] = [
  // --- 60% UI/UX & Product Design ---
  {
    id: 'pulse',
    slug: 'pulse',
    title: 'Pulse Fintech App',
    category: 'uiux',
    categoryLabel: 'UI/UX & Product Design',
    description: 'End-to-end mobile banking application featuring seamless user flows, high-fidelity UI, and scalable design systems.',
    tags: ['Figma', 'Fintech', 'Design System'],
    image: '/projects/uiux/pulse.webp',
    figmaEmbedUrl: 'https://embed.figma.com/proto/cZ88NZMZWc6d3aZd5lq3tH/Pulse?node-id=1309-9068&scaling=scale-down-width&content-scaling=fixed&page-id=1309%3A8332&starting-point-node-id=1309%3A9068&embed-host=share',
    summary: 'Pulse is a mobile fintech experience designed to make everyday banking feel clear, fast, and trustworthy—from account setup to transfers and financial oversight.',
    problem: 'Digital banking products often expose users to dense information, unclear transaction states, and fragmented money-management flows. Pulse needed to reduce that cognitive load without sacrificing the confidence and detail people expect from a financial product.',
    research: [
      'Mapped the most common mobile-banking tasks and the points where uncertainty can interrupt completion.',
      'Reviewed established fintech products to identify familiar interaction patterns, trust signals, and accessibility gaps.',
      'Compared user expectations across onboarding, balance monitoring, transfers, and transaction-history flows.',
    ],
    process: [
      'Defined the product architecture and prioritized the core journeys around high-frequency banking tasks.',
      'Created low-fidelity wireframes to test hierarchy, navigation, and progressive disclosure before visual styling.',
      'Developed a reusable component system covering inputs, cards, transaction states, navigation, and feedback patterns.',
      'Connected the high-fidelity screens into an interactive prototype and refined transitions between key states.',
    ],
    solution: 'The final experience combines a focused dashboard, clear transaction feedback, guided transfer flows, and a consistent visual system. Strong hierarchy and purposeful use of color help users understand balances, actions, and status at a glance.',
    impact: [
      'Established a coherent end-to-end experience across the product’s primary banking journeys.',
      'Reduced interface complexity by grouping actions and financial information around user intent.',
      'Created a reusable design foundation that can support additional financial tools and account features.',
    ],
    metrics: [
      { label: 'Product scope', value: 'End-to-end' },
      { label: 'Primary platform', value: 'Mobile' },
      { label: 'Prototype fidelity', value: 'High' },
    ],
    prototypeUrl: 'https://embed.figma.com/proto/cZ88NZMZWc6d3aZd5lq3tH/Pulse?node-id=1309-9068&scaling=scale-down-width&content-scaling=fixed&page-id=1309%3A8332&starting-point-node-id=1309%3A9068&embed-host=share',
    timeline: '8-week product design sprint',
    role: 'Product Designer & UI/UX Designer',
    featured: true,
  },
  {
    id: 'voya-ui',
    slug: 'voya-ui',
    title: 'Voya Travel Platform',
    category: 'uiux',
    categoryLabel: 'UI/UX & Product Design',
    description: 'Responsive travel booking and itinerary planning website interface.',
    tags: ['Figma', 'Web UI', 'UX Research'],
    image: '/projects/uiux/voya.webp',
    featured: true,
  },
  {
    id: 'ar-mechanic',
    slug: 'ar-mechanic',
    title: 'AR Mechanic App',
    category: 'uiux',
    categoryLabel: 'UI/UX & Product Design',
    description: 'Augmented reality mobile application designed for real-time vehicle diagnostics and visual repair guidance.',
    tags: ['AR/Spatial UI', 'Mobile App', 'Figma'],
    image: '/projects/uiux/ar-mechanic.webp',
    figmaEmbedUrl: 'https://embed.figma.com/proto/XVz13fJDnrpzWcpFxqjEOn/AR-Assignment?node-id=604-2411&scaling=scale-down-width&content-scaling=fixed&page-id=491%3A1086&embed-host=share',
    summary: "An augmented-reality powered mobile application designed to guide everyday drivers through basic car diagnostics and repair procedures.",
    overview: "AR Mechanic eliminates guesswork, complicated manuals, and expensive shop visits by allowing users to point their phone at their engine bay to receive real-time component detection, diagnostic visualization, and step-by-step repair guidance.",
    problem: "Car maintenance is confusing and inaccessible to the average driver due to low visibility under the hood, overly technical manuals, high reliance on expensive mechanics for simple fixes, and fear of making critical mistakes.",
    solution: "An intuitive AR-powered experience that scans engine components, highlights issues visually in real-time, provides clear interactive repair steps, and reduces intimidation through accurate detection and visual safety cues.",
    targetAudience: [
    "Primary: Everyday car owners with minimal mechanical experience motivated to fix small issues.",
    "Secondary: DIY automotive enthusiasts, students in automotive training programs, and roadside assistance teams needing quick mobile diagnostics."
    ],
    research: [
    "72% of drivers feel completely 'lost' when opening their car hood.",
    "Users strongly prefer 'show-me-where' visual spatial guidance over text-heavy guides.",
    "Major user anxiety stems from touching the wrong part or causing accidental damage.",
    "AR overlay features are perceived as high-value, provided detection accuracy and trust are maintained."
    ],
    process: [
    "Deconstructed engine bays to identify high-frequency basic maintenance touchpoints (fluids, battery, filters).",
    "Developed lightweight spatial UI overlay system to ensure 3D markers don't obstruct real-world components.",
    "Designed low-confidence fallback states and explicit safety warning UI cues before hands-on repair steps."
    ],
    challenges: [
    "Visualizing complex machinery clearly in varied lighting and real-world AR environments.",
    "Ensuring HUD and UI elements don't obstruct critical physical components during repair.",
    "Designing confidence thresholds to communicate when AR detection isn't 100% certain."
    ],
    impact: [
    "Streamlined diagnostic time for basic fluid and battery checks.",
    "Increased user confidence ratings for self-service car maintenance.",
    "Reduced repair error anxiety through explicit visual safety checkpoints."
    ],
    featured: true,
  },

  // --- 20% Brand & Visual Identity ---
  {
    id: 'vitalcare',
    slug: 'vitalcare',
    title: 'VitalCare Hospital',
    category: 'brand',
    categoryLabel: 'Brand & Visual Identity',
    description: 'Modern medical brand identity system, typography hierarchy, and healthcare visual communication guidelines.',
    tags: ['Branding', 'Visual Identity', 'Design System'],
    image: '/projects/brand/vitalcare.webp',
    figmaEmbedUrl: 'https://embed.figma.com/proto/hvrN9zVoVRwJTbiM4Mq0JG/VitalCare-Logo-Branding?node-id=2016-762&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&embed-host=share',
    summary: 'VitalCare is a healthcare identity system built to communicate professional expertise with the warmth, reassurance, and accessibility patients need.',
    problem: 'The brand needed to feel credible in a clinical setting without appearing cold or institutional. Its identity also had to remain recognizable and legible across signage, digital interfaces, documents, and patient-facing materials.',
    research: [
      'Audited healthcare identities to understand recurring symbols, color conventions, and opportunities for differentiation.',
      'Explored the emotional balance between clinical authority, human care, calmness, and approachability.',
      'Reviewed practical brand touchpoints to define legibility, scale, and reproduction requirements for the identity.',
    ],
    process: [
      'Defined the brand attributes and visual territory before exploring multiple logo directions.',
      'Refined the selected mark through proportion, negative-space, and small-scale legibility studies.',
      'Built a supporting typography, color, iconography, and layout system around the core identity.',
      'Applied the system to representative hospital touchpoints and documented rules for consistent use.',
    ],
    solution: 'The resulting identity pairs a distinctive healthcare mark with a calm color palette and disciplined typographic hierarchy. Flexible layout principles allow the brand to shift from formal clinical communication to warmer patient-facing moments without losing consistency.',
    impact: [
      'Created a unified visual language for physical, editorial, and digital healthcare touchpoints.',
      'Balanced institutional trust with a more approachable and patient-centered brand expression.',
      'Provided repeatable identity rules that make future brand applications easier to create consistently.',
    ],
    metrics: [
      { label: 'Identity system', value: 'Complete' },
      { label: 'Applications', value: 'Multi-channel' },
      { label: 'Guideline model', value: 'Scalable' },
    ],
    prototypeUrl: 'https://embed.figma.com/proto/hvrN9zVoVRwJTbiM4Mq0JG/VitalCare-Logo-Branding?node-id=2016-762&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&embed-host=share',
    timeline: '6-week identity design engagement',
    role: 'Brand Strategist & Visual Designer',
    featured: false,
  },
  {
  id: 'cropcura',
  slug: 'cropcura',
  title: 'CROPCURA',
  category: 'brand',
  categoryLabel: 'Brand & Visual Identity',
  description: 'Agricultural technology logo design, brand architecture, and marketing assets.',
  tags: ['Logo Design', 'AgTech', 'Brand Guidelines'],
  image: '/projects/brand/cropcura.webp',
  figmaEmbedUrl: 'https://embed.figma.com/proto/WGHKs2ECXI8OeDQNfQ3m9x/Cropcura?node-id=14-1459&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&embed-host=share',
  featured: false,
  },
  {
    id: 'sara-handcraft',
    slug: 'sara-handcraft',
    title: 'Sara Handcraft',
    category: 'brand',
    categoryLabel: 'Brand & Visual Identity',
    description: 'Visual identity system, logo design, and craft brand positioning.',
    tags: ['Logo Design', 'Typography', 'Branding'],
    image: '/projects/brand/sara-handcraft.webp',
    featured: false,
  },

  // --- 20% Frontend & Technical Code ---
  {
    id: 'fashion-xpress',
    slug: 'fashion-xpress',
    title: 'Fashion Xpress',
    category: 'frontend',
    categoryLabel: 'Frontend & Technical Code',
    description: 'Modern e-commerce platform integrated with interactive virtual AR try-on features.',
    tags: ['React', 'Tailwind CSS', 'Vercel'],
    image: '/projects/code/fashion-xpress.webp',
    liveLink: 'https://fashion-xpress.vercel.app',
    featured: true,
  },
  {
    id: 'ai-interviewer',
    slug: 'ai-interviewer',
    title: 'AI Interviewer Dashboard',
    category: 'frontend',
    categoryLabel: 'Frontend & Technical Code',
    description: 'Candidate evaluation and intelligent interview analytics dashboard.',
    tags: ['React', 'Tailwind CSS', 'Dashboard'],
    image: '/projects/code/ai-interviewer.webp',
    liveLink: 'https://ai-interviewer-dashboard-zeta.vercel.app',
    featured: true,
  },
  {
    id: 'maya-insurance',
    slug: 'maya-insurance',
    title: 'Maya Insurance Portal',
    category: 'frontend',
    categoryLabel: 'Frontend & Technical Code',
    description: 'Multi-step insurance claims submission and tracking portal.',
    tags: ['React', 'Tailwind CSS', 'Web App'],
    image: '/projects/code/maya-insurance.webp',
    liveLink: 'https://maya-insurance.vercel.app',
    featured: true,
  },
];
