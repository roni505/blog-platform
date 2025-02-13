
import axios from "axios";
import Button from "./button";
import { signUpValidation } from "@repo/zod-schemas/validation";
import { redirect } from 'next/navigation';

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
        const res = await axios.post("http://127.0.0.1:8787/api/user/sign-in", {
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
    redirect("/blogs")
}

const SignUp = () => {
    return (
        <form action={handleClick}>
            <input type="text" name="name" id="name" placeholder="Name" />
            <input type="email" name="email" id="email"placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password" />
            <Button
            text="Sign-Up"
            variant="primary"
            size="lg"
            type="submit"
            />
        </form>
    )
}

export default SignUp