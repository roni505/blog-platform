import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { idSchema, createBlog, updateBlog } from "@repo/zod-schemas/validation";

type JwtPayload = {
    id: string;
  };

export const blogRounter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        UserID: string
    }
}>()

blogRounter.use('/*', async(c, next) => {
  if (c.req.path == '/api/blog/all-blogs') {
      return next();
  }

  try {
    const token = c.req.header("Authorization") || "";
    if (!token) {
      return c.json({ message: "Authorization token missing" }, 401);
  }
    const res =  await verify(token, c.env.JWT_SECRET) as JwtPayload; //making sure res is a string type

  if (!res.id) {
      return c.json({ message: "ID is missing in JWT", res }, 403);
  }

  c.set("UserID", res.id);
  console.log("Extracted UserID:", res.id);
    await next();
  } catch (error) {
    c.json({
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
      console.log(validate.success);
      return c.json({
        message: "User Input is incorrect"
      })
    }
    const userID = c.get("UserID")
    const {title, content} = validate.data;
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author_id: userID
      }, select: {
        title: true,
        content: true,
        author_id: true,
        createdAt: true,
        author: {
          select: {
            name: true
          }
        }
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
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
    if (blog) {
      return c.json({
        message: "Blog is found",
        post: blog
      })
    } else {
      return c.json({
        message: "Cannot find blog"
      }, 400)
    }
  } catch (error) {
    console.error("Cannot find blog", error);
    return c.json({
      message: "Cannot find post"
    })
  }
})

// route to delete post
blogRounter.delete('/delete', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const body = c.req.query("id");
    const validation = idSchema.safeParse(body);
    console.log(validation, validation.error);
    
    if (!validation.success) {
      return c.json({
        message: "ID is incorrect"
      })
    }
    const { id } = validation.data;
    const deleteBlog = await prisma.post.delete({
      where: {
        id: id
      }, select: {
        title: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })    
    return c.json({
      message: "Post has been delete",
      deleteBlog
    })
  } catch (error) {
    console.error("Cannot delete post", error);
    return c.json({
      message: "Post already deleted"
    }, 404)
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
        content: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
    return c.json({
      message: "This are all the blogs",
      blogs: allBlogs,
    })
  } catch (error) {
    console.error("Cannot find blog", error);
    return c.json({
      message: "Cannot find"
    })
  }
})



