import { type ReactElement } from "react"
import { HeartHandshake, MessagesSquare, ZoomIn } from "lucide-react"

const WhyItem = ({
  title,
  description,
  icon,
}: {
  title: string
  description: ReactElement
  icon: ReactElement
}) => (
  <div className=" text-center sm:text-start justify-center items-center flex flex-wrap sm:items-start">
    <div className="px-4">{icon}</div>
    <div className="flex-col flex gap-2 content-baseline">
      <span className="text-2xl font-bold text-secondary">{title}</span>
      <p className="text-secondary sm:max-w-[330px] leading-7 ">
        {description}
      </p>
    </div>
  </div>
)

const HomeWhySection = () => {
  return (
    <section className="flex-1 bg-primary-50 py-10 lg:py-20 h-full">
      <main className="sm:container flex-1 justify-center flex flex-wrap items-center">
        <div className="flex-1 basis-full flex justify-center items-center pb-10 lg:pb-20">
          <span className="text-3xl w-fit text-secondary-foreground p-2 font-bold bg-primary">
            Why Ada?
          </span>
        </div>
        <div
          className="
            flex-1
            flex
            flex-wrap
            justify-center
            items-baseline
            gap-4
            lg:gap-10
            px-2 sm:px-0
        "
        >
          <WhyItem
            title="No hidden agendas"
            description={
              <>
                Say hello to full
                <span className="bg-secondary text-white px-1 py-0.5 ml-1">
                  clarity and transparency
                </span>{" "}
                and goodbye to hidden agendas behind allocation of funds.
              </>
            }
            icon={<HeartHandshake className="w-14 h-14 text-secondary" />}
          />
          <WhyItem
            title="Bye lack of clarity"
            description={
              <>
                Want to actually clearly know where donations are allocated to?
                <span className="bg-secondary text-white px-1 py-0.5 ml-1">
                  So do we.
                </span>{" "}
              </>
            }
            icon={<ZoomIn className="w-14 h-14 text-secondary" />}
          />
          <WhyItem
            title="Chat real-time"
            description={
              <>
                Chat real-time with our AI fund managers,{" "}
                <span className="bg-secondary text-white px-1 py-0.5 ml-1">
                  specialised towards each cause.
                </span>{" "}
                No more random person you don’t know allocating your donations.
              </>
            }
            icon={<MessagesSquare className="w-14 h-14 text-secondary" />}
          />
        </div>
      </main>
    </section>
  )
}

export default HomeWhySection
