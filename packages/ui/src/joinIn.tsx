"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { loginValidation } from "@repo/zod-schemas/validation";
import Button from "./button";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function JoinIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const loadingToast = toast.loading("Logging in... Please wait.");

        const result = loginValidation.safeParse({ email, password });
        if (!result.success) {
            toast.update(loadingToast, {
                render: "Invalid input!",
                autoClose: 2000,
                type: "error",
                isLoading: false,
            });
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("https://my-app.jyotimukherjeeadra86.workers.dev/api/user/login", { email, password }, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 200 && res.data.success) {
                localStorage.setItem("token", res.data.jwt);
                toast.update(loadingToast, {
                    render: "Login successful!",
                    onClose: () => router.push("/Blogs"),
                    autoClose: 2000,
                    type: "success",
                    isLoading: false,
                });
            } else {
                throw new Error(res.data.message || "Login failed");
            }
        } catch (error) {
            toast.update(loadingToast, {
                render: "Login failed!",
                autoClose: 2000,
                type: "error",
                isLoading: false,
            });
        }
        setLoading(false);
    };

    return (
        <div className="text-white border-[#424242] border rounded-3xl p-7 max-w-md w-full">
            <h2 className="text-3xl w-full text-center mb-8 text-[#ACACAC]">Login</h2>
            <div className="grid gap-2 w-full pb-6">
                <label htmlFor="email" className="text-base">Email</label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    id="email"
                    placeholder="Email" 
                    className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 placeholder:text-sm placeholder:text-[#616161]"
                    autoComplete="off"
                    required
                />
            </div>
            <div className="grid gap-2 w-full">
                <label htmlFor="password">Password</label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    id="password" 
                    placeholder="******"
                    className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 placeholder:text-sm placeholder:text-[#616161]"
                    required
                />
            </div>
            <div className="flex flex-col gap-4 justify-center pt-10">
                <Button
                    text={loading ? "Logging in..." : "Login"}
                    variant="primary"
                    type="button"
                    className="w-full lg:py-3 rounded-xl"
                    onClick={handleLogin}
                    disabled={loading}
                />
                <Button
                    variant="secondary"
                    text="Continue as Guest"
                    type="button"
                    className="text-sm text-[#4B9AEA] w-full"
                    onClick={() => {
                        setEmail("guest@example.com");
                        setPassword("guest1234");
                    }}
                />
            </div>
            <div className="text-sm text-[#9D9D9D] text-center mt-4">
                Don't have an account? &nbsp;
                <Link href="/Login" className="text-[#4B9AEA] hover:text-blue-600">Sign Up</Link>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
}
