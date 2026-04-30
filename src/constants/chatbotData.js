import pitchel from '../assets/pitchel.png';

export const INITIAL_MESSAGE = {
  role: 'bot',
  text: "Hi! I'm Liam's AI assistant. Ask me anything about his skills, projects, or background! #skills"
};

export const SUGGESTIONS = [
  { label: "Skills?", query: "skills" },
  { label: "Projects?", query: "projects" },
  { label: "Education?", query: "education" },
  { label: "Contact?", query: "contact" }
];

export const KNOWLEDGE_BASE = {
  skills: "Liam is proficient in **Frontend** (React, React Native, Vite, Tailwind CSS), **Backend** (Supabase, Django REST, MariaDB/SQL), and **Design** (UI/UX, Photoshop, Figma, Framer). View them at #skills.",
  projects: "His featured projects include an **Interactive Campus Kiosk** and **AgriLako** (built with React Native and Supabase). Check them out at #project-highlight.",
  education: "He is currently pursuing a **BS in Information Technology** at Saint Louis College in San Fernando City, La Union.",
  contact: "You can reach Liam at **liamkurt014@gmail.com** or find him on LinkedIn and GitHub @Liam018. More details at #contact.",
  background: "He's an IT student from San Fernando City, La Union, passionate about full-stack development and UI/UX design. Meet him at #about.",
  // Meme Logic
  pagbilan: "Kala ko ba ayaw mo?",
  gustoko: "Ha? Ilan?",
  bente: "Tarantadooo",
  bakit: "Saan mo ilalagay?",
  dito: "Ohhululll",
  default: "I'm not sure about that. Try asking about his **skills**, **projects**, **education**, or **contact** info!"
};

export const findBestResponse = (query) => {
  const q = query.toLowerCase();

  // Meme Logic First
  if (/pagbilan/i.test(q)) return { text: KNOWLEDGE_BASE.pagbilan };
  if (/gusto ko/i.test(q)) return { text: KNOWLEDGE_BASE.gustoko };
  if (/bente pesos/i.test(q)) return { text: KNOWLEDGE_BASE.bente };
  if (/bakit/i.test(q)) return { text: KNOWLEDGE_BASE.bakit };
  if (/dito oh/i.test(q)) return { text: KNOWLEDGE_BASE.dito, image: pitchel };

  // Knowledge Base with Regex
  if (/(skill|tool|stack|tech|know|language)/i.test(q)) return { text: KNOWLEDGE_BASE.skills };
  if (/(project|work|portfolio|app|build|made)/i.test(q)) return { text: KNOWLEDGE_BASE.projects };
  if (/(education|study|school|college|degree|learn)/i.test(q)) return { text: KNOWLEDGE_BASE.education };
  if (/(contact|email|reach|message|hire|linkedin|github)/i.test(q)) return { text: KNOWLEDGE_BASE.contact };
  if (/(who|about|background|bio|profile|liam)/i.test(q)) return { text: KNOWLEDGE_BASE.background };

  return { text: KNOWLEDGE_BASE.default };
};
