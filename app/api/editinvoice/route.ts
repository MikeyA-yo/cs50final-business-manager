import { ObjectId } from "mongodb";
import { clientPromise } from "../mongodb";
import { NextResponse } from "next/server";

export async function POST(req:Request){
  const {id} = await req.json();
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const invoices = db.collection("invoices");
  const invoice = await invoices.findOne({_id: new ObjectId(id as string)});
  if (invoice === null){
    return NextResponse.json({error:"Invoice Not found"})
  }
  return NextResponse.json(invoice)
}

export async function PUT(req:Request){
    const {id, amount, status} = await req.json();
    if(!id || !amount || !status){
        return NextResponse.json({error:"Incomplete fields"})
    }
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const invoices = db.collection("invoices");
    const invoice = await invoices.updateOne({_id: new ObjectId(id as string)}, {$set:{
        amount:parseInt(amount),
        status:status
    }});
    
    return NextResponse.json(invoice)
}