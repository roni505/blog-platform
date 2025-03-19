import { Hono } from 'hono'
import { userRounter } from './routes/user';
import { blogRounter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DEVELOPMENT_URL: string,
    FRONTEND_URL: string,
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

// CORS middleware
app.use(
  '*',
    cors({
      origin: ["https://blog-platform-web.vercel.app", "http://localhost:3000"],
      allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
      allowHeaders: ["Content-Type", "Authorization", "Cookie"],
      maxAge: 600,
      credentials: true,
    })
);

app.route('api/user', userRounter)
app.route('api/blog', blogRounter)

export default app
