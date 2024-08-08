import { NextResponse } from "next/server";
import { clientPromise } from "../mongodb";

export async function POST(req:Request){
    const currencies = ["naira", "dollars"]
    const { currency, userId } = await req.json();
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const businesses = db.collection("businesses");
    if(!currency || !userId){
        return NextResponse.json({error:"Well"});
    }
    if(!currencies.includes(currency)){
      return NextResponse.json({error:"Only Naira and Dollar allowed"});
    }
    await businesses.updateOne({userId}, {$set:{currency}});
    return NextResponse.json({})
}