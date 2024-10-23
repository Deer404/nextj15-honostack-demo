import { sleep } from "@/app/lib/sleep";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
export const runtime = "edge";

const authorsApp = new Hono()
  .get("/", (c) => c.json({ result: "list authors" }))
  .post("/", (c) => c.json({ result: "create an author" }, 201))
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

const booksApp = new Hono()
  .get("/", async (c) => {
    await sleep(1000);
    return c.json({ result: "list books" });
  })
  .post("/", (c) => c.json({ result: "create a book" }, 201))
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

const helloApp = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({
      message: `Hello! ${name}`,
    });
  }
);

const app = new Hono()
  .basePath("/api")
  .route("/authors", authorsApp)
  .route("/books", booksApp)
  .route("/hello", helloApp);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
