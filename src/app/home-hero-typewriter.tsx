"use client"

import { useEffect, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Typewriter } from "react-simple-typewriter"

const sentences = [
  "hidden agendas",
  "clarity",
  "transparency",
  "accountability",
  "trust",
  "integrity",
]

const useTyperNumber = (max: number) => {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) => (prev + 1) % max)
    }, 2000)
    return () => clearInterval(interval)
  }, [max])

  return number
}

const HomeHeroTypewriter = () => {
  const [ref] = useAutoAnimate()
  const number = useTyperNumber(sentences.length)
  return (
    <span className="text-4xl leading-tight tracking-tighter font-bold text-center w-full h-[140px]">
      Tired of lack of &nbsp;
      <br className="sm:hidden" />
      <span className="font-extrabold [&>*:first-child]:bg-indigo-200">
        <Typewriter
          words={sentences}
          loop={true}
          // cursor
          // cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
          // onLoopDone={handleDone}
          // onType={handleType}
        />
      </span>
      <br />
      in fundraising?
    </span>
  )
}

export default HomeHeroTypewriter
