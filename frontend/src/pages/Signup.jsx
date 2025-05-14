import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    
    const navigate = useNavigate();
    const [name ,setName] = useState("");
    const [email ,setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (<div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading text="Sign Up" />
                <SubHeading text="Enter your information to create an account" />
                <InputBox onChange={(e)=>setName(e.target.value)} placeholder={"John"} label={"Name"} />
                <InputBox onChange={(e)=>setEmail(e.target.value)} placeholder={"example@gmail.com"} label={"Email"} />
                <InputBox onChange={(e)=>setPassword(e.target.value)} placeholder={"******"} label={"Password"} />
                <Button label={"Sign Up"} onClick={async ()=>{
                    const response = await axios.post("http://localhost:777/api/v1/user/signup",{
                        name,
                        email,
                        password
                    });
                    localStorage.setItem("token",response.data.token);
                    navigate("/dashboard");
                }}/>
                <BottomWarning label="Already have an account?" buttonText={"Sign Up"} to={"/"}/>
            </div>
        </div>
    </div>)
}