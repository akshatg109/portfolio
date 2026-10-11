# Akshat Gupta — Developer Portfolio

A responsive, dark portfolio built with React and Vite.

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
- No resume or verified certifications were present, so neither is advertised.

JalWatch has no public repository or verified technology details in the supplied workspace, so its card has no source/demo link or stack claim. Cura is labeled as a hackathon MVP and links to Akshat's public fork. AI Fitness Coach links to the public repository where Akshat is listed as a contributor.

## React Bits

Dark Veil, Blur Text, and Spotlight Card were installed from the official React Bits registry as JavaScript + CSS source using:

```bash
npx shadcn@latest add \
  @react-bits/DarkVeil-JS-CSS \
  @react-bits/BlurText-JS-CSS \
  @react-bits/SpotlightCard-JS-CSS
```

The components live in `src/components/`. Blur Text uses Motion; the source has been adapted to support semantic elements and reduced-motion preferences. Dark Veil has a CSS atmospheric fallback when WebGL2 or observer APIs are unavailable.
