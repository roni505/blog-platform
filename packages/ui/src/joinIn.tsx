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
        return console.log("zod error",result.success);
    } else {
        console.log("Input correct"); 
    }
    const res = await axios.post("http://localhost:8787/api/user/login", {
        email,
        password
    }, {
        headers: {
            "Content-Type" : "application/json"
        },
        withCredentials: true
    })
    console.log("This is the response: ", res.headers);
    if (res.status === 200 && res.data.success) {
        const token = res.data.jwt;
        localStorage.setItem("token", token)
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





// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJpZCI6ImNjOGRhNjUyLTAzMDEtNDZlZS05ZWNmLTk4NmYzYWVmNTZiNyJ9.
// rWv-TQJPX3K1iRlx72J0ZkYJZxWGt1-smY_iZBJNdac



// auth_cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJpZCI6ImNjOGRhNjUyLTAzMDEtNDZlZS05ZWNmLTk4NmYzYWVmNTZiNyJ9.
// rWv-TQJPX3K1iRlx72J0ZkYJZxWGt1-smY_iZBJNdac.
// zBu7MBTYWU3aY5sUNVD%2Fg8%2BCdaYchAjAQcVRjJeGyF8%3D