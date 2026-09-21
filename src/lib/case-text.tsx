import type { ReactNode } from "react"

const CIF_CODES = [
  "s73001",
  "s7300",
  "s730",
  "b710",
  "b730",
  "b755",
  "b280",
  "d410-d429",
  "d430-d449",
  "d210",
  "d220",
  "d540",
  "d920",
]
const CIF_PATTERN = new RegExp(`(${CIF_CODES.map(escapeRegExp).join("|")})`, "g")

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")
}

/** Renders **bold** markdown-style segments as <strong>. */
export function renderBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) => {
    const match = /^\*\*([^*]+)\*\*$/.exec(chunk)
    return match ? <strong key={i}>{match[1]}</strong> : chunk
  })
}

/** Wraps CIF codes (s730, b710, d210, …) in a highlighted <strong>. */
export function highlightCifCodes(text: string): ReactNode[] {
  return text.split(CIF_PATTERN).map((chunk, i) =>
    CIF_CODES.includes(chunk) ? (
      <strong key={i} className="text-rose-300">
        {chunk}
      </strong>
    ) : (
      chunk
    )
  )
}
