"use client"

import { useRouter } from "next/navigation"

export default function Back(){
    const router = useRouter()
  return (
    <p onClick={()=>{
      router.back()
    }}>
        &lt; Go Back
    </p>
  )
}