import { NextResponse } from "next/server";
import { clientPromise } from "../mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function POST(req:Request){
    const {user, newPass} = await req.json();
    if(!user || !newPass){
        return NextResponse.json({error:"What are you even trying to do??"})
    }
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const users = db.collection("users")
    const userId = new ObjectId(user._id as string)
    const userDb = await users.findOne({_id:userId});
    if (!userDb){
        return NextResponse.json({error:"What are you even trying to do??"})
    }
    if(!userDb.passChange){
        return NextResponse.json({error:"What are you even trying to do??"});
    }
    const hashedPassword = await bcrypt.hash(newPass, 10);
    const update = {
        $set:{
            hashedPassword,
        },
        $unset:{
            "passChange":""
        }
    }
    users.updateOne({_id:userDb._id}, update)
    return NextResponse.json({})
}