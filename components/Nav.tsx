"use client";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import {Link as Scroll} from "react-scroll"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { User } from "lucia";

const ubuntu = Ubuntu({ weight: ["500"], subsets: ["latin"] });

function Bar({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLOrSVGElement>;
}) {
  let variants = {
    open: { rotate: [0, 180, 270, 0], scale: [1, 2, 1] },
    close: { rotate: [270, 180, 0], scale: [1, 2, 1] },
  };
  return (
    <>
      <AnimatePresence>
        <motion.div variants={variants} animate="open" exit="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-[#EBF4F6]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function Xbar({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLOrSVGElement>;
}) {
  let variants = {
    open: { rotate: [0, 180, 270, 0], scale: [1, 2, 1] },
    close: { rotate: [270, 180, 0], scale: [1, 2, 1] },
  };
  return (
    <>
      <AnimatePresence>
        <motion.div variants={variants} animate="open" exit="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function MenuList({user}:{user?:{name:string, email:string} | null }) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          animate={{
            opacity: [0,1],
            transition: { delay: 0.4, duration: 0.5 },
            y: ["-100%", 0],
          }}
          exit={{
            opacity: 0,
            transition: { delay: 0.4, duration: 0.9 },
            y: 0,
          }}
          className="flex flex-col items-center justify-center"
        >
          <ul className="flex gap-2 flex-col items-center justify-center">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Scroll to={"about"} smooth duration={250}>About</Scroll>
            </li>
            <li>
              <Link href={user ? "/dashboard":"/login"}>{user ? "Dashboard":"Login"}</Link>
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
export type userPreview = Omit<User, "_id" | "id">
export default function Nav({user}:{user?:{name:string, email:string} | null }) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  let hidden = "flex";
  if(pathname === "/login" || pathname.includes("/error") || pathname === "/register" || pathname === "/reset-password" || pathname.includes("/dashboard")){
    hidden = "hidden";
  }
  return (
    <>
      <div className={`${hidden} bg-[#071952] p-8 gap-2 text-[#EBF4F6] flex-col`}>
        <nav
          className={`flex items-center justify-between lg:flex-row md:flex-row ${ubuntu.className}`}
        >
          <div>
            <h2 className="text-xl">Business Manager</h2>
          </div>
          <div className="lg:flex gap-8 md:flex hidden">
            <Link href={"/"}>Home</Link>
            <Scroll to={"about"} className="cursor-pointer" smooth duration={450}>About</Scroll>
            <Link href={user ? "/dashboard":"/login"}>{user ? "Dashboard":"Login"}</Link>
          </div>
          <div className="flex lg:hidden md:hidden">
            {!open && (
              <Bar
                onClick={() => {
                  setOpen(true);
                }}
              />
            )}
            {open && (
              <Xbar
                onClick={() => {
                  setOpen(false);
                }}
              />
            )}
          </div>
        </nav>
        {open && <div onClick={()=>setOpen(false)}><MenuList user={user} /></div>}
      </div>
    </>
  );
}
