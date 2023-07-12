"use client"

import React from "react"
import {
  Hydrate as HydrationBoundary,
  type HydrateProps,
} from "@tanstack/react-query"

function Hydrate(props: HydrateProps) {
  return <HydrationBoundary {...props} />
}

export default Hydrate
