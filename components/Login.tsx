import Image from "next/image";
import { Inter } from "next/font/google";
import { auth } from "@/app/api/auth/auth";
import EmailSignIn from "./emailsignin";
import { redirect } from "next/navigation";
import GmailLogin from "./gmailLogin";

const inter = Inter({ weight: ["500"], subsets: ["vietnamese"] });
export default async function Login() {
  const { user } = await auth();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div
        className={`flex bg-[#071952] items-center justify-center min-h-[100svh] ${inter.className}`}
      >
        <div className="lg:flex flex-col md:flex hidden items-center w-full justify-center ">
          <Image
            src={`/finance.svg`}
            alt="random alt"
            width={400}
            height={400}
          />
        </div>
        <div className="h-screen w-full lg:gap-2 md:gap-2 gap-4 flex lg:flex-row md:flex-row flex-col items-center justify-center bg-[#EBF4F6] ">
          <GmailLogin />
          <EmailSignIn />
        </div>
      </div>
    </>
  );
}
