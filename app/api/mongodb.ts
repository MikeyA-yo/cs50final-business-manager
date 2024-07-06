import {  MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI as string,{
    retryReads:true,
    retryWrites:true
})

export const clientPromise = client.connect()