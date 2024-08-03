import { NextResponse } from "next/server";
import { clientPromise } from "../mongodb";

export async function POST(req:Request){
    const { capital, userId } = await req.json();
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const businesses = db.collection("businesses");
    if(!capital || !userId){
        return NextResponse.json({error:"Well"});
    }
    if(isNaN(parseInt(capital))){
      return NextResponse.json({error:"Only Numbers allowed"});
    }
    await businesses.updateOne({userId}, {$set:{capital}});
    return NextResponse.json({})
}