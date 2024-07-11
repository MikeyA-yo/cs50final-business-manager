import {  Login } from "./functions"

export async function POST(req:Request,res:Response){
   const {email, password} = await req.json()
   return (await Login(email,  password))
}