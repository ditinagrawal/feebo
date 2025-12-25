import { projectRouter } from "@/modules/dashboard/routers/project";
import { reviewRouter } from "@/modules/dashboard/routers/review";
import { userRouter } from "@/modules/dashboard/routers/user";
import { createTRPCRouter } from "@/server/init";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  user: userRouter,
  review: reviewRouter,
});

export type AppRouter = typeof appRouter;
