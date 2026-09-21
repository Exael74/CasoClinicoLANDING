import { useMemo, useState } from "react"
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
  card,
}))

export function CasoPediatricoCarousel() {
  const [openId, setOpenId] = useState<number | null>(null)
  const isLg = useMediaQuery("(min-width: 1024px)")
  const isSm = useMediaQuery("(min-width: 640px)")

  // Sized for a classroom projector: large cards and a wide arc.
  const sizing = isLg
    ? {
        radiusX: 680,
        radiusY: 280,
        cardWidth: 440,
        cardHeight: 300,
        stageHeight: 820,
      }
    : isSm
      ? {
          radiusX: 420,
          radiusY: 190,
          cardWidth: 300,
          cardHeight: 220,
          stageHeight: 560,
        }
      : {
          // Fewer cards on screen at once on mobile, pushed further from the
          // center counter, so nothing overlaps or feels crowded.
          visibleCount: 3,
          radiusX: 175,
          radiusY: 140,
          cardWidth: 200,
          cardHeight: 160,
          stageHeight: 460,
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
        onActiveSelect={(item) => setOpenId(item.card.id)}
      />

      <Dialog
        open={openCard !== null}
        onOpenChange={(open) => {
          if (!open) setOpenId(null)
        }}
      >
        <DialogContent
          className="dark max-h-[94vh] w-full max-w-[95vw] overflow-y-auto border border-white/10 bg-gradient-to-b from-zinc-800/95 to-zinc-900/95 p-6 text-white ring-0 backdrop-blur-md duration-300 sm:p-8 lg:max-w-[1400px] lg:p-10"
        >
          {openCard ? (
            <>
              <DialogTitle className="sr-only">
                {cardTitulo(openCard)}
              </DialogTitle>
              <CaseCardDetail
                card={openCard}
                onJumpToReferences={() => setOpenId(13)}
              />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
