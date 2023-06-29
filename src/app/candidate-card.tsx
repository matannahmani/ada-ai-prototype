import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@lib/utils"
import { type Candidate } from "@prisma/client"
import { AspectRatio } from "@ui/aspect-ratio"
import { Badge } from "@ui/badge"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CandidateCardProps = {
  candidate: Candidate
  userId: string
  fullCard?: boolean
}

const CandidateCard = ({ candidate, userId, fullCard }: CandidateCardProps) => {
  return <></>
}

export default CandidateCard
