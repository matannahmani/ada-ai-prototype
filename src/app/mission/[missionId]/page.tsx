import Link from "next/link"
import { cn } from "@lib/utils"
import { Badge } from "@ui/badge"
import { Button, buttonVariants } from "@ui/button"
import { DonateButton } from "@ui/donate-button"
import { Separator } from "@ui/separator"
import {
  ChevronDown,
  ChevronUp,
  HelpingHand,
  MessagesSquare,
  Share,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import MissionGoalCard from "@/components/cards/mission-goal"
import { ChatIcon, DonateIcon, ShareIcon } from "@/components/icons"
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
        <div className="w-10 h-10 bg-[#D9D9D9] dark:bg-muted rounded-full" />
        <div className="flex-col flex">
          <span className="  text-lg font-normal ">{name}</span>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="text-sm font-bold ">${amount}</span>
            <div className="w-1.5 h-1.5 bg-[#D9D9D9] dark:bg-muted rounded-full" />
            <span className="text-sm  text-[#9B9A9A] ">{days} days ago</span>
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
      <section className="text-[#021444] flex flex-row justify-center md:gap-4  lg:gap-8">
        <section className="max-w-[420px] lg:max-w-[540px] xl:max-w-[762px] items-center md:m-0 md:items-start container flex flex-col align-baseline w-full gap-2 p-4 py-8">
          <h1
            className="
text-2xl
font-semibold
leading-9"
          >
            HELP HOMELESS IN LOS ANGELAS
          </h1>
          <div className="relative">
            <Badge variant="secondary" className="absolute top-4 left-4 z-10">
              Urgent cause
            </Badge>
            <img
              className="w-[360px] h-[281px] md:hidden rounded-lg"
              src="https://via.placeholder.com/360x281"
            />
            <img
              className="w-[762px] h-[412px] hidden md:block"
              src="https://via.placeholder.com/762x412"
            />
          </div>
          <div className="md:hidden mr-auto">
            <span className="text-sm font-normal leading-9">
              <span className="text-xl font-bold leading-9">$18,439 </span>
              raised in 44 days
            </span>
            <br />
            <span>by 1,000 people</span>
          </div>
          <MissionGoalCard description="Our goal with this campaign is to give the homeless a chance to get off the street and get their life back on track. With the money raised, we will give homeless temporary accommodation and a chance to find a job and ultimately get off the streets." />
          <div className="flex w-full md:hidden flex-row gap-4 justify-center mt-2">
            <Button variant="outline" outlineColor="default">
              <ShareIcon className="mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              outlineColor="secondary"
              className="w-6/12"
            >
              How it works
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4 text-[#1C0F30]">
            <span className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
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
          <div className="flex flex-row gap-2 my-2 self-stretch">
            <DonateButton
              size="lg"
              className="hidden md:inline-flex xl:w-[300px] gap-2"
            />
            <Button
              size="lg"
              variant="secondary"
              className="w-full py-6 lg:py-5 xl:md:w-[300px]"
            >
              Learn about previous donations
            </Button>
          </div>
          <span className="md:hidden text-center scroll-m-20 text-lg font-bold tracking-tight">
            Share now to
          </span>
          <div className="md:hidden flex flex-row gap-4 justify-center">
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
          </div>
        </section>
        <section className="hidden mt-[4.7rem] md:flex bg-background text-accent-foreground rounded-md flex-col h-fit gap-4 w-full md:w-[300px] lg:w-[400px] shadow-xl sticky top-20 mb-5 right-0 p-4">
          <small className="text-stone-400 italic">
            Created by George Clooney
          </small>
          <div className="">
            <span className="text-sm font-normal leading-9">
              <span className="text-3xl font-bold leading-9">$18,439 </span>
              raised in 44 days
            </span>
            <br />
            <span>47 donations</span>
          </div>
          <DonateButton size="3xl" className="w-full" />
          <Link
            className={cn(
              buttonVariants({ variant: "secondary", size: "3xl" }),
              "w-full"
            )}
            href={`./${params?.missionId}/chat/-1`}
          >
            <ChatIcon className="mr-4 transform scale-150" />
            Chat live now
          </Link>
          <div className="-mt-1 mb-1 bg-[#EAEAEA] border-[1px] border-[#CCCCCC]  text-popover-foreground rounded-sm relative p-2">
            <ChevronUp className="absolute h-8 w-8 left-4 -top-5 stroke-[#CCCCCC] stroke-[0.5px] text-[#EAEAEA] fill-[#EAEAEA]  " />
            <span className="font-normal  text-sm text-start leading-tight">
              Ada is the clarity-first donation platform. Chat real-time with
              the AI allocation manager who actually allocates all donations.
            </span>
          </div>
          <div className="flex flex-col gap-2 mb-1">
            <PersonDonationItem name="John Doe" amount={100} days={4} />
            <PersonDonationItem name="John Doe" amount={100} days={4} />
            <PersonDonationItem name="John Doe" amount={100} days={4} />
          </div>
          <div className="flex flex-row gap-2 mb-1">
            <Button variant="outline" outlineColor="default">
              <ShareIcon className="mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              outlineColor="secondary"
              className="flex-1  grow"
            >
              How it works
            </Button>
          </div>
        </section>
      </section>

      <HomeWhySection />
      <div className="md:hidden bottom-0 flex flex-col bg-white p-2 gap-2 sticky z-10">
        <Link
          href={`./${params?.missionId}/chat/-1`}
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "xs",
            }),
            "w-full py-6 rounded-full"
          )}
        >
          <ChatIcon className="mr-2" />
          Chat with our AI Fundraiser Manager Live
        </Link>
        <DonateButton size="xs" className="w-full py-6 rounded-full" />
      </div>
    </div>
  )
}

export default OurMissionPage
