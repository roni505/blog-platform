import { Hono } from 'hono'
import { userRounter } from './routes/user';
import { blogRounter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

// CORS middleware
app.use(
  '*',
  cors({
    origin: '*',
    // allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
    credentials: true,
  })
)

app.route('api/user', userRounter)
app.route('api/blog', blogRounter)

export default app
