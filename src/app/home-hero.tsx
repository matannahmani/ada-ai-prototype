import Image from "next/image"
import Link from "next/link"
import { cn } from "@lib/utils"
import { buttonVariants } from "@ui/button"
import { ChevronRight } from "lucide-react"

import { LogoSymbol } from "@/components/logo-symbol"

import HeroHeadLine from "./hero-headline"
import HomeHeroTypewriter from "./home-hero-typewriter"

const Browser = (props: { children: React.ReactNode | React.ReactNode[] }) => (
  <div className="w-full max-w-[600px] h-[360px] relative bg-slate-50 rounded-md shadow-2xl flex flex-col">
    <div className="flex items-center pt-4">
      {/* dots */}
      <div className="flex gap-1 mr-auto ml-4">
        {/* green */}
        <div className="w-[12px] h-[12px] rounded-full border-2 border-green-500 bg-green-400" />
        {/* yellow */}
        <div className="w-[12px] h-[12px] rounded-full border-2 border-amber-400  bg-amber-300" />
        {/* red */}
        <div className="w-[12px] h-[12px] rounded-full border-2 border-red-500  bg-red-400" />
      </div>
      <div className="w-[240px] p-1.5 gap-1 ml-0 mr-auto text-center justify-center items-center bg-neutral-700 bg-opacity-20 rounded-lg flex">
        <LogoSymbol className="w-4 h-4 " />
        <div className="text-neutral-700 text-[12px] font-normal tracking-wide">
          im-ada.ai
        </div>
      </div>
    </div>
    {/* browser content */}
    <div className="w-full h-full left-0 top-0 absolute flex flex-col items-center justify-center">
      {/* text */}
      {props.children}
    </div>
  </div>
)

const HomeHero = () => (
  <section className="text-white py-6 relative lg:h-[700px]">
    <Image priority src="/hero-bg.png" fill alt="hero-bg" className="-z-10" />
    <div className="sm:container justify-center md:justify-start flex-wrap flex gap-6 pb-8 pt-6 md:py-10 ">
      <div className="basis-12/12 md:basis-4/12 items-center text-center justify-center flex max-w-[980px] flex-col md:text-start md:items-start gap-8">
        <div>
          <h1 className="[text-shadow:1px_1px_6px_black] font-extrabold leading-tight tracking-tighter text-4xl sm:text-5xl">
            The future of
            <br />
            fundraising.
          </h1>
          <HeroHeadLine
            width={150}
            className="-mt-1 block md:hidden drop-shadow-md w-full ml-4 "
          />
          <HeroHeadLine
            width={280}
            className="-mt-0.5 hidden md:block drop-shadow-md w-full md:w-[110%]"
          />
        </div>
        <p className="[text-shadow:1px_1px_6px_black] max-w-[420px] md:max-w-[700px] text-xl">
          Solving clarity problems, hidden agendas and much more when it comes
          to donations.
        </p>

        <div className="md:hidden w-full px-2 text-black">
          <Browser>
            <HomeHeroTypewriter />
          </Browser>
        </div>
        <Link
          href={"#candidate-container"}
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "xl" }),
            "self-center md:self-start shadow-md  font-bold drop-shadow-lg rounded-full "
          )}
        >
          View active fundraisers <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
      <div className="hidden md:flex justify-center basis-full md:basis-6/12 text-black">
        <Browser>
          <HomeHeroTypewriter />
        </Browser>
      </div>
    </div>
  </section>
)

export default HomeHero
