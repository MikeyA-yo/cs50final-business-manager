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
  if(parseInt(currentToken.expires) < Date.now()){
    return NextResponse.json({error:"Token expired"})
  }
  const user = await users.findOne({_id:currentToken.userId})
  if(user){
    const update ={
      $set:{
        "passChange":true
      }
    }
     users.updateOne({_id:user._id}, update)
     tokens.deleteOne({token})
     return NextResponse.json(user)
  }
  return NextResponse.json({error:"User Not found"})
}
