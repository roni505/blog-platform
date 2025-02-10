import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign, verify } from 'hono/jwt';
import { signUpValidation } from "@repo/zod-schemas/validation";

export const userRounter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>()


  userRounter.post('/sign-in', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try {
      const body = await c.req.json();
      const validation = signUpValidation.safeParse(body);
      if (!validation.success) {
        return c.json({
          message: "Incorrect input"
        })
      }
      const {name, email, password} = validation.data
      const res = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password
        },
        select: {
          id: true
        }
      })
      const token = await sign({id: res.id}, c.env.JWT_SECRET)
      return c.json({
        jwt: token
      });
    } catch (error) {
      console.error("Cannot sign-in users", error);
    } finally {
      prisma.$disconnect();
    }
  })
  
  userRounter.post('/sign-up', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    // find user from data base 
    const body = await c.req.json();
    const res = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      },
      select: {
        id: true
      }
    })
    console.log("User details", res);

    if (!res) {
      return c.json({
        message: "res is empty"
      })
    }
    
    const token = await sign({id: res.id}, c.env.JWT_SECRET)
    
    if (!res) {
      return c.json({
        message: "Please sign up first"
      })
    } else {
      return c.json({
        message: "Welcome to the app",
        jwt: token
      })
    }
  })