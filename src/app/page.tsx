import { Suspense } from "react"
import Link from "next/link"
import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { Skeleton } from "@ui/skeleton"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { MissionCard } from "@/components/cards"

import CandidateCard from "./candidate-card"
import CardsContainer from "./cards-container"
import HomeHero from "./home-hero"
import HomeWhySection from "./home-why-section"

const CandidatesCard = async () => {
  const candidates = await api.candidates.list.query()
  const session = await getServerAuthSession()
  return candidates.map((candidate, index) => (
    <CandidateCard
      fullCard={index === 0}
      userId={session?.user?.id ?? "-1"}
      key={`candidate-${candidate.id}`}
      candidate={candidate}
    />
  ))
}

export default function IndexPage() {
  return (
    <main className="flex items-stretch flex-col gap-3 sm:gap-6">
      <HomeHero />
      <CardsContainer
        title="Latest fundraisers"
        link={{
          href: "/fundraisers",
          label: "see more",
        }}
      >
        {/* <MissionCard /> */}
        <MissionCard />
        <MissionCard isMobile />
        <MissionCard isMobile />
        <MissionCard isMobile />
        {/* <Suspense
          fallback={new Array(10).fill(0).map((_, i) => (
            <Skeleton className="h-[337px] w-[350px]" key={`skeleton-${i}`} />
          ))}
        >
          <CandidatesCard />
        </Suspense> */}
      </CardsContainer>
      <HomeWhySection />
    </main>
  )
}
