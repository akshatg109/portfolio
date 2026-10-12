import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CursorAura from './components/CursorAura.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

export default function App() {
  return (
    <div className="portfolio-site">
      <ScrollProgress />
      <CursorAura />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <div className="content-shell">
          <About />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}
