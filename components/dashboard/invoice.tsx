import { auth } from "@/app/api/auth/auth";
import { Ubuntu } from "next/font/google";
import { redirect } from "next/navigation";
import CreateInvoice from "./createInvoice";
import { clientPromise } from "@/app/api/mongodb";
import { InvoiceData } from "@/app/api/createinvoice/route";

const ubuntu = Ubuntu({weight:["500"], subsets:["latin-ext"]})
export default async function Invoices() {
  const {user} = await auth();
  if(!user){
    return redirect("/login");
  }
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const customerCol = db.collection("customers");
  const customers = (await customerCol.find({userId:user.id}).toArray()).map((c)=> ({
     name:c.name,
     email:c.email,
     id:c._id.toString(),
     userId: c.userId.toString()
  }));
  const ID = user.id.toString()
  const res = await fetch(`http://localhost:3000/api/createinvoice?id=${ID}`, {next:{revalidate:10}});
  const j:InvoiceData[] = await res.json();
  return (
    <>
      <div className={`flex flex-col items-center justify-center lg:justify-normal gap-4 w-full bg-[#EBF4F6] overflow-auto ${ubuntu.className}`}>
        <div className="p-4">
          <h3 className="text-2xl">Invoices</h3>
        </div>
        <CreateInvoice id={ID} customers={customers} />
        <div>
          <table className="lg:block md:block hidden">
            <tbody>
              {j.length > 0 && (
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              )}
              {j.length > 0 && j.map((data, i)=>{
                return (
                  <InvoiceTable data={data} key={i} />
                )
              })}
            </tbody>
          </table>
            
        </div>
      </div>
    </>
  );
}

async function InvoiceTable({data}:{data:InvoiceData}){
  return (
    <tr className="even:bg-[#37B7C3]">
      <td className="tableData">{data.customer}</td>
      <td className="tableData">{data.customerEmail}</td>
      <td className="tableData">{data.amount}</td>
      <td className="tableData">{data.createDate}</td>
      <td className="tableData">{data.status}</td>
    </tr>
  )
}
async function InvoiceCard(data:InvoiceData){}