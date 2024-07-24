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
            <div className="flex flex-col gap-2 items-center">
              <h2 className="text-3xl">Customers</h2>
              <table>
                {customersArray.length > 0 && (
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                )}
              {customersArray.length > 0 && customersArray.map((customer, i)=>{
                return (
                   <CustomerTable name={customer.name ?? ""} email={customer.email ?? ""} key={i} />
                )
              })}
              </table>
              {customersArray.length === 0 && <h3>No Customers Yet, create one</h3>}
            </div>
          </div>
        </>
    )
}

function CustomerTable({name, email}:{name:string, email:string}){
  return (
    <tr className="even:bg-[#37B7C3]">
      <td className="tableData">{name}</td>
      <td className="tableData">{email}</td>
    </tr>
  )
}