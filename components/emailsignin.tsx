"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import Email from "./email";
import { CreateAccountv2 } from "./emailServerworkings";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Spinner } from "./someSvgs";

export default function EmailSignIn() {
  const [openForm, setOpenForm] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <div className="lg:w-auto flex flex-col bg-[#37B7C3] shadow-lg shadow-[#088395] md:w-auto w-60">
      <div
        className="gap-2 p-2 cursor-pointer flex items-center justify-center"
        onClick={() => setOpenForm(!openForm)}
      >
        <Email className="h-8 w-8" /> <span>Sign in With Email</span>
      </div>
      {!login && openForm && <Form />}
      {login && openForm && <LoginForm />}
      {openForm &&
        (login ? (
          <p
            className="text-center p-1 cursor-pointer"
            onClick={() => {
              setLogin(false);
            }}
          >
            Don&apos;t have an account? Sign Up
          </p>
        ) : (
          <p
            className="text-center p-1 cursor-pointer"
            onClick={() => {
              setLogin(true);
            }}
          >
            Already have an account? Login
          </p>
        ))}
    </div>
  );
}

function Form() {
  const [state, formAction] = useFormState(CreateAccountv2, { message: "" });
  const [showP, setShowP] = useState("password");
  const [load, setLoad] = useState(false);
  if (state.message && state.message.length > 4) {
    return redirect(`/error/${state.message}`);
  }
  // const [data, setData] = useState<formdata>({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  return (
    <>
      <div>
        <form action={formAction}>
          <div className="flex w-full flex-col gap-2 justify-center items-center">
            <div className="flex w-full lg:px-3 lg:flex-row flex-col items-center gap-2 justify-center">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name*</label>
                <input
                  placeholder="First Name"
                  name="firstName"
                  required
                  type="text"
                  className="w-44 h-6 rounded  p-1 focus:border-[#071952] outline-none border-[#EBF4F6] border placeholder:text-[#EBF4F6] bg-inherit"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name*</label>
                <input
                  placeholder="Last Name"
                  name="lastName"
                  required
                  type="text"
                  className="w-44 h-6 rounded  focus:border-[#071952] p-1 outline-none border-[#EBF4F6] placeholder:text-[#EBF4F6] border bg-inherit"
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
                className="w-44 h-6 rounded  focus:border-[#071952] p-1 outline-none border-[#EBF4F6] placeholder:text-[#EBF4F6] border bg-inherit"
              />
            </div>
            <div className="flex flex-col gap-1 pb-3">
              <label htmlFor="password">Password*</label>
              <div className="input-container">
                <input
                  placeholder="Enter password"
                  required
                  name="password"
                  type={showP}
                  className="w-44 border  p-1 focus:border-[#071952] rounded outline-none placeholder:text-[#EBF4F6] border-[#EBF4F6] h-6 bg-inherit"
                />
                <span
                  onClick={() => {
                    if (showP == "password") {
                      setShowP("text");
                    } else {
                      setShowP("password");
                    }
                  }}
                >
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
            <div onClick={() => setLoad(true)}>
              <button
                type="submit"
                className="bg-[#071952] bg-opacity-50 m-2 flex items-center justify-center gap-1 p-2 rounded-lg"
              >
                Create Account
                {load && <Spinner className="animate-spin size-8" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function LoginForm() {
  const [state, formAction] = useFormState(CreateAccountv2, { message: "" });
  const [showP, setShowP] = useState("password");
  const [load, setLoad] = useState(false);
  // const [data, setData] = useState<formdata>({
  //   email: "",
  //   password: "",
  // });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  if (state.message && state.message.length > 4) {
    return redirect(`/error/${state.message}`);
  }
  return (
    <>
      <div>
        <form action={formAction}>
          <div className="flex w-full flex-col gap-2 justify-center items-center">
            <div className="flex flex-col">
              <label htmlFor="email">Email*</label>
              <input
                placeholder="Email"
                name="email"
                required
                type="text"
                className="w-44 h-6 rounded  focus:border-[#071952] p-1 outline-none border-[#EBF4F6] placeholder:text-[#EBF4F6] border bg-inherit"
              />
            </div>
            <div className="flex flex-col gap-1 pb-3">
              <label htmlFor="password">Password*</label>
              <div className="input-container">
                <input
                  placeholder="Enter password"
                  required
                  name="password"
                  type={showP}
                  className="w-44 border  p-1 focus:border-[#071952] rounded outline-none placeholder:text-[#EBF4F6] border-[#EBF4F6] h-6 bg-inherit"
                />
                <span
                  onClick={() => {
                    if (showP == "password") {
                      setShowP("text");
                    } else {
                      setShowP("password");
                    }
                  }}
                >
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
            <div onClick={() => setLoad(true)}>
              <button
                type="submit"
                className="bg-[#071952] bg-opacity-50 flex items-center justify-center gap-1 m-2 p-2 rounded-lg"
              >
                Login {load && <Spinner className="animate-spin size-8" />}
              </button>
            </div>
          </div>
        </form>
        <p className="flex items-center justify-center">
          <Link href={`/reset-password`}>Forgot password? </Link>
        </p>
      </div>
    </>
  );
}
