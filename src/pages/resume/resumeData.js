import { Star, Zap } from 'lucide-react';

export const skills = {
  technical: [
    { name: 'React / React.js', category: 'Frontend' },
    { name: 'React Native (Expo)', category: 'Mobile' },
    { name: 'TypeScript / JavaScript', category: 'Language' },
    { name: 'PHP / Laravel', category: 'Backend' },
    { name: 'PostgreSQL / Supabase', category: 'Database' },
    { name: 'MySQL / MariaDB', category: 'Database' },
    { name: 'Django REST Framework', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'HTML5 / CSS3', category: 'Core' },
  ],
  design: ['Framer', 'Figma', 'Photoshop'],
  professional: [
    'Team Collaboration',
    'Time Management',
    'Adaptable & Quick Learner',
    'Service-Oriented',
    'Agile & Problem Solving',
  ],
};

export const experience = [
  {
    title: 'On-the-Job Training Developer',
    company: 'National Food Authority (NFA) – Regional Office I',
    period: 'Feb 2026 – Jun 2026',
    location: 'Urbiztondo, San Juan, La Union',
    type: 'Government Internship',
    bullets: [
      'Programmed and configured internal digital systems to optimize daily office workflows, document tracking, and administrative processes.',
      'Handled daily technical operations, hardware troubleshooting, and accurate digital record keeping.',
      'Designed and deployed enterprise-grade web applications and interactive public kiosk interfaces.',
    ],
  },
];

export const projects = [
  {
    title: 'NFA Interactive Information Kiosk',
    context: 'NFA Regional Office I — OJT Flagship',
    period: 'Feb – Jun 2026',
    tech: ['React', 'Laravel Sanctum', 'Tailwind', 'REST API'],
    bullets: [
      "Touch-friendly public kiosk with real-time announcements, media galleries, interactive Citizen's Charter, and org charts.",
      'Admin portal with full CRUD content management, drag-and-drop ordering, and secure bulk media uploads.',
      'Laravel Sanctum auth for secure administrative access and role-based session control.',
    ],
  },
  {
    title: 'ProjeSight — Project Locator System',
    context: 'NFA Regional Office I — OJT Project',
    period: 'Feb – Jun 2026',
    tech: ['React', 'React-Leaflet (GIS)', 'PostgreSQL', 'JWT'],
    bullets: [
      'Interactive GIS mapping using React-Leaflet with enterprise UI, smooth zooming, and location deep-linking.',
      'Full-stack JWT auth, optimized SQL queries, activity auditing logs, and multi-file image uploads.',
      'Automated PDF report generation and real-time project status filtering.',
    ],
  },
  {
    title: 'SHERCLE — SOS & Community Support',
    context: '7th eGov Awards 2026 — 1st Runner-Up',
    period: 'March 2026',
    tech: ['React Native', 'Expo', 'Supabase', 'Tailwind'],
    bullets: [
      'Mobile emergency SOS app with real-time alert broadcasts, live GPS location sharing, and incident reporting.',
    ],
    award: true,
    awardLabel: '1st Runner-Up · eGov Awards 2026',
  },
  {
    title: 'AgriLAKO — Agricultural E-Commerce',
    context: 'Capstone & 3rd Place PATCH Hackathon',
    period: 'Mar – Dec 2025',
    tech: ['React Native', 'React', 'PostgreSQL', 'Expo'],
    award: true,
    awardLabel: '3rd Place · PATCH Hackathon 2025',
    bullets: [
      'Web dashboard for the Office of the Provincial Agriculturist to monitor agricultural cooperative trades and sales.',
      'Cross-platform mobile app for La Union farmers and buyers: product listings, order management, trade tracking.',
      'Collaborated with local government officials and farming cooperatives for field testing and iterative feature alignment.',
    ],
  },
];

export const achievements = [
  {
    title: '1st Runner-Up — 7th eGov Awards 2026',
    org: 'Women in STEM Summit · City of San Fernando, La Union',
    desc: 'SHERCLE — mobile SOS and community support system with emergency alerts, live location sharing, and incident reporting.',
    icon: Star,
  },
  {
    title: '3rd Place (Most Viable Product) — PATCH Hackathon 2025',
    org: 'Provincial Application & Tool for Citizens Hackathon · La Union',
    desc: 'AgriLAKO — agricultural e-commerce platform enabling farmer cooperatives to market products directly to consumers.',
    icon: Zap,
  },
];

export const education = [
  {
    degree: 'BS in Information Technology',
    school: 'Saint Louis College',
    period: '2022 – 2026',
    location: 'City of San Fernando, La Union',
    details: 'Capstone: AgriLAKO – Agricultural E-Commerce System for La Union',
    primary: true,
  },
  {
    degree: 'Senior & Junior High School',
    school: 'Saint Louis College',
    period: '2016 – 2022',
    location: 'City of San Fernando, La Union',
  },
  {
    degree: 'Primary Level',
    school: 'Dalumpinas Integrated School',
    period: '2012 – 2016',
    location: 'City of San Fernando, La Union',
  },
];

export const seminars = [
  { title: 'Cybersecurity Awareness & Workshop', org: 'Saint Louis College, La Union', period: 'April 2025' },
  { title: 'IT Careers & Opportunities Seminar', org: 'UPITDC, Quezon City, Manila', period: 'March 2025' },
  { title: 'Startup & Design Thinking Seminar', org: 'Saint Louis College, La Union', period: 'February 2025' },
];
