import Chart from "./Charts";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex lg:flex-row flex-col items-center justify-center bg-[#EBF4F6] w-full">
        <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full">
          <Chart />
        </div>
        <div className="lg:w-96 md:w-80 p-4 flex lg:flex-row flex-wrap flex-col w-full">
          {" "}
          <Chart />
        </div>
      </div>
    </>
  );
}
