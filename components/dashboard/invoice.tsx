import { auth } from "@/app/api/auth/auth";
import { Ubuntu } from "next/font/google";
import { redirect } from "next/navigation";
import CreateInvoice, { DeleteInvoice } from "./createInvoice";
import { clientPromise } from "@/app/api/mongodb";
import { InvoiceData } from "@/app/api/createinvoice/route";
import { Clock, Edit, Tick } from "../someSvgs";
import Link from "next/link";

const ubuntu = Ubuntu({ weight: ["500"], subsets: ["latin-ext"] });
export default async function Invoices() {
  const { user } = await auth();
  if (!user) {
    return redirect("/login");
  }
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const customerCol = db.collection("customers");
  const businesses = db.collection("businesses");
  const invoices = db.collection("invoices");
  const buisness = await businesses.findOne({ userId: user.id.toString() });
  if (!buisness) {
    return redirect("/register");
  }
  const customers = (await customerCol.find({ userId: user.id }).toArray()).map(
    (c) => ({
      name: c.name,
      email: c.email,
      id: c._id.toString(),
      userId: c.userId.toString(),
    })
  );
  const ID = user.id.toString();
  const res = await fetch(`http://localhost:3000/api/createinvoice?id=${ID}`);
  const j: InvoiceData[] = await res.json();
  const sign = buisness.currency === "naira" ? "₦" : "$";
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center lg:justify-normal gap-4 w-full bg-[#EBF4F6] overflow-auto ${ubuntu.className}`}
      >
        <div className="p-4">
          <h3 className="text-2xl">Invoices</h3>
        </div>
        <CreateInvoice id={ID} customers={customers} />
        <div className="flex flex-col gap-2 items-center">
          <table className="lg:block md:block hidden">
            <tbody>
              {j.length > 0 && (
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Amount ({sign})</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              )}
              {j.length > 0 &&
                j.toReversed().map((data, i) => {
                  return <InvoiceTable data={data} key={i} />;
                })}
            </tbody>
          </table>
          {j.length === 0 && (
            <h3>No Invoices here, create one to see them appear</h3>
          )}
          {j.length > 0 && (
            <div className="lg:hidden md:hidden flex flex-col justify-center bg-[#088395] gap-2 p-2 rounded">
              {j.length > 0 &&
                j.toReversed().map((data, i) => {
                  return <InvoiceCard data={data} key={i} sign={sign} />;
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

async function InvoiceTable({ data }: { data: InvoiceData }) {
  return (
    <tr className="even:bg-[#37B7C3]">
      <td className="tableData">{data.customer}</td>
      <td className="tableData">{data.customerEmail}</td>
      <td className="tableData">{data.amount}</td>
      <td className="tableData">{data.createDate}</td>
      <td className="tableData">
        {data.status}{" "}
        {data.status === "paid" ? (
          <Tick className="size-6" />
        ) : (
          <Clock className="size-6" />
        )}
      </td>
      <td className="items-center justify-center py-2 px-4  flex gap-1">
        <Link href={`/dashboard/invoices/${data.id}/edit`}>
          <Edit className="size-8 p-1 border-2 rounded" />
        </Link>
        <DeleteInvoice id={data.id} />
      </td>
    </tr>
  );
}
async function InvoiceCard({
  data,
  sign,
}: {
  data: InvoiceData;
  sign?: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-2 rounded w-auto justify-evenly bg-[#37B7C3]">
      <div className="flex border-b justify-between gap-2 p-2 border-gray-300">
        <div className="flex flex-col gap-1">
          <p>{data.customer}</p>
          <p>{data.customerEmail}</p>
        </div>
        <p>{data.status}</p>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex flex-col gap-1">
          <p>
            {sign}
            {data.amount}
          </p>
          <p>{data.createDate}</p>
        </div>
        <div className="flex gap-1">
          <Edit className="size-8 p-1 border-2 rounded" />
          <DeleteInvoice id={data.id} />
        </div>
      </div>
    </div>
  );
}
{
  /* <Link
          href={{
            pathname: "/api/deleteinvoice",
            query: { id: data.id },
          }}
        >
          <Delete className="size-8 p-1 border-2 rounded" />
        </Link> */
}
