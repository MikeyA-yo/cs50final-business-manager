import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({weight:["500"], subsets:["latin-ext"]})
export default function Invoices() {
  return (
    <>
      <div className={`flex flex-col w-full bg-[#EBF4F6] overflow-auto ${ubuntu.className}`}>
        <div className="p-4">
          <h3 className="text-2xl">Invoices</h3>
        </div>
        <div>
            
        </div>
      </div>
    </>
  );
}
