"use server";

import axios from "axios";
import { loginValidation } from "@repo/zod-schemas/validation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const handleLogin = async (formData: FormData) => {
    console.log("Button clicked");

    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    const result = loginValidation.safeParse({ email, password });
    if (!result.success) {
        console.log("Zod validation error", result.error);
        return { success: false, error: "Invalid input" };
    }

    try {
        const res = await axios.post(`${apiUrl}/api/user/login`, {
            email,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status === 200 && res.data.success) {
            return { success: true, token: res.data.jwt };
        } else {
            return { success: false, error: res.data.message || "Login failed" };
        }
    } catch (error) {
        console.error("Login request failed:", error);
        return { success: false, error: "Server error" };
    }
};
