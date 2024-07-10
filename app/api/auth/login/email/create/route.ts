import { createUser } from "../functions"

export async function POST(req:Request){
    const {email, username, password} = await req.json()
    return (await createUser(email,username,password))
}