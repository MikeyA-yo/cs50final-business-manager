"use client";

import { useState } from "react";
import { UserPlus } from "../someSvgs";
import { Err } from "../utilComps";


export default function CreateCustomer({userID}:{userID:string}){
    const [form, setForm] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [errText, setErrText] = useState("Error Occured")
    const [err, setErr] = useState(false)
    async function createCustomer(name:string, email:string){
      const res = await fetch("/api/createcustomer",{
        method:"POST",
        body:JSON.stringify({name, email,userID })
      })
      const msg = await res.json();
      if(msg.error){
        setErr(true);
        setErrText(msg.error)
        return
      }
      setForm(false)
    }
    return (
        <>
          <div className="flex flex-col items-center justify-center gap-2 bg-[#088395] p-2 rounded">
            {err && <Err message={errText} onClick={()=>setErr(false)} />}
             <p className="flex gap-2 cursor-pointer"  onClick={()=>setForm(!form)}>Create Customer <UserPlus className="size-6" /></p>
             {form && (
                <div className="flex flex-col gap-1">
                  <p>Name: </p>
                  <input type="text" required  onChange={(e)=>setName(e.target.value)}/>
                  <p>Email: </p>
                  <input type="email" onChange={(e)=>setEmail(e.target.value)} />
                  <button type="submit" className="bg-[#EBF4F6]" onClick={()=>{
                    if(name.length < 3 || email.length < 5){
                      setErr(true)
                      setErrText("Name or Email invalid")
                      return
                    }
                    createCustomer(name, email)
                  }}>Create</button>
                </div>
             )}
          </div>
        </>
    )
}