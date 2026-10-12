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
- Replace `public/resume.pdf` when the downloadable résumé changes. No verified certifications are advertised.

JalWatch has no public repository or verified technology details in the supplied workspace, so its card has no source/demo link or stack claim. Sahaaya is presented as a proposed concept, not a completed application. Cura is labeled as a hackathon MVP and links to Akshat's public fork. AI Fitness Coach links to the public repository where Akshat is listed as a contributor.

## React Bits

Dark Veil, Blur Text, and Spotlight Card were installed from the official React Bits registry as JavaScript + CSS source using:

```bash
npx shadcn@latest add \
  @react-bits/DarkVeil-JS-CSS \
  @react-bits/BlurText-JS-CSS \
  @react-bits/SpotlightCard-JS-CSS
```

The component sources live in `src/components/`. Blur Text powers the staggered hero name reveal, and Spotlight Card provides pointer-following card lighting. Dark Veil is retained as source from the previous hero. The landing-page background uses ascii.rest's locally bundled Tokyo Rain piece at its native aspect ratio; hovering over the art scatters its colored ASCII cells around the pointer. Reduced-motion preferences pause the scene and cursor response.

The Skills section also uses locally bundled ascii.rest pieces. Artwork is imported into the build and does not load from ascii.rest at runtime.

The project-card illustrations are original abstract SVG studies, not screenshots of the applications. Their layout, accent colors, and metadata are defined by each project entry in `src/data/projects.js`.
