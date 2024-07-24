import { ObjectId } from "mongodb";
import { clientPromise } from "../mongodb";
import { NextResponse } from "next/server";
import { isValidEmail } from "../auth/login/email/functions";
export async function POST(req:Request){
  const {name, email, userID} = await req.json();
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const customers = db.collection("customers");
  const users = db.collection("users");
  const userId = new ObjectId(userID as string)
  const customer = await customers.findOne({name, userId});
  if(customer){
    return NextResponse.json({error:"Customer already exists"})
  }
  if(!isValidEmail(email)){
    return NextResponse.json({error:"confirm this email"})
  }
  const user = await users.findOne({_id:userId});
  if(!user){
    return NextResponse.json({error:"This User doesn't exist, are you just using this API and postman or smth?"})
  }
  await customers.insertOne({name, email, userId});
  return NextResponse.json({})
}