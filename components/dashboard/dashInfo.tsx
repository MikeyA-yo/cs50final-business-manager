import { auth } from "@/app/api/auth/auth";
import { clientPromise } from "@/app/api/mongodb";
import { redirect } from "next/navigation";

export default async function Infos() {
    const {user} = await auth();
    if(!user){
        return redirect("/login")
    }
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const invoices = db.collection("invoices");
    const collected = invoices.find({userId: user.id, status:"paid"})
    const collectedArray = await collected.toArray();
    let amountCollected = 0;
    for (let i = 0; i < collectedArray.length; i++){
        amountCollected += collectedArray[i].amount
    }
  const data = [
    { header: "Collected", amount:` ${amountCollected}` },
    { header: "Yo", amount: "b" },
    { header: "Yo", amount: "b" },
    { header: "Yo", amount: "b" },
  ];
  return (
    <>
      <div className="flex lg:flex-row flex-col gap-2 py-4 lg:w-full justify-evenly">
        {data.map((a, i) => {
          return <InfoCard header={a.header} amount={a.amount} key={i} />;
        })}
      </div>
    </>
  );
}

function InfoCard({ header, amount }: { header: string; amount: string }) {
  return (
    <div className="flex flex-col rounded p-2 bg-[#37B7C3] ">
      <div>{header}</div>
      <div className="bg-[#EBF4F6] py-4 px-8">{amount}</div>
    </div>
  );
}
