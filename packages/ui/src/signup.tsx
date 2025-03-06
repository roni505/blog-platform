import axios from "axios";
import Button from "./button";
import { signUpValidation } from "@repo/zod-schemas/validation";
import { redirect } from 'next/navigation';
import Link from "next/link";

const handleClick = async (fromData: FormData) => {
    "use server";
    try {
        console.log("Submit has been pressed");
        
        const name = fromData.get('name');
        const password = fromData.get('password');
        const email = fromData.get('email');

        // zod validation
        const result = signUpValidation.safeParse({name, email, password})
        if (!result.success) {
            return console.log("incorrect input");
        } else {
            console.log("Input is correct");
        }
        const res = await axios.post("https://my-app.jyotimukherjeeadra86.workers.dev/api/user/sign-in", {
            name,
            password,
            email
        }, {
            headers: {
                "Content-Type" : "application/json"
            }, 
            withCredentials: true
        },)
        console.log("API response: ",res);
    } catch (error) {
        console.error("Error:", error);
    }
    redirect("/Blogs")
}

const SignUp = () => {
    return (
        <div className="text-white border-[#424242] border rounded-3xl p-7 max-w-md w-full">
                    <h2 className="text-3xl w-full text-center mb-8 text-[#ACACAC]">
                        Create Account
                    </h2>
                <form action={handleClick}>
                    <div className="grid gap-2 w-full pb-6">
                        <label 
                        htmlFor="name"
                        className="text-base"
                        >
                        Name
                        </label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Name"
                        className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 w-full placeholder:text-sm placeholder:text-[#616161]"
                        required
                        />
                    </div>
                    <div className="grid gap-2 w-full pb-6">
                        <label 
                        htmlFor="Email"
                        className="text-base"
                        >
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
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <label 
                        htmlFor="password"
                        >
                        Password
                        </label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="******"
                        className="bg-transparent border border-[#656565] rounded-xl py-2 px-3 placeholder:text-sm placeholder:text-[#616161]"
                        required
                        />
                    </div>
                    <div className="flex justify-center pt-10">
                        <Button
                        text="Sign Up"
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="w-full lg:py-3 rounded-xl"
                        />
                    </div>
                    <div className="text-sm text-[#9D9D9D] text-center mt-4">
                        Already have an account? &nbsp;
                        <Link 
                        href="/Login"
                        className="text-[#4B9AEA] hover:text-blue-600"
                        >
                        Login
                        </Link>
                    </div>
                </form>
        </div>
    )
}

export default SignUp