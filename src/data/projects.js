// Public links and technology details are included only when verified.
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
    layout: 'compact',
    accent: '#8bbcff',
    status: 'Personal project',
    featured: true,
    caseStudy: {
      title: 'How an evaluation moves through the system',
      steps: [
        {
          label: 'Input',
          description: 'Add a question paper, an optional answer key, and answer sheets as PDFs or images.',
        },
        {
          label: 'Evaluate',
          description: 'Flask sends sheets to Qwen3-VL-32B-Instruct through OpenRouter. Batches of up to 60 are queued and processed sequentially with live progress.',
        },
        {
          label: 'Review',
          description: 'See marks and detailed feedback, download a PDF report for each completed sheet, and revisit saved evaluation history.',
        },
      ],
    },
    links: [
      { label: 'Live demo', href: 'https://ai-evaluater.onrender.com' },
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
    layout: 'compact',
    accent: '#6ee5de',
    status: 'MVP',
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
    layout: 'compact',
    accent: '#f2b47c',
    links: [
      { label: 'Source code', href: 'https://github.com/anshikakapoor0001-source/ai-fitness-coach' },
    ],
  },
  {
    id: 'cura',
    number: '04',
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
    layout: 'compact',
    accent: '#c691ff',
    links: [
      { label: 'Source code', href: 'https://github.com/akshatg109/cura' },
    ],
  },
]
