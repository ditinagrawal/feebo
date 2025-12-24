import { projectRouter } from "@/modules/dashboard/routers/project";
import { userRouter } from "@/modules/dashboard/routers/user";
import { createTRPCRouter } from "@/server/init";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
