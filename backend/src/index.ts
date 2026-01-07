import "dotenv/config"
import "@/src/utils/env" // load environment variables and match with zod schema defined in env.ts
import { Elysia } from "elysia";
import { sql } from "drizzle-orm";
import { db } from "@/src/database";
import { openapi } from "@elysiajs/openapi";
import { quote } from "@/src/module/quote/controller";
import { logger } from "@/src/utils/logger";

const app = new Elysia()
  .use(openapi())
  // Basic per-request logging
  .onRequest(({ request }) => {
    logger.info(
      {
        method: request.method,
        url: request.url,
      },
      "Incoming request",
    );
  })
  .onError(({ error }) => {
    logger.error(error, "Error");
  })
  .onAfterResponse((response) => {
    logger.info({
      // response,
      status: response.set.status,
    }, "After response");
  })
  .get("/", () => "Hello Elysia")
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

logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
