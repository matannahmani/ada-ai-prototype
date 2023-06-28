import * as React from "react"
import { forwardRef, memo, Ref, SVGProps } from "react"

const HeroHeadLineSvg = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={365}
    height={25}
    viewBox="0 0 365 25"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      stroke="#25943B"
      strokeLinecap="round"
      strokeWidth={5}
      d="M2.5 20.327c39.514-2.158 44.129-3.53 61-7.979C80.371 7.9 115.129 10.742 132 6.046c25-6.96 33.827 1.483 62.685 0 16.001 0 23.26-1.198 23.26 8.685 0 3.53-7.773 6.839-7.259 6.917 9.869 1.498 21.661-.463 31.454-1.321 23.235-2.036 46.598-4.042 69.981-4.197 16.624-.11 33.254 0 49.879 0"
    />
  </svg>
)
const ForwardRef = forwardRef(HeroHeadLineSvg)
const Memo = memo(ForwardRef)
export default Memo
