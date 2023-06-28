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
  return (
    <div
      className={cn(
        "flex flex-col gap-4 h-full w-full max-h-96 rounded-lg shadow-md overflow-hidden",
        fullCard ? "sm:flex-row sm:gap-0" : ""
      )}
    >
      <div
        className={cn(
          "h-[200px] w-[280px] relative",
          fullCard ? "h-full w-full max-w-[520px]" : ""
        )}
      >
        <Badge className="absolute top-2 left-2 z-10">Urgent cause</Badge>
        <AspectRatio ratio={280 / 200} className="bg-muted">
          <Image
            fetchPriority="high"
            fill
            className="h-full w-full object-cover"
            src={candidate.image}
            alt={candidate.name}
          />
        </AspectRatio>
      </div>
      <div
        className={cn(
          "flex flex-col gap-4 max-w-[440px]",
          fullCard ? "bg-emerald-100 p-6" : ""
        )}
      >
        <span className="text-lg font-bold">
          {fullCard ? "HELP HOMELESS IN LOS ANGELAS" : candidate.name}
        </span>
        {fullCard && (
          <span className="text-sm">
            By recent estimates, LA's population of people experiencing
            homelessness has surpassed New York City's to become the largest in
            the nation—and it is still growing, with about one in 150 Angelenos,
            or 69,000 people, experiencing homelessness.
          </span>
        )}
        <div className="flex justify-center items-center gap-2">
          <Button variant="outline">View Candidate</Button>
          <Button size="xs" asChild>
            <Link href={`/chat/user/${userId}/candidate/${candidate.id}`}>
              Learn more
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
