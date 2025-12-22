import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { env } from "@/env";
import { PrismaClient } from "@/lib/generated/prisma/client";

const connectionString = `${env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
export const db = new PrismaClient({ adapter });
