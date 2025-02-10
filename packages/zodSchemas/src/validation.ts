import { z } from "zod";

// zod Schema
export const signUpValidation = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.number().min(6)
})

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.number().min(6)
})

export const createBlog = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlog = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

// type-inference
export type SignUpValidation = z.infer<typeof signUpValidation>
export type LoginValidation = z.infer<typeof loginValidation>
export type UpdateBlog = z.infer<typeof updateBlog>
export type CreateBlog = z.infer<typeof createBlog>