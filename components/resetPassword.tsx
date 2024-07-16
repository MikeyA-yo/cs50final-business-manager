"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
const mont = Montserrat({weight:["500"], subsets:["vietnamese"]})
export default function ResetPassword(){
    const  [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    async function sendToken(email:string){
        if(email.length < 5){
            return;
        }
        const res = await fetch("/api/forgotpass",{
            method:"POST",
            body:JSON.stringify({email})
        });
        const result = await res.json();
        if(result.error){
            return
        }
        setSent(true);
        return
    }
    if(sent){
        return (
            <>
              <div className={`flex flex-col items-center lg:text-center justify-center min-h-screen ${mont.className}`}>
                <div className="flex flex-col gap-2 p-6 rounded-lg shadow-lg shadow-[#37B7C3] bg-[#EBF4F6]">
                   <h2 className="lg:text-2xl text-wrap">Check your email {email} for a token,<br /> then click reset password<br /> and enter that token</h2>
                </div>
              </div>
            </>
        )
    }
    return (
        <>
        <div className={`flex flex-col items-center lg:text-center justify-center min-h-screen ${mont.className}`}>
            <div className="flex flex-col gap-2 p-4 rounded-lg shadow-lg shadow-[#37B7C3] bg-[#EBF4F6]">
                <h2 className="text-2xl">Forgot Password?</h2>
                <p>Enter Your Email for a Password reset</p>
                <label htmlFor="email" >Email: </label>
                <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email"  className="p-2 border-[#088395] border" placeholder="example@xyz.com" />
                <button className="bg-white p-2" onClick={()=>{sendToken(email)}}>Send Token</button>
                <p className="p-2 text-center"><Link href={`/login`}>&lt;- Back to Login</Link></p>
            </div>
        </div>
        </>
    )
}