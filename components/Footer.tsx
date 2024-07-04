import { Oxygen } from "next/font/google";
import Link from "next/link";

const oxy = Oxygen({ weight: ["700"], subsets: ["latin"] });

function Mail() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    </>
  );
}

function Phone() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    </>
  );
}

export default function Footer() {
  return (
    <>
      <div
        className={`${oxy.className} justify-evenly py-16 text-[#EBF4F6] flex lg:flex-row items-center  md:flex-row gap-4 flex-col bg-[#071952]`}
      >
        <div className="flex gap-3 flex-col">
          <h3 className="text-2xl text-center">Contact:</h3>
          <p className="flex gap-1">
            <Phone /> +234 808 913 2385
          </p>
          <Link className="flex gap-1" href={"mailto:ayomideoluwatola1@gmail.com"}><Mail /> ayomideoluwatola1@gmail.com</Link>
        </div>
        <div className="text-center">
        <h3 className="text-2xl">Info:</h3>
        <p>We do not share any business invoices with <br />any company or organization,<br/> for more info contact me </p>
        </div>
        <div className="flex flex-col gap-2">
        <h3 className="text-2xl text-center">Links</h3>
        <Link href={'/'}>Home</Link>
        <Link href={'/login'}>Login</Link>
        <Link href={'#about'}>About</Link>
        </div>
      </div>
      <p className="text-center p-2">&copy; {new Date().getFullYear()} Business Manager</p>
    </>
  );
}
