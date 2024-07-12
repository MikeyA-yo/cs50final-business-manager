import { signOut } from "../login/email/functions";

export async function GET(){
    return (await signOut())
}