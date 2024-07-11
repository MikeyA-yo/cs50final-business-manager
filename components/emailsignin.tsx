"use client";

import { useState } from "react";
import Email from "./email";
import { CreateAccount } from "./emailServerworkings";

export default function EmailSignIn() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="lg:w-auto flex flex-col bg-[#37B7C3] shadow-lg shadow-[#088395] md:w-auto w-60">
      <div
        className="gap-2 p-2 cursor-pointer flex items-center justify-center"
        onClick={() => setOpenForm(!openForm)}
      >
        <Email className="h-8 w-8" /> <span>Sign in With Email</span>
      </div>
      {openForm && <Form action={CreateAccount} />}
    </div>
  );
}

function Form({ action }: { action: (formData: FormData) => any }) {
  return (
    <>
      <div>
        <form action={action} onSubmit={(e) => e.preventDefault()}>
          <div className="flex w-full flex-col gap-2 justify-center items-center">
            <div className="flex w-full lg:px-3 lg:flex-row flex-col items-center gap-2 justify-center">
              <div className="flex flex-col">
                <label htmlFor="FirstName">First Name*</label>
                <input
                  placeholder="First Name"
                  name="FirstName"
                  required
                  type="text"
                  className="w-44 h-6 rounded p-1 focus:border-[#071952] outline-none border-[#EBF4F6] border placeholder:text-[#EBF4F6] bg-inherit"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="LastName">Last Name*</label>
                <input
                  placeholder="Last Name"
                  name="LastName"
                  required
                  type="text"
                  className="w-44 h-6 rounded focus:border-[#071952] p-1 outline-none border-[#EBF4F6] placeholder:text-[#EBF4F6] border bg-inherit"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email*</label>
              <input
                placeholder="Email"
                name="email"
                required
                type="text"
                className="w-44 h-6 rounded focus:border-[#071952] p-1 outline-none border-[#EBF4F6] placeholder:text-[#EBF4F6] border bg-inherit"
              />
            </div>
            <div className="flex flex-col gap-1 pb-3">
              <label htmlFor="password">Password*</label>
              <div className="input-container">
                <input
                  placeholder="Enter password"
                  required
                  name="password"
                  type="password"
                  className="w-44 border p-1 focus:border-[#071952] rounded outline-none placeholder:text-[#EBF4F6] border-[#EBF4F6] h-6 bg-inherit"
                />
                <span>
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#071952] bg-opacity-50 m-2 p-2 rounded-lg"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
