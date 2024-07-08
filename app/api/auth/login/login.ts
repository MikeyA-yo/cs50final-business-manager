import { cookies } from "next/headers";
import { google, lucia } from "../auth";
import { generateState, generateCodeVerifier } from "arctic";
export async function SignInGoogle(){
    const state = generateState();
    const codeVerifier = generateCodeVerifier()
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"]
    })

    cookies().set("state", state,{
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })
    cookies().set("code_verifier", codeVerifier,{
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })
    return url
}