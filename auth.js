import authConfig from "@/auth.config";
import { db } from "@/db/connect";
import User from "@/db/models/user.model";
import NextAuth from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      try {
        await db();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }
        return true;
      } catch (error) {
        console.error("Authentication error:", error);
        return false;
      }
    },
    async session({ session }) {
      if (session.user) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user.id;
          session.user.slug = user.slug;
        }
      }
      return session;
    },
  },
  ...authConfig,
});
