import { auth } from "@/app/api/auth/auth";
import Chart, { ChartLike } from "./Charts";
import { redirect } from "next/navigation";
import { clientPromise } from "@/app/api/mongodb";
import { Montserrat } from "next/font/google";
import Infos from "./dashInfo";
import {
  isWithinAWeek,
  stringDateToYearDays,
} from "@/app/api/auth/login/email/functions";
const mont = Montserrat({ weight: ["500"], subsets: ["vietnamese"] });
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
  const { user } = await auth();
  if (!user) {
    return redirect("/login");
  }
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const businesses = db.collection("businesses");
  const invoices = db.collection("invoices");
  const invoicesUnique = invoices.find({ userId: user.id });
  const invoiceArray = await invoicesUnique.toArray();
  const base = invoiceArray.slice(-1)[0];
  const business = await businesses.findOne({ userId: user.id.toString() });
  let data: ChartLike;
  if (invoiceArray.length !== 0) {
    data = genData(invoiceArray, base.createDate);
  } else {
    let names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    data = [];
    names.forEach((name) => {
      const content = {
        name,
        amount: 0,
      };
      data.push(content);
    });
  }

  if (!business) {
    return redirect("/register");
  }
  return (
    <>
      <div
        className={`min-h-screen flex flex-col items-center gap-2 justify-center bg-[#EBF4F6] w-full ${mont.className}`}
      >
        <Infos />
        <div>
          <h2 className="text-xl">
            {business?.name ?? "Your Business Name"} Analytics
          </h2>
        </div>
        <div className="flex lg:flex-row lg:justify-around flex-col items-center gap-2 justify-center w-full">
          <div className="flex flex-col">
            <h2 className="text-xl">Revenue</h2>
            <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
              <Chart dataSet={data} />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl">Profits</h2>
            <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
              {" "}
              <Chart dataSet={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function genData(invoiceArray: any[], base: string) {
  let filtered = [];
  for (let i = 0; i < invoiceArray.length; i++) {
    if (isWithinAWeek(base, invoiceArray[i].createDate)) {
      filtered.push(invoiceArray[i]);
    }
  }
  let names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let data: { name: string; amount: number }[] = [];
  names.forEach((name) => {
    const content = {
      name,
      amount: 0,
    };
    data.push(content);
  });
  for (let i = 0; i < filtered.length; i++) {
    let dayName = filtered[i].createDate.split(" ")[0];
    data.forEach((thing) => {
      if (thing.name === dayName) {
        thing.amount += filtered[i].amount;
      }
    });
  }
  return data;
}
