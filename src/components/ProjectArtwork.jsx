const studies = {
  evaluation: { label: 'DOCUMENT → FEEDBACK', motif: '01 / EVALUATION' },
  security: { label: 'PASSIVE / AUTHORIZED', motif: '02 / WEBGUARD' },
  fitness: { label: 'PLAN ↔ MOVEMENT', motif: '03 / FITNESS' },
  water: { label: 'REPORT / CONFIRM', motif: '04 / JALWATCH' },
  voice: { label: 'LISTEN → RESPOND', motif: '05 / CURA' },
  sahaaya: { label: 'VOICE / CONCEPT', motif: '06 / SAHAAYA' },
}

function StudyDrawing({ art }) {
  if (art === 'evaluation') {
    return (
      <svg viewBox="0 0 560 380" className="project-art__drawing" aria-hidden="true">
        <path className="drawing-line drawing-line--soft" d="M61 270 260 100 512 182" />
        <g className="drawing-paper drawing-paper--back">
          <rect x="91" y="76" width="235" height="278" rx="3" />
          <path d="M122 126h146M122 148h112M122 190h146M122 212h102M122 254h146M122 276h120" />
        </g>
        <g className="drawing-paper drawing-paper--front">
          <rect x="226" y="42" width="235" height="278" rx="3" />
          <path d="M257 92h146M257 114h112M257 156h146M257 178h102M257 220h146M257 242h120" />
          <circle cx="405" cy="267" r="25" />
          <path d="m394 267 8 8 15-18" />
        </g>
        <circle className="drawing-node" cx="91" cy="76" r="4" />
        <circle className="drawing-node" cx="461" cy="320" r="4" />
      </svg>
    )
  }

  if (art === 'security') {
    return (
      <svg viewBox="0 0 560 380" className="project-art__drawing" aria-hidden="true">
        <path className="drawing-line drawing-line--soft" d="M64 188h432M280 44v292" />
        <path className="drawing-route" d="M88 247 170 180 248 211 325 111 406 151 472 82" />
        <path className="drawing-route drawing-route--secondary" d="M110 96 194 130 280 82 370 223 465 267" />
        <circle className="drawing-node" cx="88" cy="247" r="5" />
        <circle className="drawing-node" cx="170" cy="180" r="5" />
        <circle className="drawing-node" cx="248" cy="211" r="5" />
        <circle className="drawing-node drawing-node--bright" cx="325" cy="111" r="8" />
        <circle className="drawing-node" cx="406" cy="151" r="5" />
        <circle className="drawing-node" cx="472" cy="82" r="5" />
        <circle className="drawing-node" cx="110" cy="96" r="4" />
        <circle className="drawing-node" cx="194" cy="130" r="4" />
        <circle className="drawing-node" cx="370" cy="223" r="4" />
        <circle className="drawing-node" cx="465" cy="267" r="4" />
      </svg>
    )
  }

  if (art === 'fitness') {
    return (
      <svg viewBox="0 0 560 380" className="project-art__drawing" aria-hidden="true">
        <path className="drawing-line drawing-line--soft" d="M58 286h444M101 69v245" />
        <path className="drawing-pulse" d="M59 224h88l26-61 41 112 48-167 47 116 31-45 29 45h132" />
        <path className="drawing-orbit" d="M99 127c72-80 230-94 335-16 90 67 82 172-3 208-105 45-257 12-310-72" />
        <circle className="drawing-node drawing-node--bright" cx="263" cy="108" r="7" />
        <circle className="drawing-node" cx="432" cy="278" r="5" />
        <path className="drawing-mark" d="m390 93 24-21 24 21v34h-48zM402 127v-19h24v19" />
      </svg>
    )
  }

  if (art === 'water') {
    return (
      <svg viewBox="0 0 560 380" className="project-art__drawing" aria-hidden="true">
        <path className="drawing-topo" d="M12 231c49-80 98-119 158-115 75 5 86 112 159 111 77-1 94-121 172-127 36-3 56 14 74 34" />
        <path className="drawing-topo" d="M1 264c59-67 108-92 160-83 67 11 78 95 158 97 89 3 104-103 181-108 25-2 43 5 60 18" />
        <path className="drawing-topo" d="M-4 299c74-54 123-67 170-54 58 16 77 73 154 79 100 8 117-82 190-87 19-2 38 2 57 11" />
        <path className="drawing-topo drawing-topo--soft" d="M44 194c42-49 79-76 119-73 60 5 70 84 141 87 71 3 98-82 158-95" />
        <circle className="drawing-node drawing-node--bright" cx="313" cy="226" r="7" />
        <circle className="drawing-node" cx="313" cy="226" r="20" />
        <path className="drawing-pin" d="M313 211v30M298 226h30" />
      </svg>
    )
  }

  if (art === 'voice') {
    return (
      <svg viewBox="0 0 560 380" className="project-art__drawing" aria-hidden="true">
        <path className="drawing-line drawing-line--soft" d="M42 189h476" />
        <g className="drawing-wave">
          <path d="M65 190h16m8-26v52m12-73v94m12-62v31m12-48v65m12-85v107m12-61v18m12-36v54m12-70v86m12-54v21m12-37v54m12-71v86m12-47v10m12-26v43m12-59v74m12-41v10m12-27v44m12-55v65m12-38v11m12-27v42m12-52v62m12-37v12m12-28v44m12-57v70m12-45v17m12-31v46m12-63v80m12-48v17m12-32v46m12-56v66m12-38v12m12-26v42m12-51v61m12-35v12m12-25v39m12-47v55m12-30v10m12-23v36m12-42v48" />
        </g>
        <path className="drawing-avatar" d="M260 136c0-25 18-44 42-44s42 19 42 44v24c0 37-18 63-42 63s-42-26-42-63zM222 296c8-32 35-51 80-51s72 19 80 51" />
        <circle className="drawing-node drawing-node--bright" cx="342" cy="106" r="6" />
        <circle className="drawing-node" cx="218" cy="296" r="4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 560 380" className="project-art__drawing" aria-hidden="true">
      <path className="drawing-line drawing-line--soft" d="M60 282 202 126l102 91 95-141 101 139" />
      <path className="drawing-bubble" d="M93 100h151a17 17 0 0 1 17 17v56a17 17 0 0 1-17 17h-71l-32 29v-29H93a17 17 0 0 1-17-17v-56a17 17 0 0 1 17-17z" />
      <path className="drawing-bubble drawing-bubble--second" d="M298 178h139a17 17 0 0 1 17 17v49a17 17 0 0 1-17 17h-55l-26 26v-26h-58a17 17 0 0 1-17-17v-49a17 17 0 0 1 17-17z" />
      <path className="drawing-wave" d="M110 144h10m8-12v24m12-34v44m12-30v16m12-23v31m12-16v6m12-26v40m12-30v21m12-15v9m12-23v36" />
      <circle className="drawing-node drawing-node--bright" cx="405" cy="91" r="7" />
      <circle className="drawing-node" cx="202" cy="126" r="5" />
    </svg>
  )
}

export default function ProjectArtwork({ art, number }) {
  const study = studies[art] ?? studies.evaluation

  return (
    <div className={`project-art project-art--${art}`} aria-hidden="true">
      <div className="project-art__topline">
        <span>{number} / FIELD NOTE</span>
        <span>ABSTRACT STUDY</span>
      </div>
      <StudyDrawing art={art} />
      <div className="project-art__caption">
        <span>{study.label}</span>
        <span>{study.motif}</span>
      </div>
    </div>
  )
}
