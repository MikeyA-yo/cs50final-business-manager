import { Roboto } from "next/font/google";
import CreateCustomer from "./createCustomer";
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
  return (
    <>
      <div
        className={`bg-[#EBF4F6] flex flex-col gap-4 items-center justify-center lg:justify-normal md:justify-normal w-full overflow-auto ${rob.className}`}
      >
        <div className="p-4">
          <h3 className="text-2xl">Customers</h3>
        </div>
        <CreateCustomer userID={user.id.toString()} />
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-3xl">Customers</h2>
          <table className="lg:block md:block hidden">
            <tbody>
              {customersArray.length > 0 && (
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total Invoices</th>
                </tr>
              )}
              {customersArray.length > 0 &&
                customersArray.map((customer, i) => {
                  return (
                    <CustomerTable
                      name={customer.name ?? ""}
                      email={customer.email ?? ""}
                      key={i}
                    />
                  );
                })}
            </tbody>
          </table>
          <div className="lg:hidden md:hidden flex flex-col items-center justify-evenly gap-2 p-4">
             {customersArray.map((customer, i)=>{
              return (
                <CustomerCards name={customer.name ?? ""} email={customer.email ?? ""} key={i} />
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

async function CustomerTable({ name, email, id, invoices }: { name: string; email: string, id?:ObjectId, invoices?:Collection<InvoiceDoc>  }) {
  let invoiceNumbers = 0;
  const uniqueInvoices = invoices?.find({customerId:id});
  const invoiceArray = await uniqueInvoices?.toArray();
  if(uniqueInvoices){
    invoiceNumbers = invoiceArray?.length ?? 0
  }
  return (
    <tr className="even:bg-[#37B7C3]">
      <td className="tableData">{name}</td>
      <td className="tableData">{email}</td>
      <td className="tableData">{invoiceNumbers}</td>
    </tr>
  );
}

async function CustomerCards({ name, email, id, invoices }: { name: string; email: string, id?:ObjectId, invoices?:Collection<InvoiceDoc>  }){
  let invoiceNumbers = 0;
  const uniqueInvoices = invoices?.find({customerId:id});
  const invoiceArray = await uniqueInvoices?.toArray();
  if(uniqueInvoices){
    invoiceNumbers = invoiceArray?.length ?? 0
  }
  return (
    <div className="flex flex-col justify-evenly w-52 gap-2">
       <div className="border-b flex flex-col gap-1 p-2 border-gray-300">
        <p>{name}</p>
        <p>{email}</p>
       </div>
       <div className="border-b p-2 flex flex-col gap-1 border-gray-300">
           {invoiceNumbers} invoices
       </div>
    </div>
  )
}

interface InvoiceDoc{
  customerId: ObjectId
}