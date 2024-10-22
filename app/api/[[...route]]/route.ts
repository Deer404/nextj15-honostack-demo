import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const route = app.get(
  "/hello",
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

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof route;
