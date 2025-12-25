import { baseProcedure, createTRPCRouter } from "@/server/init";
import { TRPCError } from "@trpc/server";
import { generateId } from "better-auth";
import z from "zod";

export const reviewRouter = createTRPCRouter({

    // Get all reviews for a project
    getAllReviews: baseProcedure.input(z.object({
        projectId: z.string(),
    })).query(async ({ ctx, input }) => {
        const isProjectExist = await ctx.db.project.findUnique({
            where: { id: input.projectId },
        });
        if (!isProjectExist) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
        }
        return ctx.db.review.findMany({
            where: { projectId: input.projectId },
            orderBy: {
                createdAt: "desc",
            },
        });
    }),

    // Create a new review
    createReview: baseProcedure.input(z.object({
        projectId: z.string(),
        author: z.string(),
        rating: z.number(),
        comment: z.string(),
    })).mutation(async ({ ctx, input }) => {
        if (input.rating < 1 || input.rating > 5) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "Rating must be between 1 and 5" });
        }
        const isProjectExist = await ctx.db.project.findUnique({
            where: { id: input.projectId },
        });
        if (!isProjectExist) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
        }
        return ctx.db.review.create({
            data: {
                id: generateId(),
                author: input.author,
                rating: input.rating,
                comment: input.comment,
                projectId: input.projectId,
            },
        });
    }),
})