import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import slugify from "slugify";

import { env } from "@/env";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const firstName = String(user.name).split(" ")[0];
          const slug = slugify(firstName, { lower: true });
          await db.user.update({
            data: {
              slug,
            },
            where: {
              id: user.id,
            },
          });
        },
      },
    },
  },
});
