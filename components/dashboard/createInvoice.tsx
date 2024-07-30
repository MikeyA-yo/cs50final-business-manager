"use client";
import { useState } from "react";
import { Delete, Invoice } from "../someSvgs";
import { InvoiceData } from "@/app/api/createinvoice/route";
import { Comp, Err } from "../utilComps";
import { revalidate } from "./actions";

export default function CreateInvoice({
  id,
  customers,
}: {
  id: string;
  customers: any[];
}) {
  const [form, setForm] = useState(false);
  const [customerValue, setCustomerValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<"pending" | "paid">("pending");
  const [err, setErr] = useState(false);
  const [comp, setComp] = useState(false);
  const [errText, setErrText] = useState("Something went wrong");
  const [compText, setCompText] = useState("Created Invoice")
  type InvoiceCreation = Pick<InvoiceData, "amount" | "status">;
  interface Invoice extends InvoiceCreation {
    userID: string;
    customerID: string;
  }
  async function Create(data: Invoice) {
    try {
      const res = await fetch("/api/createinvoice", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.error){
        setErr(true);
        setErrText(json.error);
        return
      }
      revalidate();
      setForm(false);
      setComp(true);
    } catch (e) {
        setErr(true)
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        {err && <Err message={errText} onClick={()=>setErr(false)}/>}
        {comp && <Comp message={compText} onClick={()=>setComp(false)} />}
        <p
          className="flex gap-2 cursor-pointer bg-[#088395] p-2 rounded"
          onClick={() => setForm(!form)}
        >
          Create Invoice <Invoice className="size-6" />
        </p>
        {form && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if(customerValue.length < 6){
                    setErr(true);
                    setErrText("Customer not provided")
                    return;
                }
              }}
            >
              <div className="flex flex-col bg-[#37B7C3] p-4  gap-2 items-center">
                <p>Select a Customer</p>
                <select
                  className="p-2 w-52 rounded"
                  onChange={(e) => {
                    setCustomerValue(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>Select Customer</option>
                  {customers.map((customer, i) => {
                    return (
                      <option key={i} value={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
                <p>Choose an Amount</p>
                <input
                  type="number"
                  className="rounded w-52"
                  onChange={(e) => {
                    setAmount(parseInt(e.target.value));
                  }}
                  required
                />
                <div>
                  <p className="text-center">Paid ?</p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setStatus("paid");
                        } else {
                          setStatus("pending");
                        }
                      }}
                      required
                    />
                    <span className="slider" />
                  </label>
                </div>
                <button type="submit" onClick={()=>{
                    let data = {
                        amount,
                        status,
                        userID: id,
                        customerID: customerValue,
                      };
                      if(customerValue.length < 6){
                          setErr(true);
                          setErrText("Customer not provided")
                          return;
                      }
                      Create(data);
                }} className="bg-[#EBF4F6] p-2 rounded">
                  Create Invoice
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
//ptoentially good input class: bg-inherit outline-none border-b border-b-[#EBF4F6]
export function DeleteInvoice({id}:{id:string}){
  async function deleteInvoice(){
    const res = await fetch(`http://localhost:3000/api/deleteinvoice?id=${id}`);
    const json = await res.json();
     if(json.error){
      alert(json.error)
      return
     }
    revalidate()
  }
  return (
    <div className="cursor-pointer" onClick={()=>{
      deleteInvoice()
    }}>
      <Delete className="size-8 p-1 border-2 rounded" />
    </div>
  )
}