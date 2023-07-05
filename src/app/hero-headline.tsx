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
      stroke="#B0DFFF"
      strokeLinecap="round"
      strokeWidth={5}
      d="M5 18.619c32.314-1.595 36.089-2.61 49.886-5.898 13.797-3.29 42.222-1.188 56.019-4.66 20.445-5.144 27.664 1.097 51.264 0 13.086 0 19.022-.885 19.022 6.421 0 2.61-6.356 5.056-5.936 5.113 8.071 1.108 17.714-.342 25.723-.976 19.002-1.506 38.109-2.988 57.23-3.102 13.596-.082 27.196 0 40.792 0"
    />
    <path
      stroke="#D3EFFF"
      strokeLinecap="round"
      strokeWidth={5}
      d="M3 15.619c32.314-1.595 36.089-2.61 49.886-5.898 13.797-3.29 42.222-1.188 56.019-4.66 20.445-5.144 27.664 1.097 51.264 0 13.086 0 19.022-.885 19.022 6.421 0 2.61-6.356 5.056-5.936 5.113 8.071 1.108 17.714-.342 25.723-.976 19.002-1.505 38.109-2.988 57.23-3.102 13.596-.082 27.196 0 40.792 0"
    />
  </svg>
)
const ForwardRef = forwardRef(HeroHeadLineSvg)
const Memo = memo(ForwardRef)
export default Memo
