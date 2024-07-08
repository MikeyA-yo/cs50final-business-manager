import { SignInGoogle } from "./login";

export async function GET(){
    const url = await SignInGoogle();
    return Response.redirect(url);
}