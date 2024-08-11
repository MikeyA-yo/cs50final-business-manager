import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/auth";
import { clientPromise } from "../mongodb";
import { ObjectId } from "mongodb";

export async function POST(req:NextRequest){
  const {id} = await req.json();
  const {user} = await auth();
  if (!id || !user){
    return NextResponse.json({error:"Id or user missing"});
  }
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const customers = db.collection("customers");
  const invoices = db.collection("invoices");
  await customers.deleteOne({_id: new ObjectId(id as string)});
  await invoices.deleteMany({customerId: new ObjectId(id as string)})
  return NextResponse.json({});
}