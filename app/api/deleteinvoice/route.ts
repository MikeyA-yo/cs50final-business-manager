import { NextResponse } from "next/server";
import { clientPromise } from "../mongodb";
import { ObjectId } from "mongodb";

export async function GET(req:Request){
     const {searchParams} = new URL(req.url);
     if (!searchParams.get("id")){
          return NextResponse.json({error:"Wrong Usage"})
       }
     const id = new ObjectId(searchParams.get("id") as string)
     const client = await clientPromise;
     const db = client.db("BusinessManager");
     const invoices = db.collection("invoices");
     await invoices.deleteOne({_id:id});
     return new Response(null, {
          status:307,
          headers:{
               Location:"/dashboard"
          }
     });
}