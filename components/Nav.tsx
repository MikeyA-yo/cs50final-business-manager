"use client";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

function MenuList() {
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
              <Link href={"#about"}>About</Link>
            </li>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function Nav() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex bg-[#071952] p-8 gap-2 text-[#EBF4F6] flex-col">
        <nav
          className={`flex items-center justify-between lg:flex-row md:flex-row ${ubuntu.className}`}
        >
          <div>
            <h2 className="text-xl">Business Manager</h2>
          </div>
          <div className="lg:flex gap-8 md:flex hidden">
            <Link href={"/"}>Home</Link>
            <Link href={"#about"}>About</Link>
            <Link href={"/login"}>Login</Link>
          </div>
          <div className="flex lg:hidden md:hidden">
            {!open && (
              <Bar
                onClick={(e) => {
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
        {open && <MenuList />}
      </div>
    </>
  );
}
