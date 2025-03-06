"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "./handel-login";
import Button from "./button";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleToast = async (router: AppRouterInstance, res: boolean) => {
    const loadingToast = toast.loading("Logging in.......Please wait.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (res) {
        toast.update(loadingToast, {
                render: "Login successful!",
                onClose:() => router.push("/blogs"),
                autoClose: 2000,
                type: "success",
                isLoading: false
            })
    } else {
        toast.update(loadingToast, {
                render: "Login failed!",
                autoClose: 2000,
                type: "error",
                isLoading: false
            })
    }
}

export default function JoinIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (formData: FormData) => {
        const result = await handleLogin(formData);
        console.log(result);
        if (result.success) {
            localStorage.setItem("token", result.token);
            const res = result.success;
            handleToast(router, res);
        } else {
            const res = false;
            handleToast(router, res)
        }
    };

    return (
        <div className="text-white border-[#424242] border rounded-3xl p-7 max-w-md w-full">
            <h2 className="text-3xl w-full text-center mb-8 text-[#ACACAC]">
                Login
            </h2>
            <form action={handleFormSubmit}>
                <div className="grid gap-2 w-full pb-6">
                    <label 
                    htmlFor="Email"
                    className="text-base"
                    >
                    Email
                    </label>
                    <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder="Email" 
                    className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 placeholder:text-sm placeholder:text-[#616161]"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                    />
                </div>
                <div className="grid gap-2 w-full">
                    <label 
                    htmlFor="password"
                    >
                    Password
                    </label>
                    <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="******"
                    className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 placeholder:text-sm placeholder:text-[#616161]"
                    required
                    />
                </div>
                <div className="flex flex-col gap-4 justify-center pt-10">
                    <Button
                    text="Login"
                    variant="primary"
                    type="submit"
                    className="w-full lg:py-3 rounded-xl"
                    />
                     <Button
                    variant="secondary"
                    text="Continue as Guest" 
                    type="submit"
                    className="text-sm text-[#4B9AEA] w-full"
                    onClick={() => {
                        setEmail("guest@example.com");
                        setPassword("guest1234");
                    }}
                    />
                </div>
                <div className="text-sm text-[#9D9D9D] text-center mt-4">
                    Don't have an account?  &nbsp;
                    <Link 
                    href="/login"
                    className="text-[#4B9AEA] hover:text-blue-600"
                    >
                    Sign Up
                    </Link>
                </div>
            </form>
            <ToastContainer 
            position="bottom-right"
            />
        </div>
    );
}