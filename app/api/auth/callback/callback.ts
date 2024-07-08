import { cookies } from "next/headers";
import { google, lucia } from "../auth";
import { OAuth2RequestError } from "arctic";

export async function callback(req:Request){
    const url = new URL(req.url)
    const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
    const storedState = cookies().get("state")?.value ?? null;
    const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier ) {
		return new Response(null, {
			status: 400
		});
	}
    try {
        const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
        const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const user = await response.json();
        console.log(tokens, user)
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            const { request, message, description } = e;
            console.log(request, message, description )
        }
        // unknown error
    }
} 