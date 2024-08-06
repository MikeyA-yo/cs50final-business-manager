import { NextResponse } from "next/server";
import { clientPromise } from "../mongodb";

export async function POST(req:Request){
    const { cycle, userId } = await req.json();
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const businesses = db.collection("businesses");
    if(!cycle || !userId){
        return NextResponse.json({error:"Well"});
    }
    await businesses.updateOne({userId}, {$set:{cycle}});
    return NextResponse.json({})
}