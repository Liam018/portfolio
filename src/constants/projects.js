import agrilako from '../assets/agrilakoMobile.jpg';
import agrilakoweb from '../assets/agrilakoWeb.png';
import agrilakoWeb1 from '../assets/agrilako/web/image_1.png';
import agrilakoWeb2 from '../assets/agrilako/web/image_2.png';
import agrilakoWeb3 from '../assets/agrilako/web/image_3.png';
import agrilakoWeb4 from '../assets/agrilako/web/image_4.png';
import agrilakoWeb5 from '../assets/agrilako/web/image_5.png';
import agrilakoMobile1 from '../assets/agrilako/mobile/image_1.jpg';
import agrilakoMobile2 from '../assets/agrilako/mobile/image_2.jpg';
import agrilakoMobile3 from '../assets/agrilako/mobile/image_3.jpg';
import agrilakoMobile4 from '../assets/agrilako/mobile/image_4.jpg';
import agrilakoMobile5 from '../assets/agrilako/mobile/image_5.jpg';
import agrilakoMobile6 from '../assets/agrilako/mobile/image_6.jpg';
import agrilakoMobile7 from '../assets/agrilako/mobile/image_7.jpg';
import agrilakoMobile8 from '../assets/agrilako/mobile/image_8.jpg';
import agrilakoMobile9 from '../assets/agrilako/mobile/image_9.jpg';
import agrilakoMobile10 from '../assets/agrilako/mobile/image_10.jpg';
import agrilakoMobile11 from '../assets/agrilako/mobile/image_11.jpg';
import agrilakoMobile12 from '../assets/agrilako/mobile/image_12.jpg';
import agrilakoMobile13 from '../assets/agrilako/mobile/image_13.jpg';
import agrilakoMobile14 from '../assets/agrilako/mobile/image_14.jpg';
import shercle1 from '../assets/shercle_photos/mobile/shercle1.jpg';
import shercle2 from '../assets/shercle_photos/mobile/shercle2.jpg';
import shercle3 from '../assets/shercle_photos/mobile/shercle3.jpg';
import shercle4 from '../assets/shercle_photos/mobile/shercle4.jpg';
import shercle5 from '../assets/shercle_photos/mobile/shercle5.jpg';
import shercle6 from '../assets/shercle_photos/mobile/shercle6.jpg';
import shercle7 from '../assets/shercle_photos/mobile/shercle7.jpg';
import shercle8 from '../assets/shercle_photos/mobile/shercle8.jpg';
import shercle10 from '../assets/shercle_photos/mobile/shercle10.jpg';
import shercle11 from '../assets/shercle_photos/mobile/shercle11.jpg';
import shercle12 from '../assets/shercle_photos/mobile/shercle12.jpg';
import shercle13 from '../assets/shercle_photos/mobile/shercle13.jpg';
import shercle14 from '../assets/shercle_photos/mobile/shercle14.jpg';
import shercle15 from '../assets/shercle_photos/mobile/shercle15.jpg';
import shercle16 from '../assets/shercle_photos/mobile/shercle16.jpg';

// ProjeSIGHT
import projesightHome from '../assets/projesight/home.png';
import projesightLogin from '../assets/projesight/login.png';
import projesightAddProj from '../assets/projesight/add_proj.png';
import projesightAddProj1 from '../assets/projesight/add_proj1.png';
import projesightAddProj2 from '../assets/projesight/add_proj2.png';
import projesightViewProj from '../assets/projesight/view_proj.png';
import projesightViewProj1 from '../assets/projesight/view_proj1.png';
import projesightViewProj2 from '../assets/projesight/view_proj2.png';
import projesightEditProj from '../assets/projesight/edit_proj.png';
import projesightReport from '../assets/projesight/report.png';
import projesightReport1 from '../assets/projesight/report1.png';
import projesightAudit from '../assets/projesight/audit.png';
import projesightUser from '../assets/projesight/user.png';
import projesightArchive from '../assets/projesight/archive.png';
import projesightSettings from '../assets/projesight/settings.png';

export const highlights = [
  {
    title: "SHERCLE",
    category: "e-Gov Competition Entry • Mobile App",
    mobileImages: [shercle1, shercle2, shercle3, shercle4, shercle5, shercle6, shercle7, shercle8, shercle10, shercle11, shercle12, shercle13, shercle14, shercle15, shercle16],
    desc: "1st Runner-Up at the 7th eGov Awards 2026 — a mobile-based SOS and Community Support System. Features emergency alerts, live location sharing, and incident reporting designed to improve community safety and emergency response coordination.",
    tech: ["React", "Vite", "React Native", "Expo", "PostgreSQL (Supabase)", "Tailwind"],
    links: { github: "https://github.com/Liam018", live: "#" },
    color: "from-red-500/20 to-orange-400/20"
  },
  {
    title: "AgriLako E-commerce",
    category: "Capstone Project • Web & Mobile App",
    images: [agrilakoweb, agrilakoWeb1, agrilakoWeb2, agrilakoWeb3, agrilakoWeb4, agrilakoWeb5],
    mobileImages: [agrilako, agrilakoMobile1, agrilakoMobile2, agrilakoMobile3, agrilakoMobile4, agrilakoMobile5, agrilakoMobile6, agrilakoMobile7, agrilakoMobile8, agrilakoMobile9, agrilakoMobile10, agrilakoMobile11, agrilakoMobile12, agrilakoMobile13, agrilakoMobile14],
    desc: "My Capstone project and 3rd place PATCH Hackathon entry: an agricultural e-commerce platform for La Union farmers. Built with React (Web), React Native (Mobile), and PostgreSQL (Backend). Features cooperative management, product listings, order tracking, and an admin dashboard for OPAG.",
    tech: ["React Native", "React", "Vite", "PostgreSQL (Supabase)", "Tailwind", "Expo"],
    links: { github: "https://github.com/Liam018", live: "#" },
    color: "from-primary/20 to-secondary/20"
  },
  
  {
    title: "ProjeSIGHT",
    category: "Full-Stack Web App • GIS & Infrastructure Monitoring",
    images: [projesightHome, projesightAddProj, projesightAddProj1, projesightAddProj2, projesightViewProj, projesightViewProj1, projesightViewProj2, projesightEditProj, projesightReport, projesightReport1, projesightAudit, projesightUser, projesightArchive, projesightSettings],
    mobileImages: [projesightLogin],
    desc: "A full-stack GIS and infrastructure project monitoring platform. Features an interactive Leaflet map with PSGC administrative hierarchy, complete project & financial lifecycle tracking, automated bi-monthly compliance report generation, JWT-based role access control (Admin / Staff / Viewer), security audit logging, and site photo uploads.",
    tech: ["React", "Vite", "Leaflet", "Node.js", "Express.js", "MySQL", "JWT", "Bcrypt.js"],
    links: { github: "https://github.com/Liam018", live: "#" },
    color: "from-blue-500/20 to-cyan-400/20"
  },
  // {
  //   title: "Interactive Campus Kiosk",
  //   category: "3rd Year Final Project • Web App",
  //   emoji: "🏫",
  //   desc: "A comprehensive solution for student campus life, developed as my 3rd-year final project. Offers navigation via maps, announcements, and a QR-based feedback system.",
  //   tech: ["React", "Django REST", "MariaDB", "Vite", "Tailwind"],
  //   links: { github: "https://github.com/Liam018", demo: "#" },
  //   color: "from-secondary/20 to-accent/20"
  // }
];
