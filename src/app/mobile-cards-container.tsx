"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useSwipeable } from "react-swipeable"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useSwitchTimer(dotsLen)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (active > 0) {
        setActive(active - 1)
      }
    },
    onSwipedRight: () => {
      if (active < dotsLen - 1) {
        setActive(active + 1)
      }
    },
  })

  /**
   * @param e - touch event
   * @description - detectes the direction of the swipe and sets the active dot accordingly
   */
  // const onTouchMoveHandler = useCallback(
  //   (e: React.TouchEvent<HTMLDivElement>) => {
  //     if (!containerRef.current) return
  //     if (e.touches.length > 1 || !e.touches?.[0]) return
  //     const { clientX } = e.touches[0]
  //     const { clientWidth, offsetLeft } = containerRef.current
  //     const swipeDirection =
  //       clientX > clientWidth / 2 + offsetLeft ? "right" : "left"
  //     if (swipeDirection === "right" && active < dotsLen - 1) {
  //       setActive(active + 1)
  //     } else if (swipeDirection === "left" && active > 0) {
  //       setActive(active - 1)
  //     }
  //   },
  //   [active, dotsLen, setActive]
  // )

  return (
    <>
      <div className="sm:hidden flex flex-col justify-center relative items-center gap-4">
        <div {...handlers} className="z-[2] touch-x absolute w-full h-full" />
        <div ref={animateRef} className="mx-auto">
          <div key={active}>{props.children[active]}</div>
        </div>
        <div className="flex sm:hidden gap-4 z-[3]">
          {new Array(dotsLen).fill(0).map((_, i) => (
            <div
              data-active={active === i}
              key={`dot-${i}`}
              onClick={() => setActive(i)}
              className="w-[25.12px] h-[25.12px] bg-muted
            transition-all
            data-[active=true]:bg-secondary
            active:bg-secondary rounded-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default MobileCardsContainer
