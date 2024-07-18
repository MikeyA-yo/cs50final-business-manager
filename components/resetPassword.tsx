"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { Spinner } from "./someSvgs";
import { Err } from "./utilComps";
const mont = Montserrat({ weight: ["500"], subsets: ["vietnamese"] });
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input required {...props} />;
}

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false)
  const [sent, setSent] = useState(false);
  const [user, setUser] = useState<any>();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("")
  const [err, setErr]=useState(false)
  const [errText, setErrText] = useState("Something went wrong")
  const token = searchParams.get("token");
  
  async function checkToken(token: string) {
    try {
      setLoad(true)
      const res = await fetch("/api/comparetoken", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      const user = await res.json();
      setLoad(false)
      if (user.error) {
        router.replace(`/error/${user.error}`);
        return;
      }
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  }
  async function changePassword(user:any, newPass:string){
    if(newPass.length < 4 || !user){
      setErr(true)
      setErrText("Password requires minimum of 4 characters")
       return;
    }
    const res = await fetch("/api/resetpass",{
      method:"POST",
      body:JSON.stringify({user, newPass})
    })
    const result = await res.json();
    if(result.error){
      router.replace(`/error/${result.error}`);
      return;
    }
    return router.replace(`/`);
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
                  className="bg-white flex gap-2 items-center justify-center p-2"
                  onClick={() => checkToken(otp)}
                >
                  Enter
                  {load && <Spinner className="animate-spin size-8" />}
                </button>
              </>
            )}
            {user && (
              <>
               {err && <Err message={errText} onClick={()=>setErr(false)} />}
                <p>New Password</p>
                <input type="text" required className="p-2" onChange={(e)=> setNewPass(e.target.value)}/>
                <p>Confirm Password</p>
                <input type="text" required className="p-2" onChange={(e)=>setConfirm(e.target.value)} />
                <button className="bg-white flex gap-1 items-center justify-center p-2" onClick={()=>{
                  if(newPass === confirm){
                    changePassword(user, newPass)
                  }else{
                    setErr(true);
                    setErrText("Passwords mismatch")
                  }
                }}>Change Password {load && <Spinner className="animate-spin size-8" />}</button>
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
      setLoad(true)
      const res = await fetch("/api/forgotpass", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      setLoad(false)
      if (result.error) {
        router.replace(`/error/${result.error}`);
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
            className="bg-white flex gap-2 items-center justify-center p-2"
            onClick={() => {
              sendToken(email);
            }}
          >
            Send Token
            {load && <Spinner className="animate-spin size-8" />}
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
