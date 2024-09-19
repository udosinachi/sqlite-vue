import { users } from "../../db/schema";
import { db } from "../sqlite-service";

export default defineEventHandler(async () => {
  try {
    const userRes = db.select().from(users).all();
    return { users: userRes };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
