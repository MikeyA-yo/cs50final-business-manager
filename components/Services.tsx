import { Montserrat, Ubuntu } from "next/font/google";
import Image from "next/image";

const mont = Montserrat({ weight: ["600"], subsets: ["vietnamese"] });
const ub = Ubuntu({ weight: ["500"], subsets: ["latin"] });
export default function Services() {
  return (
    <>
      <div className="flex lg:p-10 md:p-8 p-4 items-center justify-evenly flex-col">
        <div
          className={`flex flex-col ${ub.className} lg:gap-2 md:gap-2 flex-wrap gap-4 items-center justify-center`}
        >
          <h2 className={`text-3xl ${mont.className}`}>
            Our <span className="text-[#37B7C3]">Services</span>
          </h2>
          <p className={mont.className}>
            Some of our various services includes:
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center text-center justify-evenly lg:flex-row md:flex-row">
          <div className="bg-[#EBF4F6] flex flex-col gap-2 items-center justify-center p-2">
            <Image
              src={"/w1.png"}
              alt="img of services"
              width={150}
              height={150}
              className=""
            />
            <h3 className={`text-2xl ${mont.className}`}>Expense Tracking</h3>
            <p>
              Discover how our application helps you achieve greater
              profitability by providing tools to track income and expenses
              accurately. Minimize your losses with precise financial
              management.
            </p>
          </div>
          <div className="bg-[#EBF4F6] flex flex-col gap-2 items-center justify-center p-2">
            <Image
              src={"/s3.png"}
              alt="img of services"
              width={150}
              height={150}
              className=""
            />
            <h3 className={`text-2xl ${mont.className}`}>
              Real-Time Financial Tracking
            </h3>
            <p>
              Stay updated with real-time financial data by entering your
              expenses and revenues. Monitor your business&apos;s financial health
              with up-to-the-minute tracking of profits and losses, ensuring you
              have a clear view of your financial status at all times
            </p>
          </div>
          <div className="bg-[#EBF4F6] flex flex-col gap-2 items-center justify-center p-2">
            <Image
              src={"/w3.png"}
              alt="img of services"
              width={150}
              height={150}
              className=""
            />
            <h3 className={`text-2xl ${mont.className}`}>Unlock Growth</h3>
            <p>
              Leverage smart profit and loss management features to unlock new
              growth opportunities. Our application provides the tools you need
              to optimize your financial strategies and achieve sustained
              growth.
            </p>
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
  );
}
