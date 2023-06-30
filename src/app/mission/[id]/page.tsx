import Link from "next/link"
import { Button, buttonVariants } from "@ui/button"
import { Separator } from "@ui/separator"
import { ChevronDown, HelpingHand, MessagesSquare, Share } from "lucide-react"

import { siteConfig } from "@/config/site"
import HomeWhySection from "@/app/home-why-section"

function OurMissionPage() {
  return (
    <>
      <section className="flex flex-row justify-center gap-8">
        <section className="max-w-[762px] items-center md:m-0 md:items-start container flex flex-col align-baseline w-full min-h-screen gap-2 p-4 py-8">
          <h1
            className="text-slate-900
text-[30px]
font-semibold
leading-9"
          >
            HELP HOMELESS IN LOS ANGELAS
          </h1>
          <img
            className="w-[360px] h-[281px] lg:hidden rounded-lg"
            src="https://via.placeholder.com/360x281"
          />
          <img
            className="w-[762px] h-[412px] hidden lg:block"
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
          <div className="h-[240px] w-[360px] lg:w-fit  p-2 flex gap-1 flex-col text-sky-950 bg-zinc-100 rounded-xl border border-neutral-200">
            <div className="text-center w-[225px] mx-auto  text-lg font-bold leading-snug">
              OUR AI CAMPAIGN FUND MANAGER’S GOAL
            </div>
            <div className="text-[12px] font-normal leading-relaxed line-clamp-6">
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
            <span className="text-slate-900 scroll-m-20 text-2xl font-semibold tracking-tight">
              Updates (1)
            </span>
            <span className="text-slate-900 scroll-m-20 text-xl font-semibold tracking-tight">
              18 Jan 2023
            </span>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              $8,423 has been donated to a total of 4 different non-profit
              organisations. The Red Cross (33%), World Vision (18%), Help
              Homeless (20%) and Save Young Homeless (29%).
              <br />
              <span className="text-slate-900 underline font-bold italic">
                Read more about why.
              </span>
            </p>
            <img
              className="w-[265px] h-[142px] my-2 rounded-[28px] shadow border border-neutral-400"
              src="https://via.placeholder.com/265x142"
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button className="hidden md:inline-flex w-[300px] gap-2">
              Donate <HelpingHand />
            </Button>
            <Button variant="secondary" className="w-full md:w-[300px]">
              Learn about previous donations
            </Button>
          </div>
          <span className="md:hidden text-center sm:hidden text-slate-900 scroll-m-20 text-2xl font-semibold tracking-tight">
            Share now to
          </span>
          <div className="md:hidden flex flex-row gap-2 justify-center">
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            <div className="w-12 h-12 bg-zinc-300 rounded-full" />
          </div>
        </section>
        <section className="hidden md:flex flex-col h-fit gap-4 w-[300px] shadow sticky top-16 right-0">
          <small className="text-muted italic">Created by George Clooney</small>
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
          <Button variant="secondary" className="w-full">
            <MessagesSquare className="mr-2" />
            Chat live now
          </Button>
          <div className="w-[341px] h-[82px] relative">
            <div className="w-[341px] h-[66px] left-0 top-[16px] absolute text-center">
              <span className="text-zinc-600 text-[12px] font-normal leading-tight">
                Ada is the{" "}
              </span>
              <span className="text-zinc-600 text-[12px] font-normal leading-tight">
                clarity-first
              </span>
              <span className="text-zinc-600 text-[12px] font-normal leading-tight">
                {" "}
                donation platform. <br />
                Chat real-time with the AI allocation manager who actually
                allocates{" "}
              </span>
              <span className="text-zinc-600 text-[12px] font-normal leading-tight">
                all{" "}
              </span>
              <span className="text-zinc-600 text-[12px] font-normal leading-tight">
                donations.
              </span>
            </div>
          </div>
        </section>
      </section>

      <HomeWhySection />
    </>
  )
}

export default OurMissionPage
