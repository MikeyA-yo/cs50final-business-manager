import { clientPromise } from "@/app/api/mongodb";
import bcrypt from "bcrypt"
import { lucia } from "../../auth";
import { cookies } from "next/headers";

export function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}

export async function createUser(email:string, name:string, password:string){
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
    if(existingUser){
        return new Response(
            "User already exists", {
                status:400,
                headers: {
                    Location: "/login",
                  },
            }
        )
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const userObject = {
        email,
        name,
        image:"",
        hashedPassword
    }
   const result =  await users.insertOne(userObject);
   const session = await lucia.createSession(result.insertedId, {});
   const sessionCookie = lucia.createSessionCookie(session.id);
   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
   return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}