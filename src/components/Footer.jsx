import { ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-shell footer-inner">
        <a className="footer-mark" href="#top" aria-label="Back to top">AG</a>
        <p><span className="footer-prompt" aria-hidden="true">&gt;_</span> Build. Learn. Improve. Repeat.</p>
        <span>© {new Date().getFullYear()} Akshat Gupta</span>
        <a className="back-to-top" href="#top" aria-label="Back to top">
          <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
