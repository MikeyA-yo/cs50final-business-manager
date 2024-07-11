import { clientPromise } from "@/app/api/mongodb";
import bcrypt from "bcrypt"
import { auth, lucia } from "../../auth";
import { cookies } from "next/headers";
import { isValidEmail } from "./functions";

export async function POST(req:Request,res:Response){
   const {email, password} = await req.json()
   const cookie = cookies();
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const users = db.collection("users");
    if(!isValidEmail(email)){
        return new Response(
            "Invalid Email", {
                status:400,
                headers: {
                    Location: "/login",
                  },
            }
        )
    }
    const existingUser = await users.findOne({email})
    if(!existingUser){
        return new Response(
            "User Doesn't exists", {
                status:400,
                headers: {
                    Location: "/login",
                  },
            }
        )
    }
    if(!existingUser.hashedPassword){
        return new Response(
            "This account was created with google, please sign in with google", {
                status:400,
                headers: {
                    Location: "/login",
                  },
            }
        )
    }
    const check = await bcrypt.compare(password, existingUser.hashedPassword);
    if(check){
        const session = await lucia.createSession(existingUser._id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        console.log(sessionCookie)
        cookie.set(
            sessionCookie.name, 
            sessionCookie.value, 
            sessionCookie.attributes
        );
        return new Response(null, {
            status: 302,
            headers: {
              Location: "/",
            },
          });
    }
    return new Response("Incorrect password or email", {
        status: 400,
        headers: {
          Location: "/",
        },
      });   
}