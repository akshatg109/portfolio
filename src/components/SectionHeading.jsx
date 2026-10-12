export default function SectionHeading({ number, eyebrow, title, description, titleId, aside }) {
  return (
    <div className="section-heading">
      <p className="eyebrow section-eyebrow">
        <span className="eyebrow-index">
          <span aria-hidden="true">[</span>{number}<span aria-hidden="true">]</span>
        </span>
        <span className="section-eyebrow__separator" aria-hidden="true">//</span>
        <span>{eyebrow}</span>
      </p>
      <div className="section-heading__main">
        <h2 id={titleId}>{title}</h2>
        {description && <p className="section-heading__description">{description}</p>}
        {aside && <div className="section-heading__aside">{aside}</div>}
      </div>
    </div>
  )
}
