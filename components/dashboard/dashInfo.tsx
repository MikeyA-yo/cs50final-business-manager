import { auth } from "@/app/api/auth/auth";
import { clientPromise } from "@/app/api/mongodb";
import { redirect } from "next/navigation";
import { Dollars, Naira } from "../someSvgs";

export default async function Infos() {
    const {user} = await auth();
    if(!user){
        return redirect("/login")
    }
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const invoices = db.collection("invoices");
    const businesses = db.collection("businesses");
    const business = await businesses.findOne({userId: user.id.toString()});
    if(!business){
        return redirect("/register");
    }
    const sign = business.currency === "naira" ? <Naira className="size-6" /> : <Dollars className="size-6" />;
    const collected = invoices.find({userId: user.id, status:"paid"});
    const pending = invoices.find({userId: user.id, status:"pending"});
    const collectedArray = await collected.toArray();
    const pendingArray = await pending.toArray();
    const capital = business.capital ?? 0;
    let amountCollected = 0;
    for (let i = 0; i < collectedArray.length; i++){
        amountCollected += collectedArray[i].amount
    }
    let amountPending = 0;
    for (let i = 0; i < pendingArray.length; i++){
        amountPending += pendingArray[i].amount
    }
  const data = [
    { header: "Collected", amount:` ${amountCollected}` },
    { header: "Pending", amount: `${amountPending}` },
    { header: "Total", amount: `${amountCollected + amountPending}` },
    { header: "Profit", amount:`${(amountCollected + amountPending) - (capital*collectedArray.length)}` },
  ];
  return (
    <>
      <div className="flex lg:flex-row md:flex-row flex-wrap flex-col gap-2 py-4 lg:w-full justify-evenly">
        {data.map((a, i) => {
          return <InfoCard header={a.header} amount={a.amount} key={i} sign={sign} />;
        })}
      </div>
    </>
  );
}

function InfoCard({ header, amount, sign }: { header: string; amount: string, sign:JSX.Element }) {
  return (
    <div className="flex flex-col rounded p-2 text-xl bg-[#37B7C3] ">
      <div>{header}</div>
      <div className="bg-[#EBF4F6] py-4 px-8 flex gap-1">{sign}{amount}</div>
    </div>
  );
}
