import * as React from "react"
import { SVGProps } from "react"

const ChevronJacob = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={9}
    fill="none"
    {...props}
  >
    <path fill="#FCFCFC" d="M5.674 9 11.303.75H.045L5.674 9Z" />
  </svg>
)
export default ChevronJacob
