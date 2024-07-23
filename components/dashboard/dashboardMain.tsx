import Chart from "./Charts";
const defaultIncome = [
  {
    name:"A",
    in:8000,
    out:3500
  },
  {
    name:"B",
    in:7500,
    out:4500
  },
  {
    name:"C",
    in:6000,
    out:6500
  },
  {
    name:"D",
    in:8000,
    out:3500
  }
]
export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex lg:flex-row flex-col items-center gap-2 justify-center bg-[#EBF4F6] w-full">
        <div className="flex flex-col">
          <h2 className="text-xl">Hey</h2>
          <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
            <Chart dataSet={defaultIncome} />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl">Hey</h2>
          <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
            {" "}
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
}
