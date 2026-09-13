export interface Project {
  id: string;
  title: string;
  category: 'uiux' | 'brand' | 'frontend';
  categoryLabel: string;
  description: string;
  tags: string[];
  image?: string;
  caseStudyLink?: string;
  liveLink?: string;
  githubLink?: string;
  figmaEmbedUrl?: string;
  featured: boolean;
}

export const portfolioData: Project[] = [
  // --- 60% UI/UX & Product Design ---
  {
    id: 'pulse',
    title: 'Pulse Fintech App',
    category: 'uiux',
    categoryLabel: 'UI/UX & Product Design',
    description: 'End-to-end mobile banking application featuring seamless user flows, high-fidelity UI, and scalable design systems.',
    tags: ['Figma', 'Fintech', 'Design System'],
    image: '/projects/uiux/pulse.webp',
    figmaEmbedUrl: 'https://www.figma.com/proto/cZ88NZMZWc6d3aZd5lq3tH/Pulse?node-id=1309-9068&t=pPsRMuguKJJjFi30-1&scaling=min-zoom&content-scaling=fixed&page-id=1309%3A8332',
    featured: true,
  },
  {
    id: 'voya-ui',
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
    title: 'AR Mechanic App',
    category: 'uiux',
    categoryLabel: 'UI/UX & Product Design',
    description: 'Augmented reality mobile application designed for real-time vehicle diagnostics and visual repair guidance.',
    tags: ['AR/Spatial UI', 'Mobile App', 'Figma'],
    image: '/projects/uiux/ar-mechanic.webp',
    figmaEmbedUrl: 'https://www.figma.com/proto/XVz13fJDnrpzWcpFxqjEOn/AR-Assignment?node-id=604-2411&t=DD6UkBoQBm36nj8u-1&scaling=min-zoom&content-scaling=fixed&page-id=491%3A1086',
    featured: true,
  },

  // --- 20% Brand & Visual Identity ---
  {
    id: 'vitalcare',
    title: 'VitalCare Hospital',
    category: 'brand',
    categoryLabel: 'Brand & Visual Identity',
    description: 'Modern medical brand identity system, typography hierarchy, and healthcare visual communication guidelines.',
    tags: ['Branding', 'Visual Identity', 'Design System'],
    image: '/projects/brand/vitalcare.webp',
    figmaEmbedUrl: 'https://www.figma.com/proto/hvrN9zVoVRwJTbiM4Mq0JG/VitalCare-Logo-Branding?node-id=2016-762&t=20nBmG94v16ztRga-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    featured: false,
  },
  {
    id: 'cropcura',
    title: 'CROPCURA',
    category: 'brand',
    categoryLabel: 'Brand & Visual Identity',
    description: 'Agricultural technology logo design, brand architecture, and marketing assets.',
    tags: ['Logo Design', 'AgTech', 'Brand Guidelines'],
    image: '/projects/brand/cropcura.webp',
    figmaEmbedUrl: 'https://www.figma.com/proto/WGHKs2ECXI8OeDQNfQ3m9x/Cropcura?node-id=14-1459&t=5B19RBbPjbyvhF3J-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    featured: false,
  },
  {
    id: 'sara-handcraft',
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
