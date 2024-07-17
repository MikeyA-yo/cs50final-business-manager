
import ResetPass from "@/components/resetServerComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"Reset-Password"
}
export default function Page(){
    return (
        <>
          <ResetPass />
        </>
    )
}