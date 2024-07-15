import { NextResponse } from "next/server";
import { clientPromise } from "../mongodb";

export async function POST(req:Request){
    const {name, motive, currency, role, infrastructure, userId} = await req.json();
    if(!name || !motive || !currency || !role || !infrastructure) return NextResponse.json({error:"Incomplete Values"})
    const client = await clientPromise;
    const db = client.db("BusinessManager")
    const businesses = db.collection("businesses");
    if (typeof name !== "string" ||typeof currency !== "string" ||typeof infrastructure !== "string" ||typeof motive !== "string" ||typeof role !== "string") return NextResponse.json({error:"Unknown DataTypes used"})
    try {
        await businesses.insertOne({name, motive, currency, role, infrastructure, userId})
        return NextResponse.json({message:'success'})
    } catch (e:any) {
        return NextResponse.json({error: e.message})
    }
}