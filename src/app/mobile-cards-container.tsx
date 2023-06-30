"use client"

import { useEffect, useRef, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

type MobileCardsContainerProps = {
  children: React.ReactNode[]
}

/**
 *  takes in the length of the dots and returns the active dot and a function to set the active dot and clear interval
 * @param dotsLen
 * @returns
 */
const useSwitchTimer = (dotsLen: number) => {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % dotsLen)
    }, 300000)
    intervalRef.current = interval
    return () => clearInterval(interval)
  }, [dotsLen])
  const setActiveAndClearInterval = (index: number) => {
    setActive(index)
    clearInterval(intervalRef.current)
  }
  return [active, setActiveAndClearInterval] as const
}

/**
 * @param props
 * @returns
 */
const MobileCardsContainer = (props: MobileCardsContainerProps) => {
  const dotsLen = props.children.length
  const [animateRef] = useAutoAnimate()
  const [active, setActive] = useSwitchTimer(dotsLen)
  return (
    <div className="sm:hidden flex flex-col justify-center items-center gap-4">
      <div ref={animateRef} className="mx-auto">
        <div key={active}>{props.children[active]}</div>
      </div>
      <div className="flex sm:hidden gap-4  ">
        {new Array(dotsLen).fill(0).map((_, i) => (
          <div
            data-active={active === i}
            key={`dot-${i}`}
            className="w-[25.12px] h-[25.12px] bg-primary-100
            transition-all
            data-[active=true]:bg-primary
            active:bg-primary rounded-full"
          />
        ))}
      </div>
    </div>
  )
}

export default MobileCardsContainer
