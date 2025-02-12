import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign, verify, decode } from 'hono/jwt';
import { createBlog, updateBlog } from "@repo/zod-schemas/validation"
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie'

import { csrf } from "hono/csrf";

type JwtPayload = {
    id: string;
  };


export const blogRounter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
        COOKIE_SECRET: string
    },
    Variables: {
        UserID: string
    }
}>()

blogRounter.use('/*', async(c, next) => {
    if (c.req.path == '/all-blogs') {
        return next();
    }

    try {
      const signedCookie = await getSignedCookie(c, c.env.COOKIE_SECRET)
      
      if (!signedCookie || !signedCookie.auth_cookie) {
        return c.json({
          message: "No authentication token found"
        }, 401);
      } 
      
      const token = signedCookie.auth_cookie;
      const res =  await verify(token, c.env.JWT_SECRET) as JwtPayload; //making sure res is a string type
      
      if (!res.id) {
        return c.json({ message: "ID is missing in JWT", res }, 403);
    }

    c.set("UserID", res.id);
    console.log("Extracted UserID:", res.id);
      await next();
    } catch (error) {
      return c.json({
        message: "Invalid or token expired"
      })
    }
})

// This route is use for creating blogs 
blogRounter.post('/create-blog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const validate = createBlog.safeParse(body);
    if (!validate.success) {
      return c.json({
        message: "User Input is incorrect"
      })
    }

    const {title, content} = validate.data;
    const id = c.get("UserID")
    if (!id) {
        return c.json({
            message: "User id not found"
        }, 403)
    }
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author_id: id
      }
    })
    return c.json({
      message: "Blog added",
      post
    })
  } catch (error) {
    console.error("Error creating blog", error);
    return c.json({
      error: 'Error post cannot be created'
    })
  }
})

// This route is for updating routes
blogRounter.put('/update-blog', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  try {
    const body = await c.req.json();
    const validate = updateBlog.safeParse(body);
    if (!validate.success) {
      return c.json({
        message: "Input is incorrect"
      })
    }
    const {id, title, content} = validate.data;
    const update = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        title: title,
        content: content
      }
    })
    return c.json({
      message: "Updated the blog",
      update
    })
  } catch (error) {
    console.error("Cannot update post", error);
    return c.json({
      message: "Update unsucessfull"
    })
  }
})

// This route is for getting a specific route
blogRounter.get('/givenID/:id', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const param =  c.req.param("id");
    const blog = await prisma.post.findUnique({
      where: {
        id: param
      },
      select: {
        title: true,
        content: true
      }
    })
    return c.json({
      message: "Successfully found the blog",
      post: blog
    })
  } catch (error) {
    console.error("Cannot find blog", error);
    return c.json({
      message: "Cannot find post"
    })
  }
})

// For all the routes
blogRounter.get('/all-blogs', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const allBlogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true
      }
    })
    return c.json({
      message: "This are all the blogs",
      blogs: allBlogs
    })
  } catch (error) {
    console.error("Cannot find blog", error);
    return c.json({
      message: "Cannot find"
    })
  }
})



