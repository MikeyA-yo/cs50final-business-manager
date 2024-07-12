import { Open_Sans } from "next/font/google"

const open = Open_Sans({weight:["600"], subsets:["hebrew"]})
export default function Register(){
    return (
        <>
          <div className={open.className}>
            <div>
                <h1 className="text-2xl">Register your Business(es)</h1>
            </div>
          </div>
        </>
    )
}