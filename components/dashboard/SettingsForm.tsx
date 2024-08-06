"use client"

import { useState } from "react"
import { revalidate } from "./actions";

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
      revalidate()
    }
    return (
        <>
         <div className="flex flex-col bg-[#EBF4F6] items-center p-4 rounded gap-2">
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
  const [basis, setBasis] = useState("weekly")
  async function SaveCycle(){
    const res = await fetch(`/api/savecycle`, {
      method:"POST",
      body:JSON.stringify({cycle:basis, userId})
    })
    const json = await res.json();
    if(json.error){
      return;
    }
    revalidate()
  }
 return (
  <><div className="flex flex-col bg-[#EBF4F6] gap-2 p-4 rounded items-center">
    <p>Weekly or Monthly</p>
    <select className="w-40 p-2" onChange={(e)=>{
      setBasis(e.target.value)
    }}>
      <option value={"weekly"}>Weekly</option>
      <option value={"monthly"}>Monthly</option>
    </select>
    <button className="bg-[#37B7C3] w-44 p-2 rounded" onClick={()=>{
      SaveCycle()
    }}>Save</button>
    </div></>
 )
}