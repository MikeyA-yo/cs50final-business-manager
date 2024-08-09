"use client";
import GoogleSvg from "./google";
import { useState } from "react";
import { Spinner } from "./someSvgs";

export default function GmailLogin(){
    const [load, setLoad] = useState(false)
    return (
        <>
        <a href={`/api/auth/login`} onClick={()=>setLoad(true)} className="lg:w-auto md:w-auto min-w-60">
            <div className="bg-[#37B7C3] gap-2 p-2 shadow-lg shadow-[#088395] flex items-center justify-center">
              <GoogleSvg className="h-8 w-8" /> <span>Sign in With Google</span> {load && <Spinner className="animate-spin size-8" />}
            </div>
          </a>
        </>
    )
}