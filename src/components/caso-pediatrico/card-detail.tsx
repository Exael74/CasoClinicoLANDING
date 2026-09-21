import { useState, type ReactNode } from "react"
import { ExternalLink, QrCode, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cardTitulo, TAG_BY_TIPO, type CaseCard } from "@/data/caso-pediatrico"
import { highlightCifCodes, renderBold } from "@/lib/case-text"

function CardHeader({ card }: { card: CaseCard }) {
  return (
    <div className="mb-6">
      <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/70 uppercase">
        {TAG_BY_TIPO[card.tipo]}
      </span>
      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
        {cardTitulo(card)}
      </h2>
    </div>
  )
}

/** A clearly-labeled aside for general, verifiable medical/educational
 * background — never patient-specific facts that aren't already in the case. */
function InfoNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-rose-300 uppercase">
        Contexto clínico general
      </span>
      <p className="text-sm leading-relaxed text-white/70 sm:text-base">
        {children}
      </p>
    </div>
  )
}

export function CaseCardDetail({ card }: { card: CaseCard }) {
  const [zoomSrc, setZoomSrc] = useState<string | null>(null)

  switch (card.tipo) {
    case "portada":
      return (
        <div>
          <CardHeader card={card} />
          <p className="text-base leading-relaxed text-white/70 sm:text-lg">
            Caso clínico pediátrico de fractura supracondílea de húmero
            izquierdo, presentado por estudiantes de la Universidad del
            Rosario. Los datos del paciente están anonimizados: no se incluye
            nombre ni número de documento.
          </p>
          <p className="mt-3 text-sm text-white/40 sm:text-base">
            Usa las flechas o los puntos de navegación para recorrer las 13
            cartas del caso.
          </p>
        </div>
      )

    case "tabla":
      return (
        <div>
          <CardHeader card={card} />
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-base sm:text-lg">
              <tbody>
                {card.filas.map(([campo, valor], i) => (
                  <tr
                    key={campo}
                    className={i % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                  >
                    <td className="px-4 py-3 font-medium text-white/60">
                      {campo}
                    </td>
                    <td className="px-4 py-3 text-white">{valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case "imagen":
      return (
        <div>
          <CardHeader card={card} />
          <p className="mb-3 text-base font-medium text-white/70 sm:text-lg">
            {card.subtitulo}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {card.imagenes.map((img) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setZoomSrc(img.src)}
                className="group overflow-hidden rounded-xl border border-white/10 transition-shadow duration-300 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)] focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-white/40 sm:text-base">
            Toca una imagen para ampliarla. Fuente: pendiente por confirmar.
          </p>

          <InfoNote>
            El codo es la articulación formada por la unión del húmero, el
            radio y el cúbito. En las fracturas supracondíleas de tipo
            extensión —como la de este caso— las estructuras en mayor riesgo
            son el nervio mediano (en particular su rama interósea anterior),
            el nervio radial y la arteria braquial, por su cercanía anatómica
            al foco de fractura. Por eso la valoración neurovascular es parte
            esencial del examen físico inicial en este tipo de lesiones.
          </InfoNote>

          {zoomSrc ? (
            <div
              className="animate-in fade-in fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 duration-300"
              onClick={() => setZoomSrc(null)}
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-white/80 transition-colors duration-200 hover:text-white"
                onClick={() => setZoomSrc(null)}
                aria-label="Cerrar"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={zoomSrc}
                alt=""
                className="animate-in zoom-in-95 max-h-full max-w-full rounded-lg object-contain duration-300"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ) : null}
        </div>
      )

    case "linea-de-tiempo":
      return (
        <div>
          <CardHeader card={card} />
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
            {card.hitos.map((hito) => (
              <div
                key={hito.fecha}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-base font-bold text-rose-300 sm:text-lg">
                  {hito.fecha}
                </div>
                {hito.subtitulo ? (
                  <div className="mb-1 text-sm font-semibold text-white/60 sm:text-base">
                    {hito.subtitulo}
                  </div>
                ) : null}
                <ul className="mt-1 list-disc space-y-1.5 pl-4 text-sm text-white/70 sm:text-base">
                  {hito.puntos.map((punto) => (
                    <li key={punto}>{punto}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <InfoNote>
            Las fracturas supracondíleas de húmero clasificadas como Gartland
            tipo I (sin desplazamiento significativo) suelen tratarse de forma
            conservadora, con inmovilización durante aproximadamente 3 a 4
            semanas seguida de rehabilitación progresiva — un curso
            consistente con el manejo descrito en este caso.
          </InfoNote>
        </div>
      )

    case "texto-corto":
      return (
        <div>
          <CardHeader card={card} />
          {card.cita ? (
            <div className="py-4 text-center">
              {card.encabezado ? (
                <p className="mb-3 text-base text-white/60 sm:text-lg">
                  {card.encabezado}
                </p>
              ) : null}
              <blockquote className="border-l-4 border-rose-300 pl-5 text-xl font-medium text-white italic sm:text-2xl lg:text-3xl">
                “{card.cita}”
              </blockquote>
            </div>
          ) : (
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              {card.parrafo ? renderBold(card.parrafo) : null}
            </p>
          )}
        </div>
      )

    case "columnas":
      return (
        <div>
          <CardHeader card={card} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {card.columnas.map((col) => (
              <div key={col.titulo}>
                <h3 className="mb-2 text-sm font-bold tracking-wide text-rose-300 uppercase sm:text-base">
                  {col.titulo}
                </h3>
                <ul className="space-y-2 text-sm text-white/70 sm:text-base">
                  {col.items.map((item) => (
                    <li key={item} className="italic">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )

    case "lista-numerada":
      return (
        <div>
          <CardHeader card={card} />
          <ol className="space-y-3">
            {card.items.map((item, i) => (
              <li
                key={item.tituloCorto}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-300/20 text-sm font-bold text-rose-300">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {item.tituloCorto}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-rose-300/40 text-rose-300"
                    >
                      {item.estado}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:text-base">
                    {item.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <InfoNote>
            <strong className="text-white/80">ROM</strong> (range of motion /
            rango de movimiento) es la amplitud de movimiento que alcanza una
            articulación. La <strong className="text-white/80">escala MRC</strong>{" "}
            (Medical Research Council) califica la fuerza muscular de 0 a 5,
            donde 5/5 es fuerza normal contra resistencia y 0/5 es ausencia
            total de contracción visible.
          </InfoNote>
        </div>
      )

    case "texto-largo":
      return (
        <div>
          <CardHeader card={card} />
          {card.destacado ? (
            <div className="mb-4 inline-flex items-center rounded-full bg-rose-300/15 px-4 py-1.5 text-base font-bold text-rose-300 sm:text-lg">
              Recuperación esperada: {card.destacado}
            </div>
          ) : null}
          <div className="max-h-[45vh] space-y-4 overflow-y-auto pr-1 text-base leading-relaxed text-white/70 sm:text-lg">
            {card.parrafos.map((p, i) => (
              <p key={i}>{highlightCifCodes(p)}</p>
            ))}
          </div>
          {card.factores ? (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="mb-1.5 text-sm font-bold text-rose-300 uppercase sm:text-base">
                  Factores facilitadores
                </h4>
                <ul className="list-disc space-y-1.5 pl-4 text-sm text-white/70 sm:text-base">
                  {card.factores.facilitadores.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="mb-1.5 text-sm font-bold text-rose-300 uppercase sm:text-base">
                  Factores barrera
                </h4>
                <ul className="list-disc space-y-1.5 pl-4 text-sm text-white/70 sm:text-base">
                  {card.factores.barrera.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {card.tituloBanda === "Diagnóstico" ? (
            <InfoNote>
              La CIF (Clasificación Internacional del Funcionamiento, de la
              Discapacidad y de la Salud), publicada por la Organización
              Mundial de la Salud, describe el estado de salud de una persona
              en tres componentes: estructuras corporales (código s),
              funciones corporales (código b), y actividad y participación
              (código d), junto con factores contextuales ambientales (e) y
              personales.
            </InfoNote>
          ) : null}

          {card.tituloBanda === "Pronóstico" ? (
            <InfoNote>
              La clasificación de Gartland describe tres tipos de fractura
              supracondílea según su desplazamiento: tipo I (no desplazada o
              mínimamente desplazada), tipo II (desplazada con la cortical
              posterior aún en contacto) y tipo III (completamente
              desplazada). El tipo I —como en este caso— es el que tiene mejor
              pronóstico y habitualmente no requiere manejo quirúrgico. La
              Escala Visual Análoga (EVA) mide de 0 a 10 la intensidad del
              dolor percibida por el paciente.
            </InfoNote>
          ) : null}
        </div>
      )

    case "qr-placeholder":
      return (
        <div>
          <CardHeader card={card} />
          <div className="flex flex-col items-center justify-center gap-5 py-6 text-center">
            {card.qrSrc ? (
              <img
                src={card.qrSrc}
                alt={`Código QR de ${card.etiqueta}`}
                className="h-56 w-56 rounded-xl border border-white/10 bg-white p-3 sm:h-72 sm:w-72"
              />
            ) : (
              <QrCode className="h-14 w-14 text-white/30" />
            )}
            {card.url ? (
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-rose-300/15 px-5 py-2.5 text-base font-semibold text-rose-300 transition-colors hover:bg-rose-300/25"
              >
                Abrir {card.etiqueta} <ExternalLink className="h-5 w-5" />
              </a>
            ) : (
              <p className="text-base text-white/50">
                El código QR de {card.etiqueta} se agregará próximamente.
              </p>
            )}
          </div>
        </div>
      )

    default:
      return null
  }
}
