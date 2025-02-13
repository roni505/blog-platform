import Button from "./button"
import axios from "axios";
import { loginValidation } from "@repo/zod-schemas/validation";
import { redirect } from "next/navigation";

const handleLogin = async (fromData: FormData) => {
    'use server'
        console.log("Button clicked");
        
        const email = fromData.get('email');
        const password = fromData.get('password');
        console.log(email, password);
        
        const result = loginValidation.safeParse({email, password})
        if (!result.success) {
            console.log("Incorrect input");
        } else {
            return console.log("Input correct"); 
        }
        const res = await axios.post("http://127.0.0.1:8787/api/user/login", {
            email,
            password
        }, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        })
        console.log("This is the response: ", res);
        if (res.status === 200 && res.data.success) {
            redirect("/blogs")
        }
}

const JoinIn = async () => {
    return (
        <form action={handleLogin}>
            <div>
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password" />
            <Button text="Login" variant="primary" size="lg"/>
            </div>
        </form>
    )
}

export default JoinIn;