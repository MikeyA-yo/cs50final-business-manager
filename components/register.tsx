import { Open_Sans } from "next/font/google";

const open = Open_Sans({ weight: ["600"], subsets: ["hebrew"] });
export default function Register() {
  return (
    <>
      <div
        className={`${open.className} p-4 text-center items-center lg:flex-row flex-col justify-center gap-10 flex min-h-screen`}
      >
        <div>
          <h1 className="lg:text-3xl text-xl">Register your Business(es)</h1>
          <p>Complete your registration with Business Manager<br /> for best perfomance</p>
          <div className="bg-[#37B7C3]">
            <p>Boost Efficiency</p>
          </div>
          <div className="bg-[#37B7C3]"></div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <form className="flex flex-col text-[#37B7C3] items-center bg-[#071952] justify-evenly">
            <div className="flex flex-col gap-2">
              <label htmlFor="businessName">Business Name: </label>
              <input
                name="businessName"
                className="bg-[#EBF4F6] rounded-lg p-4"
                type="text"
              ></input>
            </div>
            <div className="flex flex-col p-4 gap-2">
              <label htmlFor="currency">Currency: </label>
              <input
                name="currency"
                className="bg-[#EBF4F6] rounded-lg p-4"
                type="text"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
