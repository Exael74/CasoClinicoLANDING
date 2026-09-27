import { ArrowDown, ArrowRight, Target } from "lucide-react"
import { cn } from "@/lib/utils"

type Hito = { fecha: string; subtitulo?: string; puntos: string[] }

// One accent per milestone, chosen to sit on the navy background.
const LANES = [
  {
    date: "border-sky-300/70 bg-sky-400/20 text-sky-100",
    step: "border-sky-300/30",
    arrow: "text-sky-300/80",
  },
  {
    date: "border-amber-300/70 bg-amber-400/20 text-amber-100",
    step: "border-amber-300/30",
    arrow: "text-amber-300/80",
  },
  {
    date: "border-emerald-300/70 bg-emerald-400/20 text-emerald-100",
    step: "border-emerald-300/30",
    arrow: "text-emerald-300/80",
  },
]

function Connector({ className }: { className: string }) {
  return (
    <>
      <ArrowDown className={cn("size-5 shrink-0 self-center sm:hidden", className)} />
      <ArrowRight
        className={cn("hidden size-5 shrink-0 self-center sm:block", className)}
      />
    </>
  )
}

/** Cronología as a connected flow: date → step → step … per milestone. */
export function TimelineFlow({ hitos }: { hitos: Hito[] }) {
  return (
    <div className="flex flex-col gap-3">
      {hitos.map((hito, laneIndex) => {
        const lane = LANES[laneIndex % LANES.length]!
        return (
          <div key={hito.fecha} className="flex flex-col gap-3">
            {laneIndex > 0 ? (
              <ArrowDown className="size-6 self-center text-white/40" />
            ) : null}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-x-2 sm:gap-y-3">
              <div
                className={cn(
                  "flex min-w-32 flex-col items-center justify-center rounded-xl border-2 px-4 py-3 text-center",
                  lane.date
                )}
              >
                <span className="text-lg font-bold sm:text-xl">
                  {hito.fecha}
                </span>
                {hito.subtitulo ? (
                  <span className="text-sm font-medium opacity-80">
                    {hito.subtitulo}
                  </span>
                ) : null}
              </div>

              {hito.puntos.map((punto) => {
                const esObjetivo = punto.startsWith("Objetivo:")
                return (
                  <div key={punto} className="contents">
                    <Connector className={lane.arrow} />
                    {esObjetivo ? (
                      <div className="flex items-center gap-2 rounded-xl border-2 border-rose-300/70 bg-rose-400/20 px-4 py-3 text-sm font-semibold text-rose-100 sm:text-base">
                        <Target className="size-5 shrink-0" />
                        {punto}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "flex items-center rounded-xl border bg-white/5 px-4 py-3 text-sm text-white/80 sm:text-base",
                          lane.step
                        )}
                      >
                        {punto}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
