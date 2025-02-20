import { id } from "date-fns/locale";
import { z } from "zod";

// zod Schema
export const signUpValidation = z.object({
    name: z.string().min(1, { message: "Name is required"}),
    email: z.string().email({message: "Invalid emaill address"}),
    password: z.string().min(6, { message: "Password must be of least 6 characters long"})
})

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createBlog = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updateAt: z.date().optional(),
    author: z.object({
        name: z.string()
    })
});

export const UserIDZod = z.string().uuid("Invalid user ID formate");

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