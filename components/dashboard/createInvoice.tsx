"use client";
import { useState } from "react";
import { Invoice } from "../someSvgs";

export default function CreateInvoice({ id }: { id: string }) {
    const [form, setForm] = useState(false)
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="flex gap-2 cursor-pointer bg-[#088395] p-2 rounded" onClick={()=> setForm(!form)}>
          Create Invoice <Invoice className="size-6" />
        </p>
        {form && (
            <>
              <div>
                <p>Select a Customer</p>
              </div>
            </>
        )}
      </div>
    </>
  );
}
