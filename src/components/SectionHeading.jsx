export default function SectionHeading({ number, eyebrow, title, description, titleId }) {
  return (
    <div className="section-heading">
      <p className="eyebrow section-eyebrow">
        <span className="eyebrow-index">{number}</span>
        <span>{eyebrow}</span>
      </p>
      <div className="section-heading__main">
        <h2 id={titleId}>{title}</h2>
        {description && <p className="section-heading__description">{description}</p>}
      </div>
    </div>
  )
}
