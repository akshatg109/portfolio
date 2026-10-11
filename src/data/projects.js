// Public links and technology details are included only when verified.
// JalWatch has no verified public source or demo linked here.
export const projects = [
  {
    id: 'answer-sheet-evaluator',
    number: '01',
    title: 'AI-Assisted Answer Sheet Evaluator',
    category: 'AI · Education',
    description:
      'Evaluates handwritten and printed answer sheets with vision AI, turning uploads into marks and actionable feedback.',
    highlights: [
      'Optional answer keys and batch processing for up to 60 sheets',
      'Downloadable PDF reports and Supabase-backed evaluation history',
    ],
    tags: ['Python', 'Flask', 'OpenRouter', 'Qwen3-VL', 'Supabase'],
    art: 'evaluation',
    featured: true,
    links: [
      { label: 'Source code', href: 'https://github.com/akshatg109/ai-evaluater' },
    ],
  },
  {
    id: 'webguard',
    number: '02',
    title: 'WebGuard',
    category: 'Security · Web app',
    description:
      'A defensive web-security platform for site owners and authorized testers, focused on passive configuration checks and remediation guidance.',
    highlights: [
      'Authenticated dashboard with scan history and detailed reports',
      'Optional AI explanations do not alter deterministic findings or scores',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'Supabase'],
    art: 'security',
    links: [
      { label: 'Source code', href: 'https://github.com/akshatg109/WebGuard' },
    ],
  },
  {
    id: 'ai-fitness',
    number: '03',
    title: 'AI Fitness Coach',
    category: 'AI · Wellness',
    description:
      'A Flask fitness app with personalized diet and workout guidance, Supabase-backed profiles, and browser-based exercise-form analysis.',
    highlights: [
      'Gemini plan generation with a local fallback',
      'Browser-camera form analysis and live rep counter',
    ],
    role: 'Contributor',
    tags: ['Python', 'Flask', 'Supabase', 'Gemini'],
    art: 'fitness',
    links: [
      { label: 'Source code', href: 'https://github.com/anshikakapoor0001-source/ai-fitness-coach' },
    ],
  },
  {
    id: 'jalwatch',
    number: '04',
    title: 'JalWatch',
    category: 'Community · Environment',
    description:
      'A platform for reporting and tracking lake-related issues, with a focus on community confirmations and an administrative overview.',
    tags: ['Issue reporting', 'Community confirmations', 'Admin overview'],
    art: 'water',
    links: [],
  },
  {
    id: 'cura',
    number: '05',
    title: 'Cura',
    category: 'AI · Wellbeing',
    status: 'Hackathon MVP',
    description:
      'A voice-first, therapy-informed 3D avatar companion that listens, responds, and speaks with lip-sync. A guide, not a therapist.',
    highlights: [
      'Groq speech recognition, streamed OpenRouter chat, and ElevenLabs voice',
      'Crisis-tier turns use a fixed response rather than generated advice',
    ],
    tags: ['Next.js', 'TypeScript', 'Groq Whisper', 'OpenRouter', 'ElevenLabs', 'Supabase'],
    art: 'voice',
    links: [
      { label: 'Source code', href: 'https://github.com/akshatg109/cura' },
    ],
  },
]
