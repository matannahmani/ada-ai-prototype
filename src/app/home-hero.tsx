import Link from "next/link"
import { cn } from "@lib/utils"
import { buttonVariants } from "@ui/button"

import HomeHeroTypewriter from "./home-hero-typewriter"

const HomeHero = () => (
  <section className="justify-center md:justify-start flex-wrap flex gap-6 pb-8 pt-6 md:py-10 ">
    <div className="basis-12/12 md:basis-4/12 items-center text-center justify-center flex max-w-[980px] flex-col sm:text-start sm:items-start gap-8">
      <h1 className="font-extrabold leading-tight tracking-tighter text-5xl">
        The future of
        <br />
        fundraising.
      </h1>
      <p className="max-w-[700px] text-lg">
        Welcome to Ada. Solving clarity problems, hidden agendas and much more
        when it comes to donations.
      </p>
      <div className="sm:hidden w-full">
        <div className="w-full max-w-[540px] h-[280px] sm:h-[360px] relative">
          <div className="w-full max-w-[540px] h-[280px] sm:h-[360px] left-0 top-0 absolute bg-white rounded border border-black" />
          <div className="w-3 h-3 left-[16px] top-[16px] absolute rounded-full border border-black" />
          <div className="w-3 h-3 left-[40px] top-[16px] absolute rounded-full border border-black" />
          <div className="w-3 h-3 left-[64px] top-[16px] absolute rounded-full border border-black" />
          {/* browser content */}
          <div className="w-full h-full left-0 top-0 absolute flex flex-col items-center justify-center">
            {/* text */}
            <HomeHeroTypewriter />
          </div>
        </div>
      </div>
      <Link
        href={"#candidate-container"}
        rel="noreferrer"
        className={cn(buttonVariants(), "self-center sm:self-start")}
      >
        View active fundraisers
      </Link>
    </div>
    <div className="hidden md:flex justify-center basis-full md:basis-7/12 ">
      <div className="w-full max-w-[540px] h-[360px] relative">
        <div className="w-full max-w-[540px] h-[360px] left-0 top-0 absolute bg-white rounded border border-black" />
        <div className="w-3 h-3 left-[16px] top-[16px] absolute rounded-full border border-black" />
        <div className="w-3 h-3 left-[40px] top-[16px] absolute rounded-full border border-black" />
        <div className="w-3 h-3 left-[64px] top-[16px] absolute rounded-full border border-black" />
        {/* browser content */}
        <div className="w-full h-full left-0 top-0 absolute flex flex-col items-center justify-center">
          {/* text */}
          <HomeHeroTypewriter />
        </div>
      </div>
    </div>
  </section>
)

export default HomeHero
