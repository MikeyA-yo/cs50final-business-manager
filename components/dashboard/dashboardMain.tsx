import Chart from "./Charts";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex lg:flex-row flex-col items-center gap-2 justify-center bg-[#EBF4F6] w-full">
        <div className="flex flex-col">
          <h2>Yo</h2>
          <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
            <Chart />
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Yo</h2>
          <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full rounded border-[#071952] border">
            {" "}
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
}
