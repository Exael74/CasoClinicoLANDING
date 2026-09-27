const STROKE = "#6ee7b7"
const LABEL = "rgba(255,255,255,0.75)"

/** Genograma: cuadrados = hombres, círculos = mujeres, doble cuadrado = paciente.
 * La línea punteada agrupa a quienes conviven con el paciente. */
export function FamilyGenogram() {
  return (
    <figure className="mt-6 flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 340 320"
        role="img"
        aria-label="Genograma familiar: el paciente de 10 años vive con su madre, su padre, su hermana y su abuela"
        className="w-full max-w-md"
      >
        {/* Household */}
        <rect
          x="98"
          y="24"
          width="232"
          height="254"
          rx="28"
          fill="rgba(110,231,183,0.06)"
          stroke={STROKE}
          strokeWidth="2"
          strokeDasharray="7 6"
        />

        <g fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round">
          {/* Abuelos: pareja */}
          <line x1="84" y1="62" x2="168" y2="62" />
          <line x1="126" y1="62" x2="126" y2="128" />
          {/* Madre – padre */}
          <line x1="148" y1="150" x2="228" y2="150" />
          <line x1="188" y1="150" x2="188" y2="208" />
          {/* Hijos */}
          <line x1="140" y1="208" x2="240" y2="208" />
          <line x1="140" y1="208" x2="140" y2="230" />
          <line x1="240" y1="208" x2="240" y2="230" />

          {/* Abuelo (fuera del hogar) */}
          <rect x="40" y="40" width="44" height="44" />
          {/* Abuela */}
          <circle cx="190" cy="62" r="22" />
          {/* Madre */}
          <circle cx="126" cy="150" r="22" />
          {/* Padre */}
          <rect x="228" y="128" width="44" height="44" />
          {/* Hermana */}
          <circle cx="140" cy="252" r="22" />
          {/* Paciente */}
          <rect x="218" y="230" width="44" height="44" strokeWidth="3" />
          <rect x="223" y="235" width="34" height="34" strokeWidth="3" />
        </g>

        <text
          x="240"
          y="258"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="#ffffff"
        >
          10
        </text>

        <g fontSize="12" textAnchor="middle" fill={LABEL}>
          <text x="62" y="102">Abuelo</text>
          <text x="190" y="98">Abuela</text>
          <text x="126" y="186">Madre</text>
          <text x="250" y="188">Padre</text>
          <text x="140" y="290">Hermana</text>
          <text x="240" y="292">Paciente</text>
        </g>
      </svg>
      <figcaption className="text-center text-sm text-white/50">
        La línea punteada agrupa a quienes conviven con el paciente.
      </figcaption>
    </figure>
  )
}
