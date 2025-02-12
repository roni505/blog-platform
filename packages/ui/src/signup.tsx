
import axios from "axios";
import Button from "./button";
import { signUpValidation } from "@repo/zod-schemas/validation";
import  { redirect }  from "next/navigation";

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
        const res = await fetch("https://my-app.jyotimukherjeeadra86.workers.dev/api/user/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        // console.log("API response: ",await res.json());
        redirect("/login")
    } catch (error) {
        console.error("Error:", error);
    }
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