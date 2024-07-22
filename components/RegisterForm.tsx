"use client";
import { useState } from "react";
import { formdata } from "./register";
import { Spinner } from "./someSvgs";
import { useRouter } from "next/navigation";
async function submitForm(data:formdata, userId?:string, router?:any){
  if(typeof userId === "string" && userId.length < 8){
     return
  }
  const {motive, infrastructure, currency,role} = data;
  const name = data.businessName;
  const body = {
    name,
    motive,
    infrastructure,
    currency,
    role,
    userId
  }
  const bodyJson = JSON.stringify(body);
  const res = await fetch("/api/register",{
    method:"POST",
    body:bodyJson
  });
  const result = await res.json();
  if(result.error){
    console.log(result.error);
    return;
  }
  console.log(result.message);
  router.replace("/")
  return 
}
export default function RegisterForm({userId}:{userId?:string}) {
  const router = useRouter()
  const [isLoading, setIsLoadig] = useState(false);
  const [data, setData] = useState<formdata>({
    businessName: "",
    motive: "",
    infrastructure: "physical",
    currency: "naira",
    role: "employer",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <form onSubmit={(e)=>{
        e.preventDefault()
        if(data.businessName.length > 10 || data.motive.length > 25 ){
          alert("Business Name or Motive too long (btw if github sometimes uses alert why can't i?)")
          return
        }
        submitForm(data, userId, router)
      }} className="flex flex-col text-[#37B7C3] items-center p-4 bg-[#071952] justify-evenly">
        <div className="flex flex-col gap-2">
          <label htmlFor="businessName">Business Name: </label>
          <input
            required
            name="businessName"
            className="bg-[#EBF4F6] w-60 rounded-lg p-4"
            autoComplete="off"
            type="text"
            placeholder="Your Business Name"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col p-4 gap-2">
          <label htmlFor="currency">Currency: </label>
          <select
            required
            onChange={handleSelectChange}
            name="currency"
            className="bg-[#EBF4F6] w-60 rounded-lg p-4"
          >
            <option value={`naira`}>Naira </option>
            <option value={`dollars`}>Dollars </option>
          </select>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <label htmlFor="infrastructure">Primary Infrastructure Type:</label>
          <select
            required
            name="infrastructure"
            onChange={handleSelectChange}
            className="bg-[#EBF4F6] w-60 rounded-lg p-4"
          >
            <option value={`physical`}>Physical</option>
            <option value={`technology`}>Technology</option>
          </select>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <label htmlFor="motive">Profit Motive</label>
          <input
            required
            onChange={handleChange}
            type="text"
            name="motive"
            placeholder="What is your simple business profit motive?"
            className="bg-[#EBF4F6] w-60 rounded-lg p-4"
          />
        </div>
        <div className="flex flex-col p-4 gap-2">
          <label htmlFor="role">Role? (employer or employee)</label>
          <select
            required
            name="role"
            onChange={handleSelectChange}
            className="bg-[#EBF4F6] w-60 rounded-lg p-4"
          >
            <option value={`employer`}>Business Owner (Employer)</option>
            <option value={`employee`}>Worker (Employee)</option>
            <option value={`freelancer`}>Freelancer</option>
          </select>
        </div>
        <div className="bg-[#37B7C3] text-[#071952] p-2 rounded-lg">
          <button type="submit" className="flex gap-1" onClick={()=>{
            setIsLoadig(true)
          }}>Register Business {isLoading && <Spinner className="animate-spin size-8" />}</button>
        </div>
      </form>
    </>
  );
}
function MobileRegForm({userId}:{userId?:string}) {
  return (
    <>
      <div className="min-h-screen bg-[#37B7C3] flex items-center justify-center p-4">
        <RegisterForm userId={userId} />
      </div>
    </>
  );
}
export function MobileReg({userId}:{userId?:string}) {
  const [cleared, setCleared] = useState("");
  return (
    <>
      <div
        className={`bg-[#071952] min-h-screen ${cleared} p-4 text-center gap-4 flex-col items-center justify-evenly text-[#EBF4F6] flex`}
      >
        <h1 className="lg:text-3xl text-xl">Register your Business(es)</h1>
        <p>
          Complete your registration with Business Manager
          <br /> for best perfomance
        </p>
        <div className="bg-[#37B7C3]  rounded">
          <p>Boost Efficiency</p>
          <p>
            {" "}
            Enhance your business efficiency and <br />
            profitability with our streamlined financial management tools.
            <br /> Reduce administrative burdens and focus on what matters most.
          </p>
        </div>
        <div className="bg-[#37B7C3]  rounded">
          <p>Get Started</p>
          <p>
            Join our community of business owners who trust Business Manager
            <br /> for efficient profit and loss tracking.
            <br />
            Register and unlock powerful financial insights.
          </p>
        </div>
        <p> You can always edit any of this settings.</p>
        <button
          className="bg-[#37B7C3] p-2 rounded"
          onClick={() => {
            setCleared("hidden");
          }}
        >
          Continue &gt;
        </button>
      </div>
      {cleared === "hidden" ? <MobileRegForm userId={userId} /> : <></>}
    </>
  );
}