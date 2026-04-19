import agrilakoMobile from '../assets/agrilakoMobile.jpg';
import agrilakoWeb from '../assets/agrilakoWeb.png';

export const highlights = [
  {
    title: "AgriLako E-commerce",
    category: "Capstone Project • Web & Mobile App",
    images: [agrilakoWeb, agrilakoMobile],
    desc: "My Capstone project and 3rd place Hackathon entry: a robust agriculture marketplace built with React(Web App), React Native(Mobile App) and Supabase - PostgreSQL(Backend). Features real-time notifications, secure user roles, and an administrative dashboard.",
    tech: ["React Native", "React", "Vite", "Tailwind", "Expo", "Supabase", "Auth"],
    links: { github: "https://github.com/Liam018", live: "#" },
    color: "from-primary/20 to-secondary/20"
  },
  {
    title: "Interactive Campus Kiosk",
    category: "3rd Year Final Project • Web App",
    desc: "A comprehensive solution for student campus life, developed as my 3rd-year final project. Offers navigation via maps, announcements, and a QR-based feedback system.",
    tech: ["React", "Django REST", "MariaDB", "Vite", "Tailwind"],
    links: { github: "https://github.com/Liam018", demo: "#" },
    color: "from-secondary/20 to-accent/20"
  }
];
