"use server";

import { clientPromise } from "@/app/api/mongodb";
import bcrypt from "bcrypt"
import { lucia } from "@/app/api/auth/auth";
import { cookies } from "next/headers";


import { redirect } from "next/navigation";
import { formdata } from "./emailsignin";
import { isValidEmail } from "@/app/api/auth/login/email/functions";

export async function CreateAccount(data: formdata) {
  const name = data.firstName;
  const lastName = data.lastName;
  const email = data.email;
  const password = data.password;
  if (name && lastName && email && password) {
    const username = `${name} ${lastName}`;
    const res = await fetch(
      "http://localhost:3000/api/auth/login/email/create",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );
    if (res.status == 302) {
      return redirect("/");
    }
    if (res.status == 400) {
      const text = await res.text();
      return redirect(`/error/${text}`);
    }
  } else if (email && password) {
    const res = await fetch("http://localhost:3000/api/auth/login/email", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status == 302) {
      return redirect("/");
    }
    if (res.status == 400) {
      const text = await res.text();
      return redirect(`/error/${text}`);
    }
    redirect("/");
  }
}
export interface ActionResult {
  message: string | null;
}
export async function CreateAccountv2(
  _: any,
  data: FormData
): Promise<ActionResult> {
  const name = data.get("firstName");
  const lastName = data.get("lastName");
  const email = data.get("email");
  const password = data.get("password");

  if (name && lastName && email && password) {
    const username = `${name} ${lastName}`;
    const res = await fetch(
      "http://localhost:3000/api/auth/login/email/create",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    if (res.status === 302) {
      redirect("/");
    }

    if (res.status === 400) {
      const text = await res.text();
      return {
        message: text,
      };
    }
  } else if (email && password) {
    const cookie = cookies();
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const users = db.collection("users");
    if(!isValidEmail(email as string)){
        return {
          message:"Invalid Email"
        }
    }
    const existingUser = await users.findOne({email})
    if(!existingUser){
        return {
          message:"User Doesn't exists"
        }
    }
    if(!existingUser.hashedPassword){
        return {
          message:"This account was created with google, please sign in with google"
        }
    }
    const check = await bcrypt.compare(password as string, existingUser.hashedPassword);
    if(check){
        const session = await lucia.createSession(existingUser._id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        console.log(sessionCookie)
        cookie.set(
            sessionCookie.name, 
            sessionCookie.value, 
            sessionCookie.attributes
        );
      }
  }
 return redirect("/");
}
