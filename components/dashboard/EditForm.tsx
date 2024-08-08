"use client";

import { useEffect, useState } from "react";
import { revalidate } from "./actions";
import { useRouter } from "next/navigation";
import { Spinner } from "../someSvgs";
import { Montserrat } from "next/font/google";
import { Err } from "../utilComps";

const mont = Montserrat({weight:["500"], subsets:["vietnamese"]})
export default function EditInvoice({ id }: { id: string }) {
  const [invoice, setInvoice] = useState<Invoice>();
  const [amount , setAmount] = useState("");
  const [statu, setStatu] = useState("");
  const [load, setLoad]=useState(false);
  const [err, setErr] = useState(false);
  const [errText, setErrText] = useState("Bro you messed up likely")
  const router = useRouter();
  async function getInvoice() {
    try {
        setLoad(true);
      const res = await fetch(`/api/editinvoice`, {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      setLoad(false);
      if (json.error) {
        setErr(true);
        setErrText(json.error);
        return;
      }
      setInvoice(json);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateInvoice(){
    setLoad(true);
    const res = await fetch(`/api/editinvoice`,{
        method:"PUT",
        body:JSON.stringify({id, amount, status:statu})
    });
    const json = await res.json();
    setLoad(false);
    if (json.error){
        setErr(true)
        setErrText(json.error);
        return
    }
    revalidate()
    return router.replace("/dashboard/invoices")
  }
  useEffect(() => {
    getInvoice();
  }, []);
 
  return (
    <>
      <div className={`flex min-h-screen items-center justify-center w-full ${mont.className}`}>
        <form className="flex flex-col gap-2 bg-[#EBF4F6] p-4 shadow-md shadow-[#37B7C3]" onSubmit={(e)=>{
            e.preventDefault();
        }}>
          {err && <Err message={errText} onClick={()=>setErr(false)} />}
          {load && <Spinner className="animate-spin size-8" />}
          {invoice && (
            <>
              <label htmlFor="amount">Edit Amount, current amount: {invoice.amount}</label>
              <input
                name="amount"
                placeholder={`${invoice.amount}`}
                className="rounded p-1"
                type="number"
                onChange={(e)=>{
                    if(amount.length === 0){
                        setAmount(`${invoice?.amount}`);
                    }
                    if(statu.length === 0){
                        setStatu(`${invoice?.status}`)
                    }
                    setAmount(e.target.value)
                }}
              />
              <label>Edit Status, current status: {invoice.status}</label>
              <label className="switch">
                <input type="checkbox" required onChange={(e)=>{
                     if(amount.length === 0){
                        setAmount(`${invoice?.amount}`);
                    }
                    if(e.target.checked){
                      setStatu("paid")
                    }else{
                        setStatu("pending")
                    }
                }} />
                <span className="slider" />
              </label>
              <button type="submit" className="bg-[#088395] p-2 flex gap-1 items-center justify-center" onClick={()=>{
                   updateInvoice();
              }}>
                Edit Invoice {load && <Spinner className="animate-spin size-8" />}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

interface Invoice {
  _id: string;
  amount: number;
  status: string;
  userId: string;
  customerId: string;
  createDate: string;
}
