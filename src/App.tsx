import { useState } from "react"
import { IntroTransition } from "@/components/intro-transition"
import { CasoPediatricoCarousel } from "@/components/caso-pediatrico-carousel"
import { StarfieldBackground } from "@/components/starfield-background"

const TEAM_MEMBERS = [
  "Aaron Esteban Cabrera Cabrera",
  "Angie Lorena Noy Delgado",
  "Sara Gabriela Diaz Suarez",
  "Laura Daniela Niño Nuñez",
  "Valentina Hernandez Ramirez",
  "Tatiana Pelaez Hernandez",
  "Francy Julieth Antonio Sanchez",
]

function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && (
        <IntroTransition
          names={TEAM_MEMBERS}
          onFinish={() => setShowIntro(false)}
        />
      )}

      <main className="dark relative flex min-h-svh w-full items-center justify-center overflow-x-hidden bg-black px-4 py-10">
        <StarfieldBackground />
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <CasoPediatricoCarousel />
        </div>
      </main>
    </>
  )
}

export default App
