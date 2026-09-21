import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselItem {
  id: string
  title: string
  description: string
  tag?: string
}

export interface CircularCarouselProps<T extends CarouselItem> {
  items: T[]
  activeIndex?: number
  onActiveChange?: (index: number) => void
  /** Called when the already-centered (active) card is clicked again. */
  onActiveSelect?: (item: T) => void
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string

  /** How many cards are visible along the arc */
  visibleCount?: number
  /** Arc radius (px) */
  radiusX?: number
  radiusY?: number
  /** Card sizing (px) */
  cardWidth?: number
  cardHeight?: number
  /** Height of the arc stage (px) */
  stageHeight?: number
}

function getItemPosition(
  index: number,
  activeIndex: number,
  total: number,
  visibleCount: number,
  radiusX: number,
  radiusY: number
) {
  const offset = index - activeIndex
  const half = Math.floor(visibleCount / 2)
  let adjustedOffset = offset

  if (offset > half) adjustedOffset = offset - total
  if (offset < -half) adjustedOffset = offset + total

  if (Math.abs(adjustedOffset) > half * 2) return null

  const angle = (adjustedOffset / visibleCount) * Math.PI
  const x = Math.sin(angle) * radiusX
  const y = -Math.cos(angle) * radiusY

  const distance = Math.abs(adjustedOffset)
  const maxDistance = half + 1
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3)
  const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7)
  const zIndex = visibleCount - distance

  return { x, y, scale, opacity, zIndex, adjustedOffset }
}

export function CircularCarousel<T extends CarouselItem>({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  onActiveSelect,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
  visibleCount = 5,
  radiusX = 220,
  radiusY = 100,
  cardWidth = 192,
  cardHeight = 128,
  stageHeight = 280,
}: CircularCarouselProps<T>) {
  const [internalIndex, setInternalIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const activeIndex = controlledIndex ?? internalIndex
  const total = items.length

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex)
      }
      onActiveChange?.(newIndex)
    },
    [total, controlledIndex, onActiveChange]
  )

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return
    intervalRef.current = setInterval(next, autoPlayInterval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    const el = containerRef.current
    el?.addEventListener("keydown", handler)
    return () => el?.removeEventListener("keydown", handler)
  }, [next, prev])

  if (!total) return null
  const activeItem = items[activeIndex]!

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Carrusel circular"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-8 outline-none",
        className
      )}
    >
      {/* Circular track */}
      <div
        className="relative w-full max-w-lg"
        style={{ height: stageHeight }}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(
              i,
              activeIndex,
              total,
              visibleCount,
              radiusX,
              radiusY
            )
            if (!pos) return null

            const isActive = i === activeIndex

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  if (isActive) onActiveSelect?.(item)
                  else goTo(i)
                }}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 p-2.5 backdrop-blur-sm transition-shadow duration-300 sm:p-4",
                  isActive
                    ? "shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)]"
                    : "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.4)]"
                )}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transformOrigin: "center center",
                }}
              >
                {item.tag && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wider text-white/70 uppercase sm:px-3.5 sm:py-1.5 sm:text-sm">
                    {item.tag}
                  </span>
                )}
                <div className="w-full">
                  <h3
                    className={cn(
                      "font-semibold leading-tight transition-colors duration-300",
                      isActive
                        ? "text-sm text-white sm:text-3xl"
                        : "text-xs text-white/80 sm:text-xl"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 text-[11px] leading-snug transition-colors duration-300 sm:mt-2 sm:text-lg sm:leading-relaxed",
                      isActive ? "text-white/60" : "text-white/40"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Center content */}
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      >
        <span className="text-3xl font-bold tracking-tight text-white/90 sm:text-8xl">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 text-[11px] text-white/40 sm:text-base">
          de {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-5">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Anterior"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <ChevronLeft className="size-7" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist">
          {items.map((it, i) => (
            <button
              key={it.id}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-10 bg-white/80"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Ir al elemento ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Siguiente"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <ChevronRight className="size-7" />
        </motion.button>
      </div>
    </div>
  )
}

export default CircularCarousel
