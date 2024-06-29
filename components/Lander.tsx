import { Montserrat, Oswald, Ubuntu } from "next/font/google";

const mont = Montserrat({ weight: ["600"], subsets: ["vietnamese"] });
const oswald = Oswald({ weight: ["600"], subsets: ["vietnamese"] });
const ubuntu = Ubuntu({ weight: ["500"], subsets: ["latin"] })
export default function Lander() {
  return (
    <>
      <div className="bg-[#071952]   before:-bottom-7 before:rounded-[50%] h-screen flex items-center justify-center lg:flex-row md:flex-row flex-col">
        <div className={`text-[#EBF4F6] text-center ${oswald.className} px-10`}>
          <h1 className={`text-4xl py-4 ${mont.className}`}>
            Streamline Your Finances
          </h1>
          <p className={`py-4 ${ubuntu.className}`}>
            Simplify your business operations with our intuitive platform.
            Generate custom invoices for different companies and track your
            earnings with ease. Stay on top of your financial game with our
            comprehensive monitoring tools
          </p>
          <button className="bg-[#37B7C3] py-2 px-4"> Get Started</button>
        </div>
      </div>
    </>
  );
}
