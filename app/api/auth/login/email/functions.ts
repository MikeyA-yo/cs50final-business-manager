
import { clientPromise } from "@/app/api/mongodb";
import bcrypt from "bcrypt"
import { auth, lucia } from "../../auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}

export async function createUser(email:string, name:string, password:string){
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

export async function Login(email:string, password:string){
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

export async function signOut(){
    const cookie = cookies();
    const {session} = await auth()
    if(!session){
        return redirect("/login")
    }
    await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/")
}