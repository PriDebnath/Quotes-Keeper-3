import { Elysia } from "elysia";
import { quote } from "@/src/module/quote/controller";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(quote)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
