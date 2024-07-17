import Login from "@/components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"Create Account or Login"
}
export default function Page(){
    return (
      <>
        <Login />
      </>

    )
}