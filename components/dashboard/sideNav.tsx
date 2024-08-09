"use client";
import Link from "next/link";
import { DashBar, Gear, Invoice, Signout, UserPlus, Wallet, XMark } from "../someSvgs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SideNav({userProps}:{userProps:{name:string, image:string}}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const image = userProps.image.length > 2 ? userProps.image : "/Avatar.png"
  return (
    <>
      <div className="lg:flex md:flex hidden flex-col min-h-screen bg-[#071952] p-8 items-center justify-between">
        <div className="nav-dash flex gap-6 flex-col ">
          <div className={`bg-[#${pathname === "/dashboard/settings"?"EBF4F6":"37B7C3"}] rounded-lg p-2 flex flex-col gap-2`}>
            <Link href={`/dashboard/settings`} className=" flex flex-col gap-2">
            <h3 className="flex gap-1 justify-between">Settings <Gear className="size-6" /></h3>
            <p className="flex gap-1">{userProps.name} <Image src={image} alt="Image of you" height={45} width={45} className="rounded-full" /></p>
            </Link>
          </div>
          <div className={`bg-[#${pathname === "/dashboard"?"EBF4F6":"37B7C3"}] rounded-lg p-2`}>
              <Link href={`/dashboard`} className="flex gap-2 items-center justify-center">
               Dashboard <Wallet className="size-6" />
              </Link>
            </div>
          <div className={`bg-[#${pathname === "/dashboard/invoices"?"EBF4F6":"37B7C3"}] rounded-lg p-2`}>
            <Link href={`/dashboard/invoices`} className="flex gap-2 items-center justify-center">
              Invoices <Invoice className="size-6" />
            </Link>
          </div>
          <div className={`bg-[#${pathname === "/dashboard/customers"?"EBF4F6":"37B7C3"}] rounded-lg p-2`}>
            <Link href={`/dashboard/customers`} className="flex gap-2 items-center justify-center">
              Customers <UserPlus className="size-6" />
            </Link>
          </div>
        </div>
        <div className="bg-[#37B7C3] rounded-lg p-2">
          <a href={`/api/auth/signout`} className="flex gap-2">
            Sign Out <Signout className="size-6" />
          </a>
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
        {open && <MobileNav onClick={() => setOpen(false)} userProps={userProps} />}
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
  userProps
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  userProps:{name:string, image:string}
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
  const image = userProps.image.length > 2 ? userProps.image : "/Avatar.png";
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
          <div className={`bg-[#${pathname === "/dashboard/settings"?"EBF4F6":"37B7C3"}] ${pathname === "/dashboard/settings"?"text-black":""} rounded-lg p-2 flex flex-col gap-2`}>
            <Link href={`/dashboard/settings`} className=" flex flex-col gap-2">
            <h3 className="flex gap-1 justify-between">Settings <Gear className="size-6" /></h3>
            <p className="flex gap-1">{userProps.name} <Image src={image} alt="Image of you" height={45} width={45} className="rounded-full" /></p>
            </Link>
          </div>
            <div className={`bg-[#${pathname === "/dashboard"?"EBF4F6":"37B7C3"}] ${pathname === "/dashboard"?"text-black":""} rounded-lg p-2`}>
              <Link href={`/dashboard`} className="flex gap-2 items-center justify-center">
               Dashboard <Wallet className="size-6 text-black" />
              </Link>
            </div>
            <div className={`bg-[#${pathname === "/dashboard/invoices"?"EBF4F6":"37B7C3"}] ${pathname === "/dashboard/invoices"?"text-black":""} rounded-lg p-2`}>
              <Link href={`/dashboard/invoices`} className="flex gap-2 items-center justify-center">
                Invoices <Invoice className="size-6" />
              </Link>
            </div>
            <div className={`bg-[#${pathname === "/dashboard/customers"?"EBF4F6":"37B7C3"}] ${pathname === "/dashboard/customers"?"text-black":""} rounded-lg p-2`}>
              <Link href={`/dashboard/customers`} className="flex gap-2 items-center justify-center">
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
