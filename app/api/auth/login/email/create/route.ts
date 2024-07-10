import { createUser } from "../functions"

export async function GET(req:Request){
    const {email, username, password} = await req.json()
    return (await createUser(email,username,password))
}