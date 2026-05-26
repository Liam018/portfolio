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
  skills: "Liam is proficient in **Frontend** (React.js, React Native, HTML, CSS, Tailwind), **Backend** (Laravel, PHP, PostgreSQL, MySQL, Django REST), and **Design** (Figma, Framer, Photoshop, Canva). View them at #skills.",
  projects: "His featured projects include the **NFA Interactive Information Kiosk** (a touch-friendly public kiosk with content management), **ProjeSight** (a GIS-based project locator with JWT auth and PDF reporting), **SHERCLE** (a mobile SOS and community safety app), and **AgriLAKO** (an agricultural e-commerce platform for La Union farmers). Check them out at #project-highlight.",
  education: "Liam is a graduate of **Bachelor of Science in Information Technology** at **Saint Louis College** in San Fernando City, La Union (Class of 2026). His capstone project was AgriLAKO — an agricultural e-commerce system.",
  contact: "You can reach Liam at **liamkurt014@gmail.com** or find him on LinkedIn and GitHub @Liam018. More details at #contact.",
  background: "Liam is a BSIT graduate and full-stack developer from Bangcusay, San Fernando City, La Union. He completed his OJT at the **National Food Authority – Regional Office I**, where he built a public information kiosk and a GIS mapping system. Meet him at #about.",
  achievements: "Liam placed **1st Runner-Up (2nd Place)** at the 7th eGov Awards 2026 for SHERCLE, and won **3rd Place (Most Viable Product)** at the PATCH Hackathon 2025 for AgriLAKO.",
  // Meme Logic
  pagbilan: "Kala ko ba ayaw mo?",
  gustoko: "Ha? Ilan?",
  bente: "Tarantadooo",
  bakit: "Saan mo ilalagay?",
  dito: "Ohhululll",
  default: "I'm not sure about that. Try asking about his **skills**, **projects**, **education**, **achievements**, or **contact** info!"
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
  if (/(education|study|school|college|degree|learn|graduate)/i.test(q)) return { text: KNOWLEDGE_BASE.education };
  if (/(contact|email|reach|message|hire|linkedin|github)/i.test(q)) return { text: KNOWLEDGE_BASE.contact };
  if (/(achieve|award|hackathon|win|place|competition|egov|patch)/i.test(q)) return { text: KNOWLEDGE_BASE.achievements };
  if (/(who|about|background|bio|profile|liam)/i.test(q)) return { text: KNOWLEDGE_BASE.background };

  return { text: KNOWLEDGE_BASE.default };
};
