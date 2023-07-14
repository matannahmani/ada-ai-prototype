import { createTRPCRouter } from "../../trpc"
import missionRouter from "./mission"

const backofficeRouter = createTRPCRouter({
  mission: missionRouter,
})

export default backofficeRouter
