import { projectRouter } from "@/modules/dashboard/routers/project";
import { createTRPCRouter } from "@/server/init";

export const appRouter = createTRPCRouter({
  project: projectRouter,
});

export type AppRouter = typeof appRouter;
