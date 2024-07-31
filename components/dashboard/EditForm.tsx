"use client";

import { useEffect, useState } from "react";

export default function EditInvoice({ id }: { id: string }) {
  const [invoice, setInvoice] = useState<Invoice>();
  const [amount , setAmount] = useState("");
  const [statu, setStatu] = useState("")
  async function getInvoice() {
    try {
      const res = await fetch(`/api/editinvoice`, {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.error) {
        alert(json.error);
        return;
      }
      setInvoice(json);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateInvoice(){
    const res = await fetch(`/api/editinvoice`,{
        method:"PUT",
        body:JSON.stringify({id, amount, status:statu})
    });
    const json = await res.json()
  }
  useEffect(() => {
    getInvoice();
  }, []);
  return (
    <>
      <div className="flex min-h-screen items-center justify-center w-full">
        <form className="flex flex-col gap-2 bg-[#EBF4F6] p-4 shadow-md shadow-[#37B7C3]" onSubmit={(e)=>{
            e.preventDefault();
            if(amount.length === 0){
                setAmount(`${invoice?.amount}`);
            }
            if(statu.length === 0){
                setStatu(`${invoice?.status}`)
            }
        }}>
          {invoice && (
            <>
              <label htmlFor="amount">Edit Amount</label>
              <input
                name="amount"
                placeholder={`${invoice.amount}`}
                className="rounded p-1"
                type="number"
                onChange={(e)=>{
                    setAmount(e.target.value)
                }}
              />
              <label>Edit Status, current Status: {invoice.status}</label>
              <label className="switch">
                <input type="checkbox" required onChange={(e)=>{
                    if(e.target.checked){
                      setStatu("paid")
                    }else{
                        setStatu("pending")
                    }
                }} />
                <span className="slider" />
              </label>
              <button type="submit" className="bg-[#088395] p-2 ">
                Edit Invoice
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
