import "dotenv/config"
import "@/env" // load environment variables and match with zod schema defined in env.ts
import { Elysia } from "elysia";
import { sql } from "drizzle-orm";
import { db } from "@/src/database";
import { openapi } from '@elysiajs/openapi'
import { quote } from "@/src/module/quote/controller";
import { logger } from "@bogeychan/elysia-logger";

const app = new Elysia()
  .use(openapi())
  .get("/", () => "Hello Elysia")
  .use(logger({
    level: "error"
  }))
  .group("/health", (app) => {
    return app
      .get("/", () => {
        return {
          status: "ok"
        }
      }, {
        detail: {
          summary: "Check server health",
          description: "Check server health",
          tags: ["health"],
        }
      })
      .get("/db", async () => {
        await db.execute(sql`select 1`)
        console.log("✅ Database connected successfully")
        return {
          status: "ok"
        }
      }, {
        detail: {
          summary: "Check database connection",
          description: "Check database connection",
          tags: ["health"],
        }
      })
  })
  .use(quote)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
