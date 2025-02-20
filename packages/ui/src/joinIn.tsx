"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "./handel-login";
import Button from "./button";

export default function JoinIn() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (formData: FormData) => {
        const result = await handleLogin(formData);
        console.log(result);
        if (result.success) {
            localStorage.setItem("token", result.token); // ✅ Client-side storage
            router.push("/blogs"); // ✅ Redirect from client
        } else {
            setError(result.error);
        }
    };

    return (
        <form action={handleFormSubmit}>
            <div>
                <input type="email" name="email" id="email" placeholder="Email" required />
                <input type="password" name="password" id="password" placeholder="Password" required />
                <Button text="Login" variant="primary" size="lg" />
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </form>
    );
}