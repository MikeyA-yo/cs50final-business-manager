import Link from "next/link";
import { Signout, UserPlus } from "../someSvgs";

export default function SideNav() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#071952] p-4 items-center justify-between">
        <div className="nav-dash flex gap-6 flex-col ">
          <div className="bg-[#37B7C3] rounded-lg p-2">
            <h3>Revenue</h3>
            <p>Total: 9099</p>
            <p>Last Week: 9999</p>
          </div>
          <div className="bg-[#37B7C3] rounded-lg p-2"><Link href={`/dashboard/invoices`}>Invoices</Link></div>
          <div className="bg-[#37B7C3] rounded-lg p-2">
            <Link href={`/dashboard/invoices`} className="flex gap-2">Customers <UserPlus className="size-6" /></Link>
          </div>
        </div>
        <div className="bg-[#37B7C3] rounded-lg p-2">
            <Link href={`/api/auth/signout`} className="flex gap-2">Sign Out <Signout className="size-6" /></Link>
        </div>
      </div>
    </>
  );
}
