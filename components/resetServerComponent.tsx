import { auth } from "@/app/api/auth/auth";
import ResetPassword from "./resetPassword";
import { clientPromise } from "@/app/api/mongodb";
import { redirect } from "next/navigation";

export default async function ResetPass(){
    const {user} = await auth();
    if(user){
       const client = await clientPromise;
       const db = client.db("BusinessManager");
       const users = db.collection("users");
       const userP = await users.findOne({_id:user.id});
       if(userP && !userP.hashedPassword){
        return redirect("/")
       }
    }
    return <ResetPassword />
}