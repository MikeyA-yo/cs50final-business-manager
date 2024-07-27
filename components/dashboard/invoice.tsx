import { auth } from "@/app/api/auth/auth";
import { Ubuntu } from "next/font/google";
import { redirect } from "next/navigation";
import CreateInvoice from "./createInvoice";

const ubuntu = Ubuntu({weight:["500"], subsets:["latin-ext"]})
export default async function Invoices() {
  const {user} = await auth();
  if(!user){
    return redirect("/login");
  }
  const ID = user.id.toString()
  const res = await fetch(`http://localhost:3000/api/createinvoice?id=${ID}`, {next:{revalidate:10}});
  const j = await res.json();
  return (
    <>
      <div className={`flex flex-col items-center w-full bg-[#EBF4F6] overflow-auto ${ubuntu.className}`}>
        <div className="p-4">
          <h3 className="text-2xl">Invoices</h3>
        </div>
        <CreateInvoice id={ID} />
        <div>
            
        </div>
      </div>
    </>
  );
}
