import Image from "next/image";
import GoogleSvg from "./google";
import { Inter } from "next/font/google";
import { auth } from "@/app/api/auth/auth";


const inter = Inter({weight:["500"], subsets:["vietnamese"]})
export default async function Login(){
    const {user} = await auth()
    console.log(user)
 return (
    <>
      <div className={`flex bg-[#071952] items-center justify-center min-h-[100svh] ${inter.className}`}>
        <div className="lg:flex md:flex hidden items-center w-full justify-center ">
            <Image src={`/finance.svg`} alt="random alt" width={400} height={400} />
        </div>
        <div className="h-screen w-full gap-2 flex items-center justify-center bg-[#EBF4F6] ">
            <div className="bg-[#37B7C3] gap-2 p-2 shadow-lg shadow-[#088395] flex items-center justify-center"><GoogleSvg className="h-8 w-8" /> <span>Sign in With Google</span></div>
        </div>
      </div>
    </>
 )
}