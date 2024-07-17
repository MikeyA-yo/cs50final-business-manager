import Register, { RegisterMobile } from "@/components/register";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"Register"
}
export default function Page(){
    return (
        <>
          <div className="lg:block hidden ">
            <Register  />
          </div>
          <div className="lg:hidden block">
            <RegisterMobile  />
          </div>
        </>
    )
}