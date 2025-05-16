import React, { useState, useEffect } from 'react'
import {Appbar} from "../components/Appbar";
import {Balance} from "../components/Balance";
import {Users} from "../components/Users";
import axios from 'axios';

export const Home = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() =>{
        const fetchBalance = async ()=>{
        const response = await axios.get("http://localhost:777/api/v1/account/balance",{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        });
        setBalance(response.data.balance);
    }; fetchBalance();
},[]);

return ( 
    <div>
        <Appbar />
        <div className='m-8'>
            <Balance value={balance} />
            <Users />
        </div>
    </div>
)
}
