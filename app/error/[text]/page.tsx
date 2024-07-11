import { Montserrat } from "next/font/google"
import Link from "next/link"

const mont = Montserrat({weight:["700"], subsets:["vietnamese"]})
export default function Page({params}:{params:{text:string}}){
    let error = params.text.replaceAll("%20"," ")
    return (
        <>
         <div className={`flex flex-col items-center h-screen justify-center ${mont.className}`}>
            <p className="self-start lg:px-32 text-2xl cursor-pointer px-10"><Link href={`/login`}>&lt; Go Back</Link></p>
            <h1 className="lg:text-5xl md:text-4xl text-3xl text-center text-red-400">{error}</h1>
         </div>
        </>
    )
}