"use client";

import { useState } from "react";
import { revalidate } from "./actions";
import { Comp, Err } from "../utilComps";
import { Spinner } from "../someSvgs";

export function CapitalForm({ userId }: { userId: string }) {
  const [capital, setCapital] = useState(0);
  const [comp, setComp] = useState(false);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);
  const [localErr, setLocalErr] = useState(false);
  async function SaveCapital() {
    try {
      setLoad(true);
      const res = await fetch(`/api/savecapital`, {
        method: "POST",
        body: JSON.stringify({ capital, userId }),
      });
      const json = await res.json();
      setLoad(false);
      if (json.error) {
        setErr(true);
        return;
      }
      setComp(true);
      revalidate();
    } catch (e) {
      setErr(true);
    }
  }
  return (
    <>
      <div className="flex flex-col bg-[#EBF4F6] items-center p-4 rounded gap-2">
        {load && <Spinner className="animate-spin size-8" />}
        {err && <Err message="well screwed" onClick={() => setErr(false)} />}
        {comp && (
          <Comp message="Avg Capital updated" onClick={() => setComp(false)} />
        )}
        {localErr && (
          <Err
            message="Capital can't be 0"
            onClick={() => setLocalErr(false)}
          />
        )}
        <p>Avg. Capital: </p>
        <input
          type="number"
          placeholder="Amount: "
          className="p-2"
          onChange={(e) => {
            setCapital(parseInt(e.target.value));
          }}
        />
        <button
          className="bg-[#37B7C3] w-44 p-2 rounded"
          onClick={() => {
            if (capital <= 0) {
              setLocalErr(true);
              return;
            }
            SaveCapital();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

//Note that the name of this component doesn't describe it
export function PercentForm({ userId }: { userId: string }) {
  const [basis, setBasis] = useState("weekly");
  const [err, setErr] = useState(false);
  const [comp, setComp] = useState(false);
  const [load, setLoad] = useState(false);
  async function SaveCycle() {
    try {
      setLoad(true);
      const res = await fetch(`/api/savecycle`, {
        method: "POST",
        body: JSON.stringify({ cycle: basis, userId }),
      });
      const json = await res.json();
      setLoad(false);
      if (json.error) {
        setErr(true);
        return;
      }
      setComp(true);
      revalidate();
    } catch (e) {
      setErr(true);
    }
  }
  return (
    <>
      <div className="flex flex-col bg-[#EBF4F6] gap-2 p-4 rounded items-center">
        {load && <Spinner className="animate-spin size-8" />}
        {err && <Err message="well screwed" onClick={() => setErr(false)} />}
        {comp && (
          <Comp message="Pay Cycle updated" onClick={() => setComp(false)} />
        )}
        <p>Weekly or Monthly</p>
        <select
          className="w-40 p-2"
          onChange={(e) => {
            setBasis(e.target.value);
          }}
        >
          <option value={"weekly"}>Weekly</option>
          <option value={"monthly"}>Monthly</option>
        </select>
        <button
          className="bg-[#37B7C3] w-44 p-2 rounded"
          onClick={() => {
            SaveCycle();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export function CurrencyForm({ userId }: { userId: string }) {
  const [currency, setCurrency] = useState("naira");
  const [comp, setComp] = useState(false);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);
  async function SaveCurrency() {
    try {
      setLoad(true);
      const res = await fetch(`/api/savecurrency`, {
        method: "POST",
        body: JSON.stringify({ currency, userId }),
      });
      const json = await res.json();
      setLoad(false);
      if (json.error) {
        setErr(true);
        return;
      }
      setComp(true);
      revalidate();
    } catch (e) {
      setErr(true);
    }
  }
  return (
    <div className="flex flex-col bg-[#EBF4F6] gap-2 p-4 rounded items-center">
      {load && <Spinner className="animate-spin size-8" />}
        {err && <Err message="well screwed" onClick={() => setErr(false)} />}
        {comp && (
          <Comp message="Currency updated" onClick={() => setComp(false)} />
        )}
      <select className="w-40 p-2" onChange={(e)=>{
        setCurrency(e.target.value)
      }}>
        <option value={"naira"}>Naira</option>
        <option value={"dollars"}>Dollars</option>
      </select>
      <button className="bg-[#37B7C3] w-44 p-2 rounded" onClick={()=>{
        SaveCurrency();
      }}>Save</button>
    </div>
  );
}
