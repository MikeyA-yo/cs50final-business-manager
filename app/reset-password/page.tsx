import ResetPassword from "@/components/resetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"Reset-Password"
}
export default function Page(){
    return (
        <>
          <ResetPassword />
        </>
    )
}