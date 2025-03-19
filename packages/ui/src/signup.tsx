'use client'

import axios from "axios";
import { useState } from "react";
import Button from "./button";
import { signUpValidation } from "@repo/zod-schemas/validation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const loadingToast = toast.loading("Signing in... Please wait.")
        try {
            console.log("Submit has been pressed");

            // Zod validation
            const result = signUpValidation.safeParse(formData);
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

            const res = await axios.post(
                "https://my-app.jyotimukherjeeadra86.workers.dev/api/user/sign-in",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.status === 200) {
                localStorage.setItem("token", res.data.jwt);
                toast.update(loadingToast, {
                    render: "Signup successful!",
                    onClose: () => router.push("/Blogs"),
                    autoClose: 2000,
                    type: "success",
                    isLoading: false
                })
            }
            // console.log("API response: ", res);
        } catch (error) {
            console.error("Error:", error);
            toast.update(loadingToast, {
                render: "Signup failed!",
                autoClose: 2000,
                type: "error",
                isLoading: false
            });
        }
        setLoading(false);
    };

    return (
        <div className="text-white border-[#424242] border rounded-3xl p-7 max-w-md w-full mt-5 sm:mt-6 mg:mt-8 lg:mt-8">
            <h2 className="text-3xl w-full text-center mb-8 text-[#ACACAC]">
                Create Account
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2 w-full pb-6">
                    <label htmlFor="name" className="text-base">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 w-full placeholder:text-sm placeholder:text-[#616161]"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid gap-2 w-full pb-6">
                    <label htmlFor="email" className="text-base">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 placeholder:text-sm placeholder:text-[#616161]"
                        autoComplete="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid gap-2 w-full">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="******"
                        className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 placeholder:text-sm placeholder:text-[#616161]"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-center pt-10">
                    <Button
                        text={loading ? "Signing up..." : "SignUp"}
                        variant="primary"
                        type="submit"
                        className="w-full lg:py-3 rounded-xl"
                    />
                </div>
                <div className="text-sm text-[#9D9D9D] text-center mt-4">
                    Already have an account? &nbsp;
                    <Link href="/Login" className="text-[#4B9AEA] hover:text-blue-600">
                        Login
                    </Link>
                </div>
            </form>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default SignUp;
