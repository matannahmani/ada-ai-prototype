import Link from "next/link"
import { cn } from "@lib/utils"
import { Button, buttonVariants } from "@ui/button"
import { Separator } from "@ui/separator"
import {
  ChevronDown,
  ChevronUp,
  HelpingHand,
  MessagesSquare,
  Share,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import HomeWhySection from "@/app/home-why-section"

const PersonDonationItem = ({
  name,
  amount,
  days,
}: {
  name: string
  amount: number
  days: number
}) => {
  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="w-10 h-10 bg-secondary dark:bg-muted rounded-full" />
        <div className="flex-col flex">
          <span className=" text-secondary dark:text-white font-normal ">
            {name}
          </span>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="text-sm font-bold ">${amount}</span>
            <div className="w-1.5 h-1.5 bg-secondary dark:bg-muted rounded-full" />
            <span className="text-sm  ">{days} days ago</span>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
    </>
  )
}

function OurMissionPage({ params }: { params: { missionId: string } }) {
  return (
    <div>
      <section className="text-accent-foreground flex flex-row justify-center md:gap-4  lg:gap-8">
        <section className="max-w-[420px] lg:max-w-[540px] xl:max-w-[762px] items-center md:m-0 md:items-start container flex flex-col align-baseline w-full min-h-screen gap-2 p-4 py-8">
          <h1
            className="text-accent-foreground
text-[30px]
font-semibold
leading-9"
          >
            HELP HOMELESS IN LOS ANGELAS
          </h1>
          <img
            className="w-[360px] h-[281px] md:hidden rounded-lg"
            src="https://via.placeholder.com/360x281"
          />
          <img
            className="w-[762px] h-[412px] hidden md:block"
            src="https://via.placeholder.com/762x412"
          />
          <div className="md:hidden">
            <span className="text-sm font-normal leading-9">
              <span className="text-xl font-bold leading-9">$18,439 </span>
              raised in 44 days
            </span>
            <br />
            <span>by 1,000 people</span>
          </div>
          <div className="h-[240px] max-w-[360px] md:max-w-full  p-2 flex gap-1 flex-col text-accent-foreground">
            <div className="text-center mx-auto  text-lg font-bold leading-snug">
              OUR AI CAMPAIGN FUND MANAGER’S GOAL
            </div>
            <div className="leading-7 px-2  font-normal line-clamp-6">
              Our goal with this campaign is to give the homeless a chance to
              get off the street and get their life back on track. With the
              money raised, we will give homeless temporary accommodation and a
              chance to find a job and ultimately get off the streets.
            </div>
            <Button variant="secondary" className="m-auto w-fit">
              Read More <ChevronDown />
            </Button>
          </div>
          <div className="flex md:hidden flex-row gap-4 justify-center mt-2">
            <Button>
              <Share className="mr-2" />
              Share
            </Button>
            <Button variant="secondary" className="w-6/12">
              How it works
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <span className=" scroll-m-20 text-2xl font-semibold tracking-tight">
              Updates (1)
            </span>
            <span className=" scroll-m-20 text-xl font-semibold tracking-tight">
              18 Jan 2023
            </span>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              $8,423 has been donated to a total of 4 different non-profit
              organisations. The Red Cross (33%), World Vision (18%), Help
              Homeless (20%) and Save Young Homeless (29%).
              <br />
              <span className=" underline font-bold italic">
                Read more about why.
              </span>
            </p>
            <img
              className="w-[265px] h-[142px] my-2 rounded-[28px] shadow border border-neutral-400"
              src="https://via.placeholder.com/265x142"
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button className="hidden md:inline-flex xl:w-[300px] gap-2">
              Donate <HelpingHand />
            </Button>
            <Button variant="secondary" className="w-full xl:md:w-[300px]">
              Learn about previous donations
            </Button>
          </div>
          <span className="md:hidden text-center sm:hidden scroll-m-20 text-2xl font-semibold tracking-tight">
            Share now to
          </span>
          <div className="md:hidden flex flex-row gap-2 justify-center">
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
          </div>
        </section>
        <section className="hidden mt-[4.7rem] md:flex bg-accent text-accent-foreground rounded-md flex-col h-fit gap-4 w-[300px] shadow sticky top-20 mb-5 right-0 p-2 py-4">
          <small className="text-muted-foreground italic">
            Created by George Clooney
          </small>
          <div className="">
            <span className="text-sm font-normal leading-9">
              <span className="text-xl font-bold leading-9">$18,439 </span>
              raised in 44 days
            </span>
            <br />
            <span>by 1,000 people</span>
          </div>
          <Button className="w-full">
            Donate <HelpingHand className="ml-2" />
          </Button>
          <Link
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            href={`./${params?.missionId}/chat/-1`}
          >
            <MessagesSquare className="mr-2" />
            Chat live now
          </Link>
          <div className="bg-popover  text-popover-foreground rounded-sm relative p-2">
            <ChevronUp className="absolute h-8 w-8 left-4 -top-5 stroke-popover text-popover fill-popover  " />
            <span className="font-normal  text-sm text-start leading-tight">
              Ada is the clarity-first donation platform. Chat real-time with
              the AI allocation manager who actually allocates all donations.
            </span>
          </div>

          <PersonDonationItem name="John Doe" amount={100} days={4} />
          <PersonDonationItem name="John Doe" amount={100} days={4} />
          <PersonDonationItem name="John Doe" amount={100} days={4} />
          <div className="flex flex-row gap-2 mb-1">
            <Button>
              <Share className="mr-2" />
              Share
            </Button>
            <Button variant="secondary" className="flex-1  grow">
              How it works
            </Button>
          </div>
        </section>
      </section>

      <HomeWhySection />
      <div className="md:hidden bottom-0 flex flex-col bg-white p-2 gap-2 sticky z-10">
        <Button
          size="xs"
          variant="secondary"
          className="w-full py-6 rounded-full"
        >
          <MessagesSquare className="mr-2" />
          Chat with our AI Fundraiser Manager Live
        </Button>
        <Button size="xs" className="w-full py-6 rounded-full">
          Donate <HelpingHand className="ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default OurMissionPage
