"use server";

import { clientPromise } from "@/app/api/mongodb";
import bcrypt from "bcrypt";
import { lucia } from "@/app/api/auth/auth";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { isValidEmail } from "@/app/api/auth/login/email/functions";

export interface ActionResult {
  message: string | null;
}
export async function CreateAccountv2(
  _: unknown,
  data: FormData
): Promise<ActionResult> {
  const name = data.get("firstName");
  const lastName = data.get("lastName");
  const email = data.get("email");
  const password = data.get("password");

  if (name && lastName && email && password) {
    const username = `${name} ${lastName}`;
    const cookie = cookies();
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const users = db.collection("users");
    if (!isValidEmail(email as string)) {
      return {
        message: "Invalid Email",
      };
    }
    if(password.toString().length < 4){
      return {
        message: "Minimum password length of 4 characters",
      };
    }
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return {
        message: "User already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password as string, 10);
    const userObject = {
      email,
      name: username,
      image: "",
      hashedPassword,
    };
    const result = await users.insertOne(userObject);
    const session = await lucia.createSession(result.insertedId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/register")
  } else if (email && password) {
    const cookie = cookies();
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const users = db.collection("users");
    if (!isValidEmail(email as string)) {
      return {
        message: "Invalid Email",
      };
    }
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return {
        message: "User Doesn't exists",
      };
    }
    if (!existingUser.hashedPassword) {
      return {
        message:
          "This account was created with google, please sign in with google",
      };
    }
    const check = await bcrypt.compare(
      password as string,
      existingUser.hashedPassword
    );
    if (check) {
      const session = await lucia.createSession(existingUser._id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  }
  return redirect("/dashboard");
}
