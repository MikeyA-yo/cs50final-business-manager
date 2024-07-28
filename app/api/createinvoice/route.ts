import { ObjectId } from "mongodb";
import { clientPromise } from "../mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request){
    const {customerID, userID, amount, status} = await req.json();
    const client = await clientPromise;
    const db =client.db("BusinessManager");
    const users = db.collection("users");
    const invoices = db.collection("invoices");
    const customers = db.collection("customers");
    const userId = new ObjectId(userID as string);
    const customerId = new ObjectId(customerID as string);
    const user = await users.findOne({_id:userId});
    const customer = await customers.findOne({_id: customerId});
    if(!user || !customer){
        return NextResponse.json({error:"Customer or User doesn't exist"});
    }
    const createDate = new Date().toDateString()
    await invoices.insertOne({amount, status, userId, customerId, createDate});
    return NextResponse.json({})
}

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    if (!searchParams.get("id")){
       return 
    }
    const ID = new ObjectId(searchParams.get("id") as string)
    const client = await clientPromise;
    const db =client.db("BusinessManager");
    const users = db.collection("users");
    const invoices = db.collection("invoices");
    const customers = db.collection("customers");
    const user = await users.findOne({_id:ID})
    if (!user){
        return NextResponse.json({error:"No user"})
    }
    const invoicesUnique = invoices.find({_id: ID});
    const invoiceArray = await invoicesUnique.toArray();
    let invoiceData:InvoiceData[] = [];
    for (let i = 0; i < invoiceArray.length; i++){
        const customer = await customers.findOne({_id: invoiceArray[i].customerId});
        if(!customer){
            continue
        }
        const data = {
            amount:invoiceArray[i].amount,
            status:invoiceArray[i].status,
            createDate: invoiceArray[i].createDate,
            customer:customer.name,
            customerEmail: customer.email
           }
           invoiceData.push(data)
    }
    return NextResponse.json(invoiceData);
}

export interface InvoiceData{
    amount:number,
    status:"pending" | "paid",
    customerEmail:string,
    customer:string,
    createDate:string
}