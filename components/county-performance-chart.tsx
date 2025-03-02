"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Makueni", completion: 97, allocated: 45, utilized: 43 },
  { name: "Nakuru", completion: 92, allocated: 60, utilized: 55 },
  { name: "Kiambu", completion: 88, allocated: 75, utilized: 66 },
  { name: "Machakos", completion: 76, allocated: 50, utilized: 38 },
  { name: "Kajiado", completion: 65, allocated: 40, utilized: 26 },
  { name: "Kisumu", completion: 31, allocated: 55, utilized: 17 },
  { name: "Mombasa", completion: 23, allocated: 70, utilized: 16 },
  { name: "Nairobi", completion: 12, allocated: 120, utilized: 14 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">{`${label} County`}</p>
        <p className="text-sm" style={{ color: "#8884d8" }}>
          <span className="font-medium">Project Completion:</span> {payload[0].value}%
        </p>
        <p className="text-sm" style={{ color: "#82ca9d" }}>
          <span className="font-medium">Funds Allocated:</span> KES {payload[1].value}M
        </p>
        <p className="text-sm" style={{ color: "#ffc658" }}>
          <span className="font-medium">Funds Utilized:</span> KES {payload[2].value}M
        </p>
      </div>
    )
  }
  return null
}

export default function CountyPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          orientation="left"
          label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: "Funds (Million KES)", angle: 90, position: "insideRight" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar yAxisId="left" dataKey="completion" name="Project Completion (%)" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="allocated" name="Funds Allocated (M)" fill="#82ca9d" />
        <Bar yAxisId="right" dataKey="utilized" name="Funds Utilized (M)" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

