import { Roboto } from "next/font/google"
import CreateCustomer from "./createCustomer"
import { auth } from "@/app/api/auth/auth"
import { redirect } from "next/navigation";
import { clientPromise } from "@/app/api/mongodb";

const rob = Roboto({weight:["500"], subsets:["vietnamese"]})
export default async function Customers(){
    const {user} = await auth();
    if(!user){
        return redirect("/login");
    }
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const customers = db.collection("customers");
    const uniqueCustomers = customers.find({userId:user.id})
    const customersArray = await uniqueCustomers.toArray()
    return (
        <>
          <div className={`bg-[#EBF4F6] flex flex-col gap-4 items-center w-full overflow-auto ${rob.className}`}>
            <div className="p-4">
                <h3 className="text-2xl">Customers</h3>
            </div>
            <CreateCustomer userID={user.id.toString()} />
            <div>
              {customersArray.length > 0 && customersArray.map((customer, i)=>{
                return (
                   <h3 key={i} className="text-2xl">{customer.name ?? ""}</h3>
                )
              })}
            </div>
          </div>
        </>
    )
}