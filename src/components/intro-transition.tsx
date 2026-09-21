import { useEffect, useState } from "react"
import { ShaderAnimation } from "@/components/ui/shader-lines"

interface IntroTransitionProps {
  names: string[]
  perNameMs?: number
  fadeMs?: number
  onFinish?: () => void
}

export function IntroTransition({
  names,
  perNameMs = 1600,
  fadeMs = 800,
  onFinish,
}: IntroTransitionProps) {
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (index < names.length - 1) {
      const timer = setTimeout(() => setIndex((i) => i + 1), perNameMs)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setExiting(true), perNameMs)
    return () => clearTimeout(timer)
  }, [index, names.length, perNameMs])

  useEffect(() => {
    if (!exiting) return
    const timer = setTimeout(() => {
      setVisible(false)
      onFinish?.()
    }, fadeMs)
    return () => clearTimeout(timer)
  }, [exiting, fadeMs, onFinish])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black transition-opacity ease-in-out"
      style={{
        opacity: exiting ? 0 : 1,
        transitionDuration: `${fadeMs}ms`,
      }}
    >
      <ShaderAnimation />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-32 -translate-y-1/2 bg-black/55 backdrop-blur-md sm:h-40 md:h-48" />
      <span
        key={index}
        className="pointer-events-none z-20 max-w-[90vw] px-4 text-center text-xl font-semibold tracking-[0.12em] text-white uppercase [text-shadow:0_2px_16px_rgb(0_0_0_/_90%),0_0_4px_rgb(0_0_0_/_90%)] sm:max-w-[80vw] sm:text-3xl sm:tracking-[0.2em] md:text-5xl md:tracking-[0.3em] lg:text-6xl"
        style={{ animation: `intro-name-fade ${perNameMs}ms ease-in-out` }}
      >
        {names[index]}
      </span>
    </div>
  )
}
