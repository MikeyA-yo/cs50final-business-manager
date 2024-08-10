import { auth } from "@/app/api/auth/auth";
import Chart, { ChartLike } from "./Charts";
import { redirect } from "next/navigation";
import { clientPromise } from "@/app/api/mongodb";
import { Montserrat } from "next/font/google";
import Infos from "./dashInfo";
import {
  isWithinAMonth,
  isWithinAWeek,
} from "@/app/api/auth/login/email/functions";
const mont = Montserrat({ weight: ["500"], subsets: ["vietnamese"] });
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
  if (!business) {
    return redirect("/register");
  }
  let data: ChartLike;
  let profitData:ChartLike;
  if (invoiceArray.length !== 0) {
    data = genData(invoiceArray, base.createDate);
    profitData = genProfitData(invoiceArray, base.createDate, Math.round(business?.capital / 7 ?? 0))
    if (business?.cycle && business.cycle === "monthly") {
      data = genDataMonth(invoiceArray, base.createDate);
      profitData = genProfitDataMonth(invoiceArray, base.createDate, business?.capital ?? 0)
    }
  } else {
    let names = business?.cycle
      ? business.cycle === "monthly"
        ? [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    data = [];
    names.forEach((name) => {
      const content = {
        name,
        amount: 0,
      };
      data.push(content);
    });
    profitData = data
  }
  return (
    <>
      <div
        className={`min-h-screen flex flex-col items-center gap-2 justify-center bg-[#EBF4F6] pb-2 w-full ${mont.className}`}
      >
        <Infos />
        <div>
          <h2 className="text-xl">
            {business?.name ?? "Your Business Name"} Analytics
          </h2>
        </div>
        <div className="flex lg:flex-row lg:justify-around lg:p-4 md:p-3 p-1 flex-col items-center gap-2 justify-center w-full">
          <div className="flex flex-col w-full">
            <h2 className="text-xl">Latest Revenue</h2>
            <div className="lg:w-96 md:w-80 lg:p-4 md:p-3  flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
              <Chart dataSet={data} />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h2 className="text-xl">Latest Profits</h2>
            <div className="lg:w-96 md:w-80 lg:p-4 md:p-3 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
              {" "}
              <Chart dataSet={profitData} />
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

function genProfitData(invoiceArray: any[], base: string, capital:number){
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
        thing.amount += filtered[i].amount - capital;
      }
    });
  }
  return data;
}

function genDataMonth(invoiceArray: any[], base: string) {
  let filtered = [];
  for (let i = 0; i < invoiceArray.length; i++) {
    if (isWithinAMonth(base, invoiceArray[i].createDate)) {
      filtered.push(invoiceArray[i]);
    }
  }
  let names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let data: { name: string; amount: number }[] = [];
  names.forEach((name) => {
    const content = {
      name,
      amount: 0,
    };
    data.push(content);
  });
  for (let i = 0; i < filtered.length; i++) {
    let dayName = filtered[i].createDate.split(" ")[1];
    data.forEach((thing) => {
      if (thing.name === dayName) {
        thing.amount += filtered[i].amount;
      }
    });
  }
  return data;
}

function genProfitDataMonth(invoiceArray: any[], base: string, capital:number){
  let filtered = [];
  for (let i = 0; i < invoiceArray.length; i++) {
    if (isWithinAMonth(base, invoiceArray[i].createDate)) {
      filtered.push(invoiceArray[i]);
    }
  }
  let names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let data: { name: string; amount: number }[] = [];
  names.forEach((name) => {
    const content = {
      name,
      amount: 0,
    };
    data.push(content);
  });
  for (let i = 0; i < filtered.length; i++) {
    let dayName = filtered[i].createDate.split(" ")[1];
    data.forEach((thing) => {
      if (thing.name === dayName) {
        thing.amount += filtered[i].amount - capital;
      }
    });
  }
  return data;
}