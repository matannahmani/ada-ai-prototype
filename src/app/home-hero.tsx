import Link from "next/link"
import { cn } from "@lib/utils"
import { buttonVariants } from "@ui/button"

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
  <section className="bg-muted py-6">
    <div className="sm:container justify-center md:justify-start flex-wrap flex gap-6 pb-8 pt-6 md:py-10 ">
      <div className="basis-12/12 md:basis-4/12 items-center text-center justify-center flex max-w-[980px] flex-col sm:text-start sm:items-start gap-8">
        <div>
          <h1 className="font-extrabold leading-tight tracking-tighter text-4xl sm:text-5xl">
            The future of
            <br />
            fundraising.
          </h1>
          <HeroHeadLine width={260} className="-mt-2" />
        </div>
        <p className="max-w-[700px] text-lg">
          Welcome to Ada. Solving clarity problems, hidden agendas and much more
          when it comes to donations.
        </p>

        <div className="sm:hidden w-full px-2">
          <Browser>
            <HomeHeroTypewriter />
          </Browser>
        </div>
        <Link
          href={"#candidate-container"}
          rel="noreferrer"
          className={cn(
            buttonVariants({
              variant: "success",
            }),
            "self-center sm:self-start shadow-md font-bold "
          )}
        >
          View active fundraisers
        </Link>
      </div>
      <div className="hidden md:flex justify-center basis-full md:basis-7/12 ">
        <Browser>
          <HomeHeroTypewriter />
        </Browser>
      </div>
    </div>
  </section>
)

export default HomeHero
