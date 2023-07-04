import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { ChevronRight } from "lucide-react"

import { MissionCard } from "@/components/cards"

import CardsContainer from "./cards-container"
import HomeHero from "./home-hero"
import HomeWhySection from "./home-why-section"

export default function IndexPage() {
  return (
    <main className="flex items-stretch flex-col gap-3 sm:gap-6 md:gap-10 lg:gap-20 ">
      <HomeHero />
      <CardsContainer
        title="Latest fundraisers"
        link={{
          href: "/fundraisers",
          label: (
            <>
              See more <ChevronRight className="w-4 h-4 ml-1" />
            </>
          ),
        }}
      >
        {/* <MissionCard /> */}
        <MissionCard
          data={{
            id: "1",
            title: "HELP HOMELESS IN LOS ANGELAS",
            description:
              "By recent estimates, LA's population of people experiencing homelessness has surpassed New York City's to become the largest in the nation—and it is still growing, with about one in 150 Angelenos, or 69,000 people, experiencing homelessness.",
            image:
              "https://res.cloudinary.com/ddqtnp0ic/image/upload/v1688365834/pexels-sarwer-e-kainat-welfare-3996723_1_1_1_fl3vth.png",
            isUrgent: true,
          }}
        />
        <MissionCard
          data={{
            id: "1",
            title: "HELP HOMELESS IN LOS ANGELAS",
            description:
              "By recent estimates, LA's population of people experiencing homelessness has surpassed New York City's to become the largest in the nation—and it is still growing, with about one in 150 Angelenos, or 69,000 people, experiencing homelessness.",
            image:
              "https://res.cloudinary.com/ddqtnp0ic/image/upload/v1688365834/pexels-sarwer-e-kainat-welfare-3996723_1_1_1_fl3vth.png",
            isUrgent: true,
          }}
          isMobile
        />
        <MissionCard
          data={{
            id: "1",
            title: "HELP HOMELESS IN LOS ANGELAS",
            description:
              "By recent estimates, LA's population of people experiencing homelessness has surpassed New York City's to become the largest in the nation—and it is still growing, with about one in 150 Angelenos, or 69,000 people, experiencing homelessness.",
            image:
              "https://res.cloudinary.com/ddqtnp0ic/image/upload/v1688365834/pexels-sarwer-e-kainat-welfare-3996723_1_1_1_fl3vth.png",
            isUrgent: true,
          }}
          isMobile
        />
        <MissionCard
          data={{
            id: "1",
            title: "HELP HOMELESS IN LOS ANGELAS",
            description:
              "By recent estimates, LA's population of people experiencing homelessness has surpassed New York City's to become the largest in the nation—and it is still growing, with about one in 150 Angelenos, or 69,000 people, experiencing homelessness.",
            image:
              "https://res.cloudinary.com/ddqtnp0ic/image/upload/v1688365834/pexels-sarwer-e-kainat-welfare-3996723_1_1_1_fl3vth.png",
            isUrgent: true,
          }}
          isMobile
        />
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
