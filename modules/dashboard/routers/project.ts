import { TRPCError } from "@trpc/server";
import { generateId } from "better-auth";
import { nanoid } from "nanoid";
import slugify from "slugify";
import z from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/init";

export const projectRouter = createTRPCRouter({
  // Get all projects for the user
  getAllProjects: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.db.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  // Get a single project by id
  getProjectById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    if (!ctx.session?.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.db.project.findUnique({
      where: { id: input.id, userId: ctx.session.user.id },
    });
  }),

  // Create a new project
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const slug = slugify(input.name, { lower: true });
      const isProjectExist = await ctx.db.project.findUnique({
        where: {
          userId: ctx.session.user.id,
          slug,
        },
      });
      if (isProjectExist) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Project Already Exist",
        });
      }
      const key = `DF_${nanoid(32)}`;
      return await ctx.db.project.create({
        data: {
          id: generateId(),
          name: input.name,
          slug,
          key,
          userId: ctx.session.user.id,
        },
      });
    }),
});
