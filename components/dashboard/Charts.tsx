"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  {
    name: "Page A",
    in: 4000,
    out: 2400,
  },
  {
    name: "Page B",
    in: 3000,
    out: 1398,
  },
  {
    name: "Page C",
    in: 2000,
    out: 9800,
  },
  {
    name: "Page D",
    in: 2780,
    out: 3908,
  },
];
export type ChartLike = MoneyData[];

export interface MoneyData {
  name: string;
  in: number;
  out: number;
}
export default function Chart({ dataSet }: { dataSet?: ChartLike }) {
    let chartData:ChartLike;
  if (!dataSet) {
    chartData = data
  }else{
    chartData = dataSet
  }
  return (
    <>
      <ResponsiveContainer
        height={"100%"}
        width={"100%"}
        minHeight={230}
        minWidth={150}
      >
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="out" fill="#088395" />
          <Bar dataKey="in" fill="#37B7C3" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
