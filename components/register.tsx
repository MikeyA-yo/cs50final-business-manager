import { Open_Sans } from "next/font/google";
import RegisterForm, { MobileReg } from "./RegisterForm";
import { clientPromise } from "@/app/api/mongodb";
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/auth";

const open = Open_Sans({ weight: ["600"], subsets: ["hebrew"] });

export default async function Register() {
  const { user } = await auth();
  if(!user){
    return redirect("/")
  }
  let userId = "";
  if (user) {
    userId = user.id.toString();
  }

  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const businesses = db.collection("businesses");
  const business = await businesses.findOne({ userId });
  if (business) {
    return redirect("/");
  }

  return (
    <>
      <div
        className={`${open.className} bg-[#37B7C3] lg:p-0 p-4 text-center items-center lg:flex-row flex-col lg:justify-normal justify-center gap-10 flex min-h-screen`}
      >
        <div className="bg-[#071952] gap-4 flex-col items-center w-full justify-evenly text-[#EBF4F6]  hidden lg:flex lg:h-screen">
          <h1 className="lg:text-3xl text-xl">Register your Business(es)</h1>
          <p>
            Complete your registration with Business Manager
            <br /> for best perfomance
          </p>
          <div className="bg-[#37B7C3] p-4 rounded">
            <p>Boost Efficiency</p>
            <p>
              {" "}
              Enhance your business efficiency and <br />
              profitability with our streamlined financial management tools.
              <br /> Reduce administrative burdens and focus on what matters
              most.
            </p>
          </div>
          <div className="bg-[#37B7C3] p-4 rounded">
            <p>Get Started</p>
            <p>
              Join our community of business owners who trust Business Manager
              <br /> for efficient profit and loss tracking.
              <br />
              Register and unlock powerful financial insights.
            </p>
          </div>
          <p> You can always edit any of this settings.</p>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col  gap-4 items-center justify-center">
            <RegisterForm userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function RegisterMobile() {
  const { user } = await auth();
  if(!user){
    return redirect("/")
  }
  let userId = "";
  if (user) {
    userId = user.id.toString();
  }
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const businesses = db.collection("businesses");
  const business = await businesses.findOne({ userId });
  if (business) {
    return redirect("/dashboard");
  }
  return (
    <>
      <MobileReg userId={userId} />
    </>
  );
}
export interface formdata {
  businessName: string;
  motive: string;
  currency: string;
  role: string;
  infrastructure: string;
}
