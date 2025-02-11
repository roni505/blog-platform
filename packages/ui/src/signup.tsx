'use client'

import axios from "axios";
import Button from "./button";
import { signUpValidation } from "@repo/zod-schemas/validation";

const handelClick = async (fromData: FormData) => {
    try {
        console.log("Form sumbit button as been clicked");
        alert("Btn clicked")
        
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
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("API response: ", res.data);
        
        if (res.data.jwt) {
            localStorage.setItem("token", res.data.jwt)
            console.log(name, password, email, res.data.jwt)   
        } else {
            console.log("Token is missing");
            
        }
    } catch (error) {
        console.error("Error:", error);
        
    }
}


const SignUp = () => {
    return (
        <form action={handelClick}>
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