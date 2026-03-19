import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

const route = app
	.get("/api", (c) => {
		return c.text("Hello Hono!");
	})
	.get("/api/books", (c) => {
		return c.json([
			{
				title: "Essencialismo",
				numberOfPages: 240,
			},
			{
				title: "1984",
				numberOfPages: 240,
			},
			{
				title: "O Obstaculo é o Caminho",
				numberOfPages: 190,
			},
		]);
	});

app.use("/*", serveStatic({ root: "./web/dist" }));

export type AppType = typeof route;

export default {
	port: 3000,
	fetch: app.fetch,
};
