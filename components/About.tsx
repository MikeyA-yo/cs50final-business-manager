import { Montserrat, Ubuntu } from "next/font/google";
import Image from "next/image";

const ubuntu = Ubuntu({ weight: ["700"], subsets: ["latin"] });
const mont = Montserrat({ weight: ["600"], subsets: ["vietnamese"] });
export default function About() {
  return (
    <>
      <div id="about" className="bg-[#071952] text-[#EBF4F6]">
        <div className="flex flex-col items-center justify-center text-center pt-10 gap-4">
          <h2 className="text-3xl">
            About <span className="text-[#088395]">Us</span>
          </h2>
          <p className={`${ubuntu.className} text-xl`}>
            {" "}
            Empowering Businesses with Simple, Effective Financial Management
            Solutions.
          </p>
        </div>
        <div className="flex items-center lg:flex-row flex-col gap-4 p-8 justify-center">
          <div>
            <Image
              src={`/about-img.png`}
              alt="about image"
              height={350}
              width={350}
            />
          </div>
          <div className={mont.className}>
            Welcome to Business Manager, where we make financial management easy
            and efficient for businesses of all sizes.<br /> Our mission is to empower
            business owners and managers with tools to track profits and losses,
            make informed decisions, and drive growth.<br /> We offer an intuitive
            platform for entering and monitoring expenses and revenues, designed
            to be user-friendly and accessible.<br /> Whether you’re a small startup
            or managing multiple clients, our solution provides detailed
            insights and real-time data to help you stay on top of your
            financial health.<br /> At Business Manager, we prioritize exceptional
            service and support, ensuring you get the most out of our platform.<br />
            Experience the difference with us – where your financial health is
            our priority
          </div>
        </div>
      </div>
    </>
  );
}
