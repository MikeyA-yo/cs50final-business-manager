import { Roboto } from "next/font/google";
import CreateCustomer, { DeleteCustomer } from "./createCustomer";
import { auth } from "@/app/api/auth/auth";
import { redirect } from "next/navigation";
import { clientPromise } from "@/app/api/mongodb";
import { Collection, ObjectId } from "mongodb";

const rob = Roboto({ weight: ["500"], subsets: ["vietnamese"] });
export default async function Customers() {
  const { user } = await auth();
  if (!user) {
    return redirect("/login");
  }
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const customers = db.collection("customers");
  const uniqueCustomers = customers.find({ userId: user.id });
  const invoices = db.collection("invoices");
  const customersArray = await uniqueCustomers.toArray();
  const businesses = db.collection("businesses")
  const buisness = await businesses.findOne({userId:user.id.toString()});
  if(!buisness){
    return redirect("/register")
  }
  const sign = buisness.currency === "naira" ? "₦" : "$";
  return (
    <>
      <div
        className={`bg-[#EBF4F6] flex flex-col gap-4 items-center justify-center lg:justify-normal md:justify-normal w-full overflow-auto ${rob.className}`}
      >
        <div className="p-4">
          <h3 className="text-3xl">Customers: </h3>
        </div>
        <CreateCustomer userID={user.id.toString()} />
        <div className="flex flex-col gap-2 md:p-4 items-center">
          <table className="lg:block md:block hidden">
            <tbody>
              {customersArray.length > 0 && (
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="tableData">Total Invoices</th>
                  <th className="tableData">Total Pending ({sign})</th>
                  <th className="tableData">Total Paid ({sign})</th>
                </tr>
              )}
              {customersArray.length > 0 &&
                customersArray.map((customer, i) => {
                  return (
                    <CustomerTable
                      name={customer.name ?? ""}
                      email={customer.email ?? ""}
                      key={i}
                      id={user.id}
                      invoices={invoices}
                      customers={customers}
                    />
                  );
                })}
            </tbody>
          </table>
          <div className="lg:hidden md:hidden bg-[#088395] rounded flex flex-col justify-evenly gap-2 p-2">
             {customersArray.map((customer, i)=>{
              return (
                <CustomerCards name={customer.name ?? ""} email={customer.email ?? ""} key={i} id={user.id} invoices={invoices} customers={customers} sign={sign} />
              )
             })}
          </div>
          {customersArray.length === 0 && (
            <h3>No Customers Yet, create one to see them appear</h3>
          )}
        </div>
      </div>
    </>
  );
}

async function CustomerTable({ name, email, id, invoices, customers }: { name: string; email: string, id:ObjectId, invoices:Collection<any>, customers:Collection<any>  }) {
  let invoiceNumbers = 0;
  const customer = await customers.findOne({userId: id, name:name, email:email})
  const uniqueInvoices = invoices?.find({customerId:customer?._id});
  const invoiceArray = await uniqueInvoices?.toArray();
  if(uniqueInvoices){
    invoiceNumbers = invoiceArray?.length ?? 0
  }
  let totalPending = 0;
  let totalPaid = 0;
  for (let i = 0; i < invoiceArray.length; i++){
     if (invoiceArray[i].status === "pending"){
      totalPending += invoiceArray[i].amount;
     }else{
      totalPaid += invoiceArray[i].amount;
     }
  }
  return (
    <tr className="even:bg-[#37B7C3]">
      <td className="tableData">{name}</td>
      <td className="tableData">{email}</td>
      <td className="tableData">{invoiceNumbers}</td>
      <td className="tableData">{totalPending}</td>
      <td className="tableData">{totalPaid}</td>
      <td className="tableData"><DeleteCustomer  id={customer?._id.toString()}/></td>
    </tr>
  );
}

async function CustomerCards({ name, email, id, invoices, customers, sign }: { name: string; email: string, id:ObjectId, invoices:Collection<any>, customers:Collection<any>, sign?:string}){
  let invoiceNumbers = 0;
  const customer = await customers?.findOne({userId: id, name:name, email:email})
  const uniqueInvoices = invoices?.find({customerId:customer?._id});
  const invoiceArray = await uniqueInvoices?.toArray();
  if(uniqueInvoices){
    invoiceNumbers = invoiceArray?.length ?? 0
  }
  let totalPending = 0;
  let totalPaid = 0;
  for (let i = 0; i < invoiceArray.length; i++){
     if (invoiceArray[i].status === "pending"){
      totalPending += invoiceArray[i].amount;
     }else{
      totalPaid += invoiceArray[i].amount;
     }
  }
  return (
    <div className="flex flex-col justify-evenly w-auto bg-[#37B7C3] rounded p-2 gap-2">
       <div className="border-b flex flex-col gap-1 p-2 border-gray-300">
        <p>{name}</p>
        <p>{email}</p>
       </div>
       <div className="flex items-center justify-around border-b p-2 border-gray-300">
          <div>
            <p>Pending</p>
            <p>{sign}{totalPending}</p>
          </div>
          <div>
            <p>Paid</p>
            <p>{sign}{totalPaid}</p>
          </div>
       </div>
       <div className="border-b p-2 flex flex-col gap-1 border-gray-300">
           {invoiceNumbers} invoices
       </div>
    </div>
  )
}