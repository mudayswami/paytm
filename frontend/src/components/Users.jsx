import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(()=>{
        const search = async ()=>{
            const res = await axios.get("http://localhost:777/api/v1/user/bulk?filter="+filter,{
                headers:{
                    authorization: "Bearer "+localStorage.getItem("token")
                }
            });
            setUsers(res.data.users);
        }
        search();
    },[filter]);
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={(e)=>{
                setFilter(e.target.value);
            }} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user,key) => <User key={key} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.username[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                {user.username}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={()=> { navigate(`/sendmoney/?id=${user._id}&name=${user.username}`) }}/>
        </div>
    </div>
}