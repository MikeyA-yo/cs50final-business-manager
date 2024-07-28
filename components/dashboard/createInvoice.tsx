"use client";
import { useState } from "react";
import { Invoice } from "../someSvgs";
import { InvoiceData } from "@/app/api/createinvoice/route";

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
        next: { revalidate: 10 },
      });
      const json = await res.json();
    } catch (e) {}
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
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
                let data = {
                  amount,
                  status,
                  userID: id,
                  customerID: customerValue,
                };
                Create(data);
              }}
            >
              <div className="flex flex-col bg-[#37B7C3] p-4  gap-2 items-center">
                <p>Select a Customer</p>
                <select
                  className="p-2 w-52 rounded"
                  onChange={(e) => {
                    setCustomerValue(e.target.value);
                  }}
                >
                  <option disabled>Select Customer</option>
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
                />
                <div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                </div>
                <button type="submit" className="bg-[#EBF4F6] p-2 rounded">
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
