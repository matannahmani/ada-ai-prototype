import { Suspense } from "react"
import Link from "next/link"
import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { Skeleton } from "@ui/skeleton"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

import CandidateCard from "./candidate-card"
import CardsContainer from "./cards-container"
import HomeHero from "./home-hero"

const CandidatesCard = async () => {
  const candidates = await api.candidates.list.query()
  const session = await getServerAuthSession()
  return candidates.map((candidate) => (
    <CandidateCard
      userId={session?.user?.id ?? "-1"}
      key={`candidate-${candidate.id}`}
      candidate={candidate}
    />
  ))
}

export default function IndexPage() {
  return (
    <main className="container grid items-center sm:py-2 gap-6 pb-8 pt-6 md:py-10">
      <HomeHero />
      <CardsContainer
        title="Candidates"
        description="Explore the top candidates."
      >
        <Suspense
          fallback={new Array(10).fill(0).map((_, i) => (
            <Skeleton className="h-[337px] w-[350px]" key={`skeleton-${i}`} />
          ))}
        >
          <CandidatesCard />
        </Suspense>
      </CardsContainer>
    </main>
  )
}
