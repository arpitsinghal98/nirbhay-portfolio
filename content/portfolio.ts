export type Project = {
  id: "rag" | "econnect" | "commerce";
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  overview: string;
  highlights: string[];
  note: string;
  links: { label: string; href: string }[];
};

// Curated from Nirbhay's supplied résumé and previous portfolio.
// Keep these facts in sync: both the page and AI assistant use this content.
export const projects: Project[] = [
  {
    id: "rag",
    number: "01",
    title: "AI Agent & RAG System",
    category: "AI agents · Enterprise search",
    description:
      "Turning documents into useful answers with context retrieval, autonomous agents, and intelligent workflows.",
    tags: ["LLM integration", "RAG", "Automation"],
    overview:
      "An AI workflow system exploring how document indexing, context retrieval, and structured prompts can support enterprise search and chatbot experiences.",
    highlights: [
      "Document indexing and vector-based context retrieval.",
      "Prompt structuring for context-aware responses.",
      "AI agent workflows and development assistance using Claude, GPT-4, and DeepSeek.",
    ],
    note: "Based on résumé-reported work. Implementation details, evaluation results, and a public repository have not been supplied. The cover is an illustrative concept, not a product screenshot.",
    links: [],
  },
  {
    id: "econnect",
    number: "02",
    title: "E-Connect",
    category: "Full-stack · Hackathon",
    description:
      "A collaborative platform for anonymous peer learning, knowledge exchange, and real-time community engagement.",
    tags: ["React", "Node.js", "Community"],
    overview:
      "A hackathon project built around a simple idea: make it easier for people to ask questions and exchange knowledge with their peers.",
    highlights: [
      "Anonymous peer learning and knowledge sharing.",
      "A React interface supported by Node.js.",
      "Real-time community engagement and collaboration.",
    ],
    note: "A public demo and repository have not been supplied. The cover is an illustrative interface concept.",
    links: [],
  },
  {
    id: "commerce",
    number: "03",
    title: "E-commerce Rebuilds",
    category: "Full-stack · Learning projects",
    description:
      "Full-stack recreations exploring secure authentication, product discovery, and payment checkout flows.",
    tags: ["MERN stack", "OAuth & JWT", "Payments"],
    overview:
      "Learning recreations of Bewakoof and ModeSens, built to practice complete shopping journeys with the MERN stack: MongoDB, Express, React, and Node.js.",
    highlights: [
      "Product browsing and filtering interfaces.",
      "Authentication using OAuth 2.0 and JWT.",
      "Payment and checkout integration.",
    ],
    note: "Independent educational projects, not commercial work for or affiliations with either brand. Public demos are older projects and may depend on inactive third-party services.",
    links: [
      {
        label: "Bewakoof source",
        href: "https://github.com/NirbhayPratapSingh/bewakoof.com-Clone",
      },
      {
        label: "Bewakoof demo",
        href: "https://heady-rabbits-8957.vercel.app/",
      },
      {
        label: "ModeSens demo",
        href: "https://romantic-pasteur-18fbf4.netlify.app/",
      },
    ],
  },
];

export const about = [
  "I started in mechanical engineering, fascinated by how things work. That curiosity took me into software — and eventually into building systems that can work with knowledge, context, and AI.",
  "Today, I bring together full-stack development and applied AI: responsive interfaces, dependable backend services, and workflows that make information more useful.",
  "I enjoy working through the details with a team, sharing what I learn, and turning an ambitious idea into something people can use.",
];

export const education = [
  {
    period: "2021 — 2022",
    qualification: "Full-Stack Web Development",
    institution: "Masai School, Bangalore",
  },
  {
    period: "2015 — 2019",
    qualification: "B.Tech, Mechanical Engineering",
    institution: "Stani Memorial College of Engineering",
  },
];

export const experience = {
  period: "2022 — 2025",
  location: "Chennai, India",
  title: "Software Engineer I",
  company: "NewgenDigital",
  client: "TVS Motor Company",
  contributions: [
    "Built responsive web portals with React, MobX, and Ant Design, connected to enterprise REST APIs.",
    "Developed dashboard services with .NET Core and SQL Server for TVS vehicle booking workflows.",
    "Integrated SendGrid for transactional email workflows and automated communication tracking.",
    "Designed AI agent workflows and RAG pipelines for document indexing, prompt structuring, and development support.",
  ],
  practices:
    "Agile planning, standups, team collaboration, and release documentation.",
};

export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Ant Design",
      "MobX",
      "HTML & CSS",
    ],
  },
  {
    title: "Backend & data",
    skills: [
      "Node.js",
      "Express",
      ".NET Core / C#",
      "SQL Server",
      "MongoDB",
      "REST APIs",
    ],
  },
  {
    title: "Applied AI",
    skills: [
      "AI agents",
      "RAG",
      "Prompt engineering",
      "LLM integration",
      "Workflow automation",
    ],
  },
];

export const suggestedQuestions = [
  "What does Nirbhay build?",
  "Tell me about his AI work",
  "What’s his professional experience?",
  "How can I contact him?",
];
