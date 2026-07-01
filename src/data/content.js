// ---------------------------------------------------------------------------
//  ALL SITE COPY LIVES HERE.
//  Edit text in this file — you never need to touch the JSX components.
//  Placeholder links are marked with `// TODO:` — fill them in.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Elaf Abd-Alrhman',
  title: 'AI Engineer · Data Analyst',
  tagline:
    'Building production AI — RAG pipelines, semantic search, and Arabic NLP for real enterprise systems.',
  email: 'elafabdalrhman345@gmail.com',
  phone: '+963 998 910 542',
  phoneHref: '+963998910542',
  location: 'Qamishli, Syria — open to remote / relocation',
  // Drop your PDF in /public and update this path (e.g. '/Elaf_Abd-Alrhman_CV.pdf')
  cvUrl: '/cv.pdf', // TODO: add your CV file to /public and point here
  // Save your photo as public/profile.jpg (or change this path).
  photo: '/profile.jpg',
  summary:
    'AI Engineer who ships production RAG pipelines, conversational AI, and semantic search into real enterprise products. Specialist in Arabic NLP and scalable FastAPI microservice architectures.',
}

// Short, punchy headline points for the About section
export const aboutHighlights = [
  {
    icon: 'Boxes',
    title: 'Production AI, shipped',
    body: 'RAG pipelines, chatbots, and semantic search live in real estate and structural-engineering products.',
  },
  {
    icon: 'Languages',
    title: 'Arabic NLP specialist',
    body: 'Dialect-aware semantic search and speech separation tuned for the acoustics of Arabic.',
  },
  {
    icon: 'Server',
    title: 'Scalable architectures',
    body: 'FastAPI microservices on Linux, integrated with Laravel queues and React frontends.',
  },
  {
    icon: 'ShieldCheck',
    title: 'On-prem & guardrailed',
    body: 'Local LLMs over enterprise knowledge bases — no hallucinations, no data leaving the building.',
  },
]

export const experience = [
  {
    role: 'AI Engineer',
    company: 'Frontier Tech',
    period: 'Nov 2025 – Present',
    location: 'Qamishli, Syria (On-site)',
    bullets: [
      'Led end-to-end integration of three AI features for Aqarat, a production real-estate platform: an intelligent support chatbot, an automated property-description generator, and a semantic search engine.',
      'Built an Arabic-dialect semantic search engine with FAISS and sentence-transformers, letting users find listings through informal, conversational queries via vector similarity search.',
      'Architected the chatbot and description generator on the Gemini API using RAG — prompt engineering, intent detection, and multi-model fallback for reliable JSON-structured outputs.',
      'Designed and deployed scalable AI microservices on Linux (FastAPI, Uvicorn, Pydantic), integrating with Laravel backends (Queues/Jobs) and React frontends.',
      'Deployed local LLMs (Ollama, Gemma) with strict guardrails over enterprise knowledge bases — eliminating hallucinations and keeping sensitive data on-premise.',
    ],
  },
]

export const projects = [
  {
    name: 'Project Arcu',
    subtitle: 'Structural Engineering AI',
    year: '2026',
    description:
      'AI desktop/web app that automates quantity takeoff for civil and structural engineers — parsing AutoCAD DXF/DWG files to autonomously generate precise Bills of Quantities for footings, columns, and beams.',
    tags: ['AutoCAD DXF/DWG', 'Computer Vision', 'Automation', 'Desktop/Web'],
    demoUrl: '#', // TODO: live demo link
    githubUrl: '#', // TODO: GitHub repo link
  },
  {
    name: 'Intelligence-Radar',
    subtitle: 'AI / RAG System',
    year: '2026',
    description:
      'AI data-extraction and retrieval system combining local LLMs with search APIs to automate data-gathering and processing workflows.',
    tags: ['RAG', 'Local LLMs', 'Search APIs', 'Data Pipelines'],
    demoUrl: '#', // TODO: live demo link
    githubUrl: '#', // TODO: GitHub repo link
  },
  {
    name: 'Arabic Speaker Separation System',
    subtitle: 'Graduation Project',
    year: '2024–2025',
    description:
      'Fine-tuned pretrained models on Arabic voice datasets to separate overlapping speech; customized architectures for the acoustic characteristics of Arabic, grounded in academic research.',
    tags: ['Speech Separation', 'Fine-tuning', 'Arabic Audio', 'PyTorch'],
    demoUrl: '#', // TODO: live demo link
    githubUrl: '#', // TODO: GitHub repo link
  },
]

export const skills = [
  {
    category: 'AI & ML',
    items: [
      'RAG Systems',
      'Local LLMs (Ollama, Qwen, Gemma)',
      'Semantic Search (FAISS, sentence-transformers)',
      'Intent Detection',
      'Prompt Engineering',
      'Arabic NLP',
    ],
  },
  {
    category: 'Backend & Architecture',
    items: [
      'Python (FastAPI)',
      'PHP (Laravel REST APIs)',
      'System Design',
      'Microservices',
      'Linux Deployment',
      'JSON Structured Output',
      'Multi-model Fallback',
    ],
  },
  {
    category: 'Data & Analytics',
    items: [
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Excel / Power BI',
    ],
  },
  {
    category: 'Languages',
    items: ['Arabic (Native)', 'Kurdish (Native)', 'English (B2)'],
  },
]

export const education = [
  {
    degree: 'B.Sc. Information Technology Engineering',
    institution: 'Damascus University',
    year: '2025',
  },
  {
    degree: 'IT Launchpad — Career Readiness & Digital Skills',
    institution: 'Averroa (Syria Cohort)',
    year: '2026',
  },
  {
    degree: 'Machine Learning Training',
    institution: 'SHAI',
    year: '2024',
  },
]

export const socials = {
  linkedin: '#', // TODO: LinkedIn profile URL
  github: '#', // TODO: GitHub profile URL
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
