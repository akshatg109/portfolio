import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navigation = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Milestones', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuToggleRef = useRef(null)

  useEffect(() => {
    const sections = navigation
      .map(item => document.querySelector(item.href))
      .filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * 0.34)
          - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.34))
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, {
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0, 0.15, 0.4],
    })

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggleRef.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar content-shell" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Akshat Gupta — back to top">
          <span className="brand-mark" aria-hidden="true">AG<span>.</span></span>
          <span className="brand-name">Akshat Gupta <i>/</i> Portfolio</span>
        </a>

        <div className={`nav-panel${menuOpen ? ' is-open' : ''}`} id="site-navigation">
          <ul className="nav-links">
            {navigation.map(item => {
              const sectionId = item.href.slice(1)
              const active = activeSection === sectionId
              return (
                <li key={item.href}>
                  <a
                    className={active ? 'is-active' : ''}
                    href={item.href}
                    aria-current={active ? 'location' : undefined}
                    onClick={() => {
                      setActiveSection(sectionId)
                      if (menuOpen) menuToggleRef.current?.focus({ preventScroll: true })
                      closeMenu()
                    }}
                  >
                    <span>{item.label}</span>
                    <i aria-hidden="true">{String(navigation.indexOf(item) + 1).padStart(2, '0')}</i>
                  </a>
                </li>
              )
            })}
          </ul>
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => {
              if (menuOpen) menuToggleRef.current?.focus({ preventScroll: true })
              closeMenu()
            }}
          >
            Let’s connect <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>
    </header>
  )
}
