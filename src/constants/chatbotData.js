import pitchel from '../assets/pitchel.png';

export const INITIAL_MESSAGE = {
  id: 'init-msg-001',
  role: 'bot',
  timestamp: new Date().toISOString(),
  text: "Hi! I'm Liam's AI assistant. Ask me anything about his skills, projects, or background! #skills"
};

export const SUGGESTIONS = [
  { label: "Skills", query: "What are Liam's skills?" },
  { label: "Projects", query: "Tell me about Liam's projects" },
  { label: "Achievements", query: "What are Liam's achievements?" },
  { label: "Experience", query: "Tell me about Liam's experience" },
  { label: "Education", query: "What is Liam's education?" },
  { label: "Available?", query: "Is Liam available for hire?" },
  { label: "Contact", query: "How can I contact Liam?" },
  { label: "About", query: "Who is Liam?" },
];

export const KNOWLEDGE_BASE = {
  skills: "Liam is proficient in **Frontend** (React.js, React Native, HTML, CSS, Tailwind), **Backend** (Laravel, PHP, PostgreSQL, MySQL, Django REST), and **Design** (Figma, Framer, Photoshop, Canva). View them at #skills.",
  projects: "His featured projects include the **NFA Interactive Information Kiosk** (a touch-friendly public kiosk with content management), **ProjeSight** (a GIS-based project locator with JWT auth and PDF reporting), **SHERCLE** (a mobile SOS and community safety app), and **AgriLAKO** (an agricultural e-commerce platform for La Union farmers). Check them out at #project-highlight.",
  education: "Liam is a graduate of **Bachelor of Science in Information Technology** at **Saint Louis College** in San Fernando City, La Union (Class of 2026). His capstone project was AgriLAKO — an agricultural e-commerce system.",
  contact: "You can reach Liam at **liamkurt014@gmail.com** or find him on LinkedIn and GitHub @Liam018. More details at #contact.",
  background: "Liam is a BSIT graduate and full-stack developer from Bangcusay, San Fernando City, La Union. He completed his OJT at the **National Food Authority – Regional Office I**, where he built a public information kiosk and a GIS mapping system. Meet him at #about.",
  achievements: "Liam placed **1st Runner-Up (2nd Place)** at the 7th eGov Awards 2026 for SHERCLE, and won **3rd Place (Most Viable Product)** at the PATCH Hackathon 2025 for AgriLAKO.",
  experience: "Liam completed his On-the-Job Training (OJT) at the **National Food Authority – Regional Office I**, where he developed a full-stack public information kiosk system and a GIS-based project mapping tool (**ProjeSight**). He has hands-on experience building real-world apps across web and mobile platforms. See his work at #project-highlight.",
  availability: "Liam is currently **open to opportunities** — whether full-time roles, freelance projects, or collaborations. He's based in San Fernando City, La Union and can work remotely. Reach out at #contact!",
  // Meme Logic
  pagbilan: "Kala ko ba ayaw mo?",
  gustoko: "Ha? Ilan?",
  bente: "Tarantadooo",
  bakit: "Saan mo ilalagay?",
  dito: "Ohhululll",
  default: "I'm not sure about that. Try asking about his **skills**, **projects**, **experience**, **education**, **achievements**, or **contact** info!"
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
  if (/(experience|ojt|intern|training|job|career)/i.test(q)) return { text: KNOWLEDGE_BASE.experience };
  if (/(available|availab|open|opportunit|salary|pay|freelance|remote|hire)/i.test(q)) return { text: KNOWLEDGE_BASE.availability };
  if (/(who|about|background|bio|profile|liam)/i.test(q)) return { text: KNOWLEDGE_BASE.background };

  return { text: KNOWLEDGE_BASE.default };
};
