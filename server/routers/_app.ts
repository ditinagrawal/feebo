import { createTRPCRouter } from "@/server/init";

export const appRouter = createTRPCRouter({});

export type AppRouter = typeof appRouter;
