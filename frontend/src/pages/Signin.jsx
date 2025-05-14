import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import SubHeading from "../components/SubHeading";
export function Signin() {
    return (<div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading text="Sign In" />
                <SubHeading text="Enter your Credentials" />
                <InputBox placeholder={"example@gmail.com"} label={"Email"} />
                <InputBox placeholder={"******"} label={"Password"} />
                <Button label={"Login"} />
                <BottomWarning label="Don't have an Account" buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    </div>)
}