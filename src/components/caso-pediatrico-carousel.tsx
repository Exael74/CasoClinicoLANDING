import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  CircularCarousel,
  type CarouselItem,
} from "@/components/ui/circular-carousel"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CaseCardDetail } from "@/components/caso-pediatrico/card-detail"
import {
  CASE_CARDS,
  cardTitulo,
  TAG_BY_TIPO,
  type CaseCard,
} from "@/data/caso-pediatrico"
import { useMediaQuery } from "@/hooks/use-media-query"

type CaseCarouselItem = CarouselItem & { card: CaseCard }

const ITEMS: CaseCarouselItem[] = CASE_CARDS.map((card) => ({
  id: String(card.id),
  title: cardTitulo(card),
  description: card.resumen,
  tag: TAG_BY_TIPO[card.tipo],
  icon: card.icon,
  card,
}))

export function CasoPediatricoCarousel() {
  const [openId, setOpenId] = useState<number | null>(null)
  // Tracks whether the currently-open dialog pushed a history entry, so the
  // phone/trackpad "back" gesture closes the card instead of leaving the site.
  const pushedHistory = useRef(false)

  useEffect(() => {
    const onPopState = () => {
      pushedHistory.current = false
      setOpenId(null)
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const openCardById = useCallback((id: number) => {
    window.history.pushState({ casoPediatricoCard: id }, "")
    pushedHistory.current = true
    setOpenId(id)
  }, [])

  const closeCard = useCallback(() => {
    if (pushedHistory.current) {
      pushedHistory.current = false
      window.history.back()
    }
    setOpenId(null)
  }, [])

  const isLg = useMediaQuery("(min-width: 1024px)")
  const isSm = useMediaQuery("(min-width: 640px)")

  // Sized for a classroom projector: large cards and a wide arc.
  // Card heights include headroom for the bigger centered icon plus a
  // 2-line title and 2-line description on the longest card content.
  const sizing = isLg
    ? {
        radiusX: 680,
        radiusY: 300,
        cardWidth: 440,
        cardHeight: 340,
        stageHeight: 900,
      }
    : isSm
      ? {
          radiusX: 420,
          radiusY: 210,
          cardWidth: 300,
          cardHeight: 260,
          stageHeight: 660,
        }
      : {
          // Fewer cards on screen at once on mobile, pushed further from the
          // center counter, so nothing overlaps or feels crowded.
          visibleCount: 3,
          radiusX: 175,
          radiusY: 150,
          cardWidth: 200,
          cardHeight: 190,
          stageHeight: 500,
        }

  const openCard = useMemo(
    () => CASE_CARDS.find((c) => c.id === openId) ?? null,
    [openId]
  )

  return (
    <div className="w-full">
      <CircularCarousel
        items={ITEMS}
        autoPlay={false}
        className="max-w-none"
        {...sizing}
        onActiveSelect={(item) => openCardById(item.card.id)}
      />

      <Dialog
        open={openCard !== null}
        onOpenChange={(open) => {
          if (!open) closeCard()
        }}
      >
        <DialogContent
          className="dark max-h-[94vh] w-full max-w-[95vw] overflow-y-auto border border-sky-200/15 bg-gradient-to-b from-[#16336b]/95 to-[#0a1a3d]/95 p-6 text-white ring-0 backdrop-blur-md duration-300 sm:p-8 lg:max-w-[1400px] lg:p-10"
        >
          {openCard ? (
            <>
              <DialogTitle className="sr-only">
                {cardTitulo(openCard)}
              </DialogTitle>
              <CaseCardDetail card={openCard} />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
