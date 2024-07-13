import { Open_Sans } from "next/font/google";

const open = Open_Sans({ weight: ["600"], subsets: ["hebrew"] });
export default function Register() {
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
              <br /> for efficient profit and loss tracking.<br /> Sign up and unlock
              powerful financial insights.
            </p>
          </div>
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
                />
              </div>
              <div className="flex flex-col p-4 gap-2">
                <label htmlFor="currency">Currency: </label>
                <select name="currency" className="bg-[#EBF4F6] w-60 rounded-lg p-4">
                  <option value={`naira`}>Naira </option>
                  <option value={`dollars`}>Dollars </option>
                </select>
              </div>
              <div className="flex flex-col p-4 gap-2">
                 <label htmlFor="Infrastructure">Infrastructure Type:</label>
                 <input className="bg-[#EBF4F6] w-60 rounded-lg p-4" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
