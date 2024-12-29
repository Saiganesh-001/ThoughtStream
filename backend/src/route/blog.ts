import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

blogRouter.use("/*", async (c, next) => {
	const header = c.req.header("Authorization") || "";

	const token = header?.split(" ")[1];

	try {
		const response = await verify(token, c.env.JWT_SECRET);

		if (response && typeof response.id === "string") {
			c.set("userId", response.id);
			await next();
		} else {
			c.json({
				error: "Not Authorized",
			});
		}
	} catch (e) {
        console.log(e);
        c.status(411);
        return c.json({
            message: "Error while validating token"
        })
    }
});

blogRouter.post("/", async (c) => {
	const body = await c.req.json();
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId,
		},
	});
	return c.json({
		id: post.id,
	});
});

blogRouter.put("/", async (c) => {
	const body = await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const post = await prisma.post.update({
		where: {
			id: body.id,
		},
		data: {
			title: body.title,
			content: body.content,
		},
	});
	return c.json({
		id: post.id,
	});
});

blogRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const posts = await prisma.post.findMany();

	return c.json({
		posts,
	});
});

blogRouter.get("/:id", async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const post = await prisma.post.findFirst({
			where: {
				id,
			},
		});
		return c.json({
			post,
		});
	} catch (e) {
		console.log(e);
		c.status(411);
		return c.json({
			message: "Error while fetching blog post",
		});
	}
});
