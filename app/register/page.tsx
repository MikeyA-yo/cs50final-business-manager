import Register from "@/components/register";
import { auth } from "../api/auth/auth";

export default async function Page(){
  const {user} = await auth()
 let userId = ""
 if(user){
  userId = user.id.toString()
 }
    return (
        <>
          <div className="lg:block hidden ">
            <Register userId={userId} />
          </div>
        </>
    )
}