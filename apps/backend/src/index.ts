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
    origin: "https://blog-platform-web.vercel.app",
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"], // Allow specific headers
    maxAge: 600,
    credentials: true,
  })
)

app.options('*', (c) => {
  c.header('Access-Control-Allow-Origin', 'https://blog-platform-web.vercel.app')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie')
  c.header('Access-Control-Allow-Credentials', 'true')
  return c.text('OK', 200)
})

app.route('api/user', userRounter)
app.route('api/blog', blogRounter)

export default app
