"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import OtpInput from "react-otp-input";
const mont = Montserrat({ weight: ["500"], subsets: ["vietnamese"] });
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input required {...props} />;
}

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [user, setUser] = useState<any>();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const token = searchParams.get("token");

  async function checkToken(token: string) {
    try {
      const res = await fetch("/api/comparetoken", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      const user = await res.json();
      if (user.error) {
        console.log(user.error);
        return;
      }
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  }
  if (token && token.length === 7) {
    return (
      <>
        <div
          className={`flex flex-col items-center lg:text-center justify-center min-h-screen ${mont.className}`}
        >
          <div className="flex flex-col gap-2 lg:p-6 p-3 md:p-6 rounded-lg shadow-lg shadow-[#37B7C3] bg-[#EBF4F6]">
            {!user && (
              <>
                <h2>Enter Token</h2>
                <OtpInput
                  numInputs={7}
                  value={otp}
                  onChange={setOtp}
                  renderInput={Input}
                  renderSeparator={
                    <span className="lg:px-2 md:px-2 px-1">-</span>
                  }
                  inputStyle={{
                    width: "1.6rem",
                    padding: "0.5rem",
                    borderRadius: "0.3rem",
                  }}
                />
                <button
                  className="bg-white p-2"
                  onClick={() => checkToken(otp)}
                >
                  Enter
                </button>
              </>
            )}
            {user && (
                <>
                <p>New Password</p>
                <input type="text" required className="p-2" />
                <p>Confirm Password</p>
                <input type="text" required className="p-2" />
                <button className="bg-white p-2">Change Password</button>
                </>
            )}
          </div>
        </div>
      </>
    );
  }
  async function sendToken(email: string) {
    if (email.length < 5) {
      return;
    }
    try {
      const res = await fetch("/api/forgotpass", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (result.error) {
        return;
      }
      setSent(true);
      return;
    } catch (e) {
      console.log(e);
    }
  }
  if (sent) {
    return (
      <>
        <div
          className={`flex flex-col items-center lg:text-center justify-center min-h-screen ${mont.className}`}
        >
          <div className="flex flex-col gap-2 p-6 rounded-lg shadow-lg shadow-[#37B7C3] bg-[#EBF4F6]">
            <h2 className="lg:text-2xl text-wrap">
              Check your email {email} for a token,
              <br /> then click reset password
              <br /> and enter that token
            </h2>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={`flex flex-col items-center lg:text-center justify-center min-h-screen ${mont.className}`}
      >
        <div className="flex flex-col gap-2 p-4 rounded-lg shadow-lg shadow-[#37B7C3] bg-[#EBF4F6]">
          <h2 className="text-2xl">Forgot Password?</h2>
          <p>Enter Your Email for a Password reset</p>
          <label htmlFor="email">Email: </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            className="p-2 border-[#088395] border"
            placeholder="example@xyz.com"
          />
          <button
            className="bg-white p-2"
            onClick={() => {
              sendToken(email);
            }}
          >
            Send Token
          </button>
          <p className="p-2 text-center">
            <Link href={`/login`}>&lt;- Back to Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
//function TokenForm({onClick}:{onClick:React.MouseEventHandler<HTMLButtonElement>}){}
