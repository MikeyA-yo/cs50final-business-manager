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
      if(json.error){
        return;
      }
    }
    return (
        <>
         <div className="flex flex-col w-full items-center pt-4 gap-2">
           <p>Avg. Capital: </p>
           <input type="number" placeholder="Amount: " className="p-2" onChange={(e)=>{
            setCapital(parseInt(e.target.value))
           }}/>
           <button className="bg-[#37B7C3] w-44 p-2 rounded" onClick={()=>{
            SaveCapital();
           }}>Save</button>
         </div>
        </>
    )
}

export function PercentForm({userId}:{userId:string}){
 return (
  <><div className="flex flex-col gap-2 items-center">
    <p>min(0%) max(100%)</p>
    <input type="text" placeholder="50%" className="p-2"/>
    <button className="bg-[#37B7C3] w-44 p-2 rounded">Save</button>
    </div></>
 )
}