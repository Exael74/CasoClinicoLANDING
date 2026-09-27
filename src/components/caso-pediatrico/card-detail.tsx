import { useState } from "react"
import { ExternalLink, X } from "lucide-react"
import { cardTitulo, type CaseCard } from "@/data/caso-pediatrico"
import { highlightCifCodes, renderBold } from "@/lib/case-text"
import { FamilyGenogram } from "@/components/caso-pediatrico/family-genogram"
import cronologiaDiagrama from "@/assets/cronologia-diagrama.png"

function CardHeader({ card }: { card: CaseCard }) {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 text-center sm:gap-4">
      <img
        src={card.icon}
        alt=""
        aria-hidden="true"
        className="size-20 shrink-0 rounded-2xl bg-[#f8fbff] object-cover shadow-lg sm:size-28"
      />
      <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
        {cardTitulo(card)}
      </h2>
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
          <section className="mb-6 rounded-xl border border-sky-200/15 bg-white/5 p-5 sm:p-6">
            <h3 className="mb-3 text-lg font-bold text-rose-300 sm:text-xl">
              {card.presentacion.titulo}
            </h3>
            <div className="space-y-3 text-base leading-relaxed text-white/80 sm:text-lg">
              {card.presentacion.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
          <p className="text-base leading-relaxed text-white/70 sm:text-lg">
            Caso clínico pediátrico de fractura supracondílea de húmero
            izquierdo, presentado por estudiantes de la Universidad del
            Rosario. Los datos del paciente están anonimizados: no se incluye
            nombre ni número de documento.
          </p>
          <p className="mt-3 text-sm text-white/40 sm:text-base">
            Usa las flechas o los puntos de navegación para recorrer las 14
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
          <button
            type="button"
            onClick={() => setZoomSrc(cronologiaDiagrama)}
            className="block w-full overflow-hidden rounded-xl border border-white/10 bg-white/95 p-2 transition-shadow duration-300 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)] focus-visible:ring-2 focus-visible:ring-rose-300 sm:p-3"
          >
            <img
              src={cronologiaDiagrama}
              alt="Diagrama de flujo de la cronología de la patología: caída, diagnóstico, inmovilización con férula, retiro de férula e inicio de fisioterapia"
              className="w-full"
            />
          </button>
          <p className="mt-3 text-sm text-white/40 sm:text-base">
            Toca el diagrama para ampliarlo.
          </p>

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
          {card.grafico === "familia" ? <FamilyGenogram /> : null}
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
          <div className="overflow-x-auto rounded-xl border border-sky-200/20">
            <table className="w-full min-w-[640px] border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-sky-400/15 text-white">
                  <th className="w-1/2 border-b border-r border-sky-200/20 px-4 py-3 text-center font-bold tracking-wide uppercase">
                    Set de hipótesis
                  </th>
                  <th className="w-1/2 border-b border-sky-200/20 px-4 py-3 text-center font-bold tracking-wide uppercase">
                    Hipótesis validada
                  </th>
                </tr>
              </thead>
              <tbody>
                {card.items.map((item, i) => (
                  <tr key={item.tituloCorto} className={i % 2 === 0 ? "bg-white/5" : ""}>
                    <td className="border-r border-sky-200/20 px-4 py-3 align-top leading-relaxed text-white/80">
                      <span className="mr-2 font-bold text-rose-300">{i + 1}.</span>
                      {item.texto}
                    </td>
                    <td className="px-4 py-3 align-top leading-relaxed text-white/80">
                      <span className="mr-2 font-bold text-rose-300">{i + 1}.</span>
                      {item.texto}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <div className="space-y-4 text-base leading-relaxed text-white/70 sm:text-lg">
            {card.parrafos.map((p, i) => (
              <p key={i}>{highlightCifCodes(p)}</p>
            ))}
          </div>
        </div>
      )

    case "qr-placeholder":
      return (
        <div>
          <CardHeader card={card} />
          <div className="flex flex-col items-center justify-center gap-6 py-10 text-center sm:py-16">
            {card.url ? (
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-rose-300 px-8 py-6 text-2xl font-bold text-[#0a1a3d] shadow-[0_0_0_6px_rgba(253,164,175,0.25)] transition-all duration-200 hover:scale-[1.03] hover:bg-rose-200 hover:shadow-[0_0_0_10px_rgba(253,164,175,0.3)] focus-visible:ring-4 focus-visible:ring-white/60 sm:w-auto sm:max-w-none sm:px-14 sm:py-8 sm:text-4xl"
              >
                Abrir {card.etiqueta} <ExternalLink className="h-8 w-8 sm:h-11 sm:w-11" />
              </a>
            ) : (
              <p className="text-base text-white/50">
                El enlace de {card.etiqueta} se agregará próximamente.
              </p>
            )}
          </div>
        </div>
      )

    default:
      return null
  }
}
