import * as React from "react"
import { SVGProps } from "react"

const DonateHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M15.726 13.02 12 16H7v-1h4.065a.5.5 0 0 0 .416-.777l-.888-1.332A1.996 1.996 0 0 0 8.93 12H1a1 1 0 0 0-1 1v6a2 2 0 0 0 2 2h9.639a3 3 0 0 0 2.258-1.024L20 13l-1.452-.484a2.997 2.997 0 0 0-2.822.504Zm1.532-5.63c.451-.465.73-1.108.73-1.818s-.279-1.353-.73-1.818A2.447 2.447 0 0 0 15.494 3S14.25 2.997 13 4.286C11.75 2.997 10.506 3 10.506 3a2.45 2.45 0 0 0-1.764.753 2.606 2.606 0 0 0-.73 1.818c0 .71.279 1.354.73 1.818L13 12l4.258-4.61Z"
    />
  </svg>
)
export default DonateHeart
