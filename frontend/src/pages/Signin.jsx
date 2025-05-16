import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
export function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate("");
    return (<div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading text="Sign In" />
                <SubHeading text="Enter your Credentials" />
                <InputBox onChange={(e)=>setEmail(e.target.value)} placeholder={"example@gmail.com"} label={"Email"} />
                <InputBox onChange={(e)=>setPassword(e.target.value)} placeholder={"******"} label={"Password"} />
                <Button label={"Login"} onClick={async ()=>{
                    const response = await axios.post("http://localhost:777/api/v1/user/signin",{
                        email, 
                        password
                    });
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    navigate("/dashboard");
                }}/>
                <BottomWarning label="Don't have an Account" buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    </div>)
}