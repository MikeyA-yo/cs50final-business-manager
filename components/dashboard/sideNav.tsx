"use client"
import Link from "next/link";
import { DashBar, Invoice, Signout, UserPlus, XMark } from "../someSvgs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SideNav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="lg:flex md:flex hidden flex-col min-h-screen bg-[#071952] p-8 items-center justify-between">
        <div className="nav-dash flex gap-6 flex-col ">
          <div className="bg-[#37B7C3] rounded-lg p-2">
            <h3>Revenue</h3>
            <p>Total: 9099</p>
            <p>Last Week: 9999</p>
          </div>
          <div className="bg-[#37B7C3] rounded-lg p-2"><Link href={`/dashboard/invoices`} className="flex gap-2">Invoices <Invoice className="size-6" /></Link></div>
          <div className="bg-[#37B7C3] rounded-lg p-2">
            <Link href={`/dashboard/invoices`} className="flex gap-2">Customers <UserPlus className="size-6" /></Link>
          </div>
        </div>
        <div className="bg-[#37B7C3] rounded-lg p-2">
            <Link href={`/api/auth/signout`} className="flex gap-2">Sign Out <Signout className="size-6" /></Link>
        </div>
      </div>
      <div className="lg:hidden md:hidden flex fixed z-10 text-[#EBF4F6]">
        {!open && <div className="m-3 bg-[#071952] p-2 rounded-full" onClick={()=>setOpen(true)}><DashBar className="size-6" /></div>}
        {open && <MobileNav onClick={()=>setOpen(false)} />}
      </div>
    </>
  );
}
function MobileNav({onClick}:{onClick:React.MouseEventHandler<HTMLDivElement>}){
  return (
    <AnimatePresence>
      <motion.div className="flex flex-col min-h-screen bg-[#071952] p-8  items-center justify-between">
         <div onClick={onClick}>
          <XMark />
         </div>
      </motion.div>
    </AnimatePresence>
  )
}