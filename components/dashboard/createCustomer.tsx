"use client";

import { useState } from "react";
import { Delete, UserPlus } from "../someSvgs";
import { Comp, Err } from "../utilComps";
import { useRouter } from "next/navigation";
import { revalidate } from "./actions";

export default function CreateCustomer({ userID }: { userID: string }) {
  const [form, setForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errText, setErrText] = useState("Error Occured");
  const [err, setErr] = useState(false);
  const [refresh, setRefresh]= useState(false)
  const [compText, setCompText] = useState("Created Customer");
  const [comp, setComp] = useState(false);
  async function createCustomer(name: string, email: string) {
    const res = await fetch("/api/createcustomer", {
      method: "POST",
      body: JSON.stringify({ name, email, userID }),
    });
    const msg = await res.json();
    if (msg.error) {
      setErr(true);
      setErrText(msg.error);
      return;
    }
    setForm(false);
    if(res.ok && !msg.error){
      revalidate()
      setComp(true)
      return 
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 bg-[#088395] p-2 rounded">
        {err && <Err message={errText} onClick={() => setErr(false)} />}
        {comp && <Comp message={compText} onClick={()=>setComp(false)} />}
        <p className="flex gap-2 cursor-pointer" onClick={() => setForm(!form)}>
          Create Customer <UserPlus className="size-6" />
        </p>
        {form && (
          <div className="flex flex-col gap-1">
            <form className="flex flex-col gap-1" onSubmit={(e)=>{e.preventDefault()}}>
              <p>Name: </p>
              <input
                type="text"
                required
                placeholder="Customer's Name"
                className="p-2"
                onChange={(e) => setName(e.target.value)}
              />
              <p>Email: </p>
              <input
               className="p-2"
                type="email"
                placeholder="abc@xyz.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#EBF4F6]"
                onClick={() => {
                  if (name.length < 3 || email.length < 5) {
                    setErr(true);
                    setErrText("Name or Email invalid");
                    return;
                  }
                  createCustomer(name, email);
                }}
              >
                Create
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
 export function DeleteCustomer({id}:{id:string}){
  async function deleteCustomer() {
    const res = await fetch(`/api/deletecustomer`,{
      method:"POST",
      body:JSON.stringify({id})
    });
    const json = await res.json();
     if(json.error){
      alert(json.error)
      return
     }
    revalidate()
  }
  return (
    <div className="cursor-pointer" onClick={()=>{
      deleteCustomer();
    }}>
      <Delete className="size-8 p-1 border-2 rounded" />
    </div>
  )
 }