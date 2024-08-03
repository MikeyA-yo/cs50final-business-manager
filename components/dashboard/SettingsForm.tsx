"use client"

import { useState } from "react"

export function CapitalForm({userId}:{userId:string}){
    const [capital, setCapital] = useState(0)
    async function SaveCapital(){
      const res = await fetch(`/api/savecapital`, {
        method:"POST",
        body:JSON.stringify({capital, userId})
      })
      const json = await res.json();

    }
    return (
        <>
         <div className="flex flex-col items-center pt-4 gap-2">
           <p>Avg. Capital: </p>
           <input type="number" placeholder="Amount: " className="p-2" onChange={(e)=>{
            setCapital(parseInt(e.target.value))
           }}/>
           <button className="bg-[#37B7C3] p-2 rounded" onClick={()=>{
            SaveCapital();
           }}>Save</button>
         </div>
        </>
    )
}