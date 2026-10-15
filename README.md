# ORBIT — Akshat Gupta’s Developer Universe

A compact, interactive portfolio built with React and Vite. Explore four projects as orbiting planets, open their verified source links, switch between Explore / Profile / Contact, or use the optional local command terminal.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and serve it locally with `npm run preview`.

## Content updates

- Edit project descriptions, verified links, and technologies in `src/data/projects.js`.
- Edit skills and achievements in `src/data/skills.js` and `src/data/achievements.js`.
- Update the contact details in `src/data/contact.js` if they change.
- Replace `public/resume.pdf` when the downloadable résumé changes. No verified certifications are advertised.

Cura is labeled as a hackathon MVP and links to Akshat's public fork. AI Fitness Coach links to the public repository where Akshat is listed as a contributor. No unverified live demos are advertised.

## Interface

The planetary scene uses CSS orbital paths, pointer-responsive depth, and the locally bundled `planet` ASCII piece from `ascii.rest`. Its animation respects reduced-motion preferences; the terminal works entirely in the browser and is never required for navigation. Try `help`, `projects`, `about`, `contact`, or `open 01` in the terminal; Escape closes it. Project, skill, achievement, and contact content is maintained in `src/data/`.

The four planets are original CSS illustrations, not product screenshots. Project metadata, verified links, and planet colors are defined in `src/data/projects.js`.
