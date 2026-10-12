import { Component } from 'react'
import {
  Atom,
  Bot,
  BrainCircuit,
  Braces,
  CloudCog,
  Code2,
  CodeXml,
  Coffee,
  DatabaseZap,
  FileCode2,
  FlaskConical,
  Github,
  GitBranch,
  Network,
  PanelsTopLeft,
  ServerCog,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { Ascii } from 'ascii.rest/react'
import * as asciiC from 'ascii.rest/pieces/c'
import * as asciiDonut from 'ascii.rest/pieces/donut'
import * as asciiJava from 'ascii.rest/pieces/java'
import * as asciiJavaScript from 'ascii.rest/pieces/javascript'
import * as asciiPython from 'ascii.rest/pieces/python'
import * as asciiThreeBody from 'ascii.rest/pieces/three-body'
import * as asciiTypeScript from 'ascii.rest/pieces/typescript'
import { skillGroups } from '../data/skills.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const categoryIcons = {
  programming: Code2,
  frontend: PanelsTopLeft,
  backend: ServerCog,
  ai: BrainCircuit,
  workflow: Workflow,
}

const technologyIcons = {
  JavaScript: FileCode2,
  TypeScript: CodeXml,
  HTML: CodeXml,
  CSS: PanelsTopLeft,
  React: Atom,
  'Next.js': Workflow,
  Flask: FlaskConical,
  FastAPI: Network,
  Supabase: DatabaseZap,
  'API development': CloudCog,
  OpenRouter: Bot,
  Gemini: Sparkles,
  'AI API integration': BrainCircuit,
  Git: GitBranch,
  GitHub: Github,
}

const languageLogos = {
  C: asciiC,
  Java: asciiJava,
  JavaScript: asciiJavaScript,
  TypeScript: asciiTypeScript,
  Python: asciiPython,
}

const donutStill = asciiDonut.default()(0)

class AsciiErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

function TechnologyMark({ technology }) {
  const Logo = languageLogos[technology]
  const Icon = technologyIcons[technology] ?? Braces

  return (
    <span className="skill-tech__mark" aria-hidden="true">
      {Logo ? (
        <AsciiErrorBoundary fallback={<Icon size={15} strokeWidth={1.7} />}>
          <Ascii
            piece={Logo}
            options={{ fps: 12 }}
            className="skill-tech__ascii"
            label={`${technology} logo`}
            style={{ width: 23 }}
          />
        </AsciiErrorBoundary>
      ) : (
        <Icon size={15} strokeWidth={1.7} />
      )}
    </span>
  )
}

function SkillCategory({ group, index }) {
  const CategoryIcon = categoryIcons[group.id] ?? Code2

  return (
    <Reveal className="skills-category-reveal" delay={index * 65}>
      <article
        className="skills-category"
        style={{ '--skill-accent': group.accent }}
        aria-labelledby={`skill-heading-${group.id}`}
      >
        <header className="skills-category__heading">
          <span className="skills-category__number">{group.number}</span>
          <div className="skills-category__title">
            <h3 id={`skill-heading-${group.id}`}>{group.title}</h3>
            <span>{group.code}</span>
          </div>
          <CategoryIcon className="skills-category__icon" size={17} strokeWidth={1.55} aria-hidden="true" />
        </header>

        <ul className="skills-tech-list" aria-label={`${group.title} technologies`}>
          {group.items.map(technology => (
            <li className="skill-tech" key={technology}>
              <TechnologyMark technology={technology} />
              <span className="skill-tech__name">{technology}</span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

function SkillsArtwork() {
  return (
    <figure className="skills-art-panel">
      <div className="skills-art-panel__topline">
        <span><b>FIG. 01</b><i aria-hidden="true">/</i> GLYPH STUDY</span>
        <span className="skills-art-panel__local"><i aria-hidden="true" /> ASCII.REST / BUNDLED</span>
      </div>

      <div className="skills-art-panel__stage">
        <span className="skills-art-panel__reticle" aria-hidden="true" />
        <AsciiErrorBoundary
          fallback={(
            <pre className="skills-ascii-donut skills-ascii-fallback" role="img" aria-label="A still ASCII torus">
              {donutStill}
            </pre>
          )}
        >
          <Ascii
            piece={asciiDonut}
            options={{ fps: 18 }}
            className="skills-ascii-donut"
            label="A rotating three-dimensional ASCII torus"
          />
        </AsciiErrorBoundary>
      </div>

      <figcaption className="skills-art-panel__caption">
        <span><b>DONUT</b><small>ROTATING TORUS</small></span>
        <span>40 × 22 <i>GLYPHS</i></span>
      </figcaption>

      <div className="skills-art-panel__orbit">
        <div className="skills-art-panel__orbit-copy">
          <span>FIG. 02 <i>/</i> PHYSICS</span>
          <b>Three-body orbit</b>
        </div>
        <AsciiErrorBoundary
          fallback={<pre className="skills-ascii-orbit skills-ascii-fallback" aria-hidden="true">. · : . · : .</pre>}
        >
          <Ascii
            piece={asciiThreeBody}
            options={{ fps: 12 }}
            className="skills-ascii-orbit"
            label="A generative three-body figure-eight orbit"
          />
        </AsciiErrorBoundary>
      </div>
    </figure>
  )
}

export default function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-heading">
      <div className="skills-layout">
        <div className="skills-story">
          <Reveal>
            <SectionHeading
              number="03"
              eyebrow="Tools of the trade"
              title="What I work with."
              description="From programming fundamentals to modern interfaces and AI integrations, this is the toolkit behind the things I build."
              titleId="skills-heading"
            />
          </Reveal>

          <Reveal className="skills-art-reveal" delay={100}>
            <SkillsArtwork />
          </Reveal>
        </div>

        <div className="skills-catalog" role="group" aria-label="Technical skill groups">
          <div className="skills-catalog__topline">
            <span>CAPABILITY INDEX</span>
            <span>05 <i>/</i> FIELDS</span>
          </div>
          <div className="skills-categories">
            {skillGroups.map((group, index) => (
              <SkillCategory group={group} index={index} key={group.id} />
            ))}
          </div>
          <p className="skills-catalog__note">A working toolkit, always in motion.</p>
        </div>
      </div>
    </section>
  )
}
