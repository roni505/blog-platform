import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signUpValidation } from "@repo/zod-schemas/validation";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie'

export const userRounter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
      COOKIE_SECRET: string,
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
      //chekcing for exisitng users
      const existingUser = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (existingUser) {
        return c.json({
          message: "User already exists"
        }, 400)
      }
      const res = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password
        },
        select: {
          id: true
        }
      })
      const token = await sign({id: res.id}, c.env.JWT_SECRET)
      // cookie
      await setSignedCookie(
        c,
        "auth_cookie",
        token,
        c.env.COOKIE_SECRET,
        {
          path: '/',
          secure: false,
          httpOnly: true,
          sameSite: "None",
          maxAge: 1000
        }
      )
      return c.json({
        message: "Account created successfully"
      });
    } catch (error) {
      console.error("Cannot sign-in users", error);
      return c.json({
        error: "Error creating user"
      }, 400)
    } finally {
      prisma.$disconnect();
    }
  })
  
  userRounter.post('/login', async (c) => {
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
        message: "Please Sign-In first"
      })
    }
    
    const token = await sign({id: res.id}, c.env.JWT_SECRET)
    await setSignedCookie(
      c,
      "auth_cookie",
      token,
      c.env.COOKIE_SECRET,
      {
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: "None",
        maxAge: 60 * 60 * 24 * 7 // 🔄 7 days instead of 1000ms (1 sec)
      }
    )
    return c.json({
      message: "Welcome to the app",
      token
    })
  })