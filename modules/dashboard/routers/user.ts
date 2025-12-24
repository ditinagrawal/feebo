import { createTRPCRouter, protectedProcedure } from "@/server/init";
import { TRPCError } from "@trpc/server";
import slugify from "slugify";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  // Get the current user
  getUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),

  // Update the user's username
  updateUsername: protectedProcedure.input(z.object({ username: z.string() })).mutation(async ({ ctx, input }) => {
    if (!ctx.session?.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const slug = slugify(input.username, { lower: true });
    const isUsernameExist = await ctx.db.user.findFirst({
      where: { slug, id: { not: ctx.session.user.id } },
    });
    if (isUsernameExist) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Username already taken" });
    }
    return ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: { slug },
    });
  }),

  // Delete the user's account
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session?.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.db.user.delete({
      where: { id: ctx.session.user.id },
    });
  }),
});
