import { auth } from "@/app/api/auth/auth";
import Chart from "./Charts";
import { redirect } from "next/navigation";
import { clientPromise } from "@/app/api/mongodb";
const defaultIncome = [
  {
    name: "A",
    in: 8000,
    out: 3500,
  },
  {
    name: "B",
    in: 7500,
    out: 4500,
  },
  {
    name: "C",
    in: 6000,
    out: 6500,
  },
  {
    name: "D",
    in: 8000,
    out: 3500,
  },
];
export default async function Dashboard() {
  const {user} = await auth();
  if(!user){
    return redirect("/login")
  }
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const businesses = db.collection("businesses");
  const business = await businesses.findOne({userId: user.id.toString()});
  if(!business){
     return redirect("/register")
  }
  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-2 justify-center bg-[#EBF4F6] w-full">
        <div>
          <h2 className="text-xl">{business?.name ?? "Your Business Name"} Analytics</h2>
        </div>
        <div className="flex lg:flex-row lg:justify-around flex-col items-center gap-2 justify-center w-full">
          <div className="flex flex-col">
            <h2 className="text-xl">Expenditures</h2>
            <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
              <Chart dataSet={defaultIncome} />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl">In and Outs</h2>
            <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
              {" "}
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
