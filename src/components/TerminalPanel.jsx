import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { contact } from '../data/contact.js'

function TerminalOutput({ response, projects, onOpenProject }) {
  if (response.kind === 'projects') {
    return (
      <div className="terminal-projects">
        {projects.map(project => (
          <button type="button" key={project.id} onClick={() => onOpenProject(project)}>
            <span>{project.number}</span>{project.title}<ArrowUpRight size={13} aria-hidden="true" />
          </button>
        ))}
      </div>
    )
  }

  if (response.kind === 'contact') {
    return (
      <div className="terminal-contact-links">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
      </div>
    )
  }

  return <p>{response.text}</p>
}

function resolveCommand(value, projects) {
  const command = value.trim().toLowerCase()

  if (command === 'help') {
    return { kind: 'text', text: 'Commands: help · projects · about · contact · clear · open 01' }
  }
  if (command === 'projects') return { kind: 'projects' }
  if (command === 'clear') return { kind: 'clear' }
  if (command === 'about') {
    return { kind: 'text', text: 'Akshat Gupta — BCA student at Jain University, Bengaluru. Full-stack development, AI applications, and defensive cybersecurity.' }
  }
  if (command === 'contact') return { kind: 'contact' }

  const openMatch = command.match(/^open\s+(\d{1,2})$/)
  if (openMatch) {
    const project = projects.find(item => item.number === openMatch[1].padStart(2, '0'))
    return project
      ? { kind: 'open', project }
      : { kind: 'text', text: `No project ${openMatch[1].padStart(2, '0')} in this archive. Run "projects" to list valid project numbers.` }
  }

  if (!command) return { kind: 'text', text: 'Type a command, or run "help" to see what is available.' }
  return { kind: 'text', text: `Command not found: ${command}. Run "help" for available commands.` }
}

export default function TerminalPanel({ projects, onClose, onOpenProject }) {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState([])
  const [showWelcome, setShowWelcome] = useState(true)
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
    const closeOnEscape = event => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [history])

  const submitCommand = event => {
    event.preventDefault()
    const input = command.trim()
    if (!input) return

    const response = resolveCommand(input, projects)
    if (response.kind === 'clear') {
      setHistory([])
      setShowWelcome(false)
      setCommand('')
      return
    }

    setHistory(previous => [...previous, { id: `${Date.now()}-${previous.length}`, input, response }])
    setCommand('')

    if (response.kind === 'open') onOpenProject(response.project)
  }

  return (
    <motion.aside
      className="terminal-panel"
      id="orbit-terminal"
      role="dialog"
      aria-modal="false"
      aria-labelledby="terminal-title"
      initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: 'easeOut' }}
    >
      <div className="terminal-panel__topbar">
        <div><i aria-hidden="true" /><span>INTERACTIVE SHELL</span></div>
        <button type="button" aria-label="Close terminal" onClick={onClose}><X size={16} aria-hidden="true" /></button>
      </div>
      <div className="terminal-panel__heading">
        <span className="micro-label">LOCAL / PORTFOLIO SYSTEM</span>
        <h2 id="terminal-title">Developer terminal</h2>
        <p>Commands are optional. Type <code>help</code>, then press Enter.</p>
      </div>

      <div className="terminal-output" ref={outputRef} role="log" aria-label="Terminal output" aria-live="polite" aria-relevant="additions removals">
        {showWelcome && <p className="terminal-welcome"><span>ORBIT/OS</span> session ready. No external service required.</p>}
        {history.map(entry => (
          <div className="terminal-entry" key={entry.id}>
            <p className="terminal-entry__command"><span>akshat@orbit:~$</span> {entry.input}</p>
            <div className="terminal-entry__response">
              {entry.response.kind === 'open'
                ? <p>Opening project {entry.response.project.number}: {entry.response.project.title}</p>
                : <TerminalOutput response={entry.response} projects={projects} onOpenProject={onOpenProject} />}
            </div>
          </div>
        ))}
      </div>

      <form className="terminal-form" onSubmit={submitCommand}>
        <label className="sr-only" htmlFor="orbit-command">Enter a terminal command</label>
        <span aria-hidden="true">akshat@orbit:~$</span>
        <input
          id="orbit-command"
          ref={inputRef}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck="false"
          value={command}
          onChange={event => setCommand(event.target.value)}
          placeholder="help"
        />
        <button type="submit" aria-label="Run command">↵</button>
      </form>
    </motion.aside>
  )
}
