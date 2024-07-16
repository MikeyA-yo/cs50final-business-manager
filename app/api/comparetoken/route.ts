import { NextResponse } from "next/server";
import { clientPromise } from "../mongodb";

export async function POST(req: Request) {
  const { token } = await req.json();
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const users = db.collection("users");
  const tokens = db.collection("tokensTemp");
  const currentToken = await tokens.findOne({token});
  if (!currentToken){
    return NextResponse.json({error:"Invalid token"})
  }
  const user = await users.findOne({_id:currentToken.userId})
  if(user){
     tokens.deleteOne({token})
     return NextResponse.json(user)
  }
  return NextResponse.json({erro:"User Not found"})
}
