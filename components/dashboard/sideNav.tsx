"use client";
import Link from "next/link";
import { DashBar, Invoice, Signout, UserPlus, Wallet, XMark } from "../someSvgs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div className="lg:flex md:flex hidden flex-col min-h-screen bg-[#071952] p-8 items-center justify-between">
        <div className="nav-dash flex gap-6 flex-col ">
          <div className="bg-[#37B7C3] rounded-lg p-2">
            <h3>Revenue</h3>
            <p>Total: 9099</p>
            <p>Last Week: 9999</p>
          </div>
          <div className={`bg-[#${pathname === "/dashboard"?"EBF4F6":"37B7C3"}] rounded-lg p-2`}>
              <Link href={`/dashboard`} className="flex gap-2">
               Dashboard <Wallet className="size-6" />
              </Link>
            </div>
          <div className={`bg-[#${pathname === "/dashboard/invoices"?"EBF4F6":"37B7C3"}] rounded-lg p-2`}>
            <Link href={`/dashboard/invoices`} className="flex gap-2">
              Invoices <Invoice className="size-6" />
            </Link>
          </div>
          <div className={`bg-[#${pathname === "/dashboard/customers"?"EBF4F6":"37B7C3"}] rounded-lg p-2`}>
            <Link href={`/dashboard/customers`} className="flex gap-2">
              Customers <UserPlus className="size-6" />
            </Link>
          </div>
        </div>
        <div className="bg-[#37B7C3] rounded-lg p-2">
          <Link href={`/api/auth/signout`} className="flex gap-2">
            Sign Out <Signout className="size-6" />
          </Link>
        </div>
      </div>
      <div className="lg:hidden md:hidden flex fixed z-10 text-[#EBF4F6]">
        {!open && (
          <div
            className="m-3 bg-[#071952] p-2 rounded-full"
            onClick={() => setOpen(true)}
          >
            <Bar />
          </div>
        )}
        {open && <MobileNav onClick={() => setOpen(false)} />}
      </div>
    </>
  );
}

function Bar() {
  return (
    <>
      <motion.div
        animate={{ rotate: [270, 180, 0], opacity: [0.5, 0.8, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <DashBar className="size-6" />
        </div>
      </motion.div>
    </>
  );
}
function MobileNav({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  const pathname = usePathname();
  const variants = {
    open: { opacity: [0, 0.6, 1], x: ["-50%", 0] },
    closed: {
      opacity: [1, 0.6, 0],
      x: [0, "-50%", "-100%"],
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        transition={{ duration: 0.5 }}
        animate="open"
        exit="closed"
        className="flex flex-col h-screen bg-[#071952] p-4 items-center justify-between"
      >
        <div>
          <div onClick={onClick}>
            <XMark />
          </div>
          <div className="flex flex-col pt-1 gap-6">
            <div className="bg-[#37B7C3] rounded-lg p-2">
              <h3>Revenue</h3>
              <p>Total: 9099</p>
              <p>Last Week: 9999</p>
            </div>
            <div className={`bg-[#${pathname === "/dashboard"?"EBF4F6":"37B7C3"}] ${pathname === "/dashboard"?"text-black":""} rounded-lg p-2`}>
              <Link href={`/dashboard`} className="flex gap-2">
               Dashboard <Wallet className="size-6 text-black" />
              </Link>
            </div>
            <div className={`bg-[#${pathname === "/dashboard/invoices"?"EBF4F6":"37B7C3"}] ${pathname === "/dashboard/invoices"?"text-black":""} rounded-lg p-2`}>
              <Link href={`/dashboard/invoices`} className="flex gap-2">
                Invoices <Invoice className="size-6" />
              </Link>
            </div>
            <div className={`bg-[#${pathname === "/dashboard/customers"?"EBF4F6":"37B7C3"}] ${pathname === "/dashboard/customers"?"text-black":""} rounded-lg p-2`}>
              <Link href={`/dashboard/customers`} className="flex gap-2">
                Customers <UserPlus className="size-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#37B7C3] rounded-lg p-2">
          <Link href={`/api/auth/signout`} className="flex gap-2">
            Sign Out <Signout className="size-6" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
