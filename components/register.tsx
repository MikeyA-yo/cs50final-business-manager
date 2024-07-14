"use client";
import { Open_Sans } from "next/font/google";
import { useState } from "react";

const open = Open_Sans({ weight: ["600"], subsets: ["hebrew"] });
function RegisterBusiness({name, currency, profitMotive, infrastructure, role, userId}:{name:string, currency:string, profitMotive:string, infrastructure:string, role:string, userId:string}){

}
export default function Register({userId}:{userId?:string}) {
  
   const [data, setData] = useState<formdata>({
    businessName:"",
    motive:"",
    infrastructure:"physical",
    currency:"naira",
    role:"employer",
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
              <br /> for efficient profit and loss tracking.<br />Register and unlock
              powerful financial insights.
            </p>
          </div>
          <p> You can always edit any of this settings.</p>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col items-center justify-center">
            <form className="flex flex-col text-[#37B7C3] items-center p-4 bg-[#071952] justify-evenly">
              <div className="flex flex-col gap-2">
                <label htmlFor="businessName">Business Name: </label>
                <input
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
                <select onChange={handleSelectChange} name="currency" className="bg-[#EBF4F6] w-60 rounded-lg p-4">
                  <option value={`naira`}>Naira </option>
                  <option value={`dollars`}>Dollars </option>
                </select>
              </div>
              <div className="flex flex-col p-4 gap-2">
                 <label htmlFor="infrastructure">Primary Infrastructure Type:</label>
                 <select name="infrastructure" onChange={handleSelectChange} className="bg-[#EBF4F6] w-60 rounded-lg p-4">
                    <option value={`physical`}>Physical</option>
                    <option value={`technology`}>Technology</option>
                 </select>
              </div>
              <div className="flex flex-col p-4 gap-2">
                <label htmlFor="motive">Profit Motive</label>
                <input onChange={handleChange} type="text" name="motive" placeholder="What is your simple business profit motive?" className="bg-[#EBF4F6] w-60 rounded-lg p-4" />
              </div>
              <div className="flex flex-col p-4 gap-2">
                <label htmlFor="role">Role? (employer or employee)</label>
                <select name="role" onChange={handleSelectChange} className="bg-[#EBF4F6] w-60 rounded-lg p-4">
                    <option value={`employer`}>Business Owner (Employer)</option>
                    <option value={`employee`}>Worker (Employee)</option>
                    <option value={`freelancer`}>Freelancer</option>
                 </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

interface formdata{
  businessName:string,
  motive:string,
  currency:string,
  role:string,
  infrastructure:string,
}