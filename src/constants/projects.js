import agrilakoMobile from '../assets/agrilakoMobile.jpg';
import agrilakoWeb from '../assets/agrilakoWeb.png';
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

export const highlights = [
  {
    title: "SHERCLE",
    category: "e-Gov Competition Entry • Mobile App",
    mobileImages: [shercle1, shercle2, shercle3, shercle4, shercle5, shercle6, shercle7, shercle8, shercle10, shercle11, shercle12, shercle13, shercle14, shercle15, shercle16],
    desc: "1st Runner-Up at the 7th eGov Awards 2026 — a mobile-based SOS and Community Support System. Features emergency alerts, live location sharing, and incident reporting designed to improve community safety and emergency response coordination.",
    tech: ["React", "React Native", "Expo", "PostgreSQL (Supabase)", "Tailwind"],
    links: { github: "https://github.com/Liam018", live: "#" },
    color: "from-red-500/20 to-orange-400/20"
  },
  {
    title: "AgriLako E-commerce",
    category: "Capstone Project • Web & Mobile App",
    images: [agrilakoWeb, agrilakoMobile],
    desc: "My Capstone project and 3rd place PATCH Hackathon entry: an agricultural e-commerce platform for La Union farmers. Built with React (Web), React Native (Mobile), and PostgreSQL (Backend). Features cooperative management, product listings, order tracking, and an admin dashboard for OPAG.",
    tech: ["React Native", "React", "PostgreSQL (Supabase)", "Tailwind", "Expo"],
    links: { github: "https://github.com/Liam018", live: "#" },
    color: "from-primary/20 to-secondary/20"
  },
  
  {
    title: "Interactive Campus Kiosk",
    category: "3rd Year Final Project • Web App",
    emoji: "🏫",
    desc: "A comprehensive solution for student campus life, developed as my 3rd-year final project. Offers navigation via maps, announcements, and a QR-based feedback system.",
    tech: ["React", "Django REST", "MariaDB", "Vite", "Tailwind"],
    links: { github: "https://github.com/Liam018", demo: "#" },
    color: "from-secondary/20 to-accent/20"
  }
];
