// Public links and technology details are included only when verified.
// JalWatch has no verified public source or demo linked here.
export const projects = [
  {
    id: 'answer-sheet-evaluator',
    number: '01',
    title: 'AI-Assisted Answer Sheet Evaluator',
    category: 'AI · Education',
    description:
      'A web app that evaluates student answers with AI-assisted marking and clear, actionable feedback.',
    tags: ['Python', 'Flask', 'Supabase', 'OpenRouter'],
    art: 'evaluation',
    featured: true,
    links: [
      { label: 'Live demo', href: 'https://ai-evaluater.onrender.com/' },
      { label: 'Source code', href: 'https://github.com/akshatg109/ai-evaluater' },
    ],
  },
  {
    id: 'webguard',
    number: '02',
    title: 'WebGuard',
    category: 'Security · Web app',
    description:
      'A defensive security analysis platform for site owners and authorized testers, focused on passive configuration checks and practical remediation guidance.',
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
      'A voice-first, therapy-informed 3D avatar companion with speech-to-text, AI conversation, and lip-synced voice responses. A guide, not a therapist.',
    tags: ['Next.js', 'TypeScript', 'OpenRouter', 'Groq', 'ElevenLabs', 'Supabase'],
    art: 'voice',
    links: [
      { label: 'Source code', href: 'https://github.com/akshatg109/cura' },
    ],
  },
]
