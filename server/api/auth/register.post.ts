import { users, InsertUser } from "@/db/schema";
import { db } from "@/server/sqlite-service";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.password || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const existingUser = db
      .select()
      .from(users)
      .where(eq(body.email, users.email))
      .get();

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "User with the same email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser: InsertUser = {
      ...body,
      password: hashedPassword,
    };

    const result = db.insert(users).values(newUser).run();

    return { message: "User registered successfully", newUser: result };
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Server error",
    });
  }
});
