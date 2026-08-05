import { Github, Linkedin } from 'lucide-react';

export const getNavLinks = (isHomePage) => [
  { name: 'About Me', href: isHomePage ? '#about' : '/#about', id: 'about' },
  { name: 'Skills', href: isHomePage ? '#skills' : '/#skills', id: 'skills' },
  { name: 'Projects', href: isHomePage ? '#project-highlight' : '/#project-highlight', id: 'project-highlight' },
  { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', id: 'contact' },
];

export const getSocialLinks = () => [
  { icon: <Github size={20} />, href: "https://github.com/Liam018", label: "GitHub" },
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9", label: "LinkedIn" },
];
