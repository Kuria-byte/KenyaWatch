"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { year: "2014", debt: 2.1 },
  { year: "2015", debt: 2.8 },
  { year: "2016", debt: 3.6 },
  { year: "2017", debt: 4.5 },
  { year: "2018", debt: 5.3 },
  { year: "2019", debt: 6.1 },
  { year: "2020", debt: 7.2 },
  { year: "2021", debt: 8.0 },
  { year: "2022", debt: 8.9 },
  { year: "2023", debt: 9.6 },
  { year: "2024", debt: 10.2 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">{`Year: ${label}`}</p>
        <p className="text-sm text-blue-600">
          <span className="font-medium">National Debt:</span> KES {payload[0].value}T
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Per Citizen:</span> KES{" "}
          {Math.round((payload[0].value * 1000000000000) / 50000000).toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function DebtGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis label={{ value: "Debt (Trillion KES)", angle: -90, position: "insideLeft" }} domain={[0, 12]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="debt"
          name="National Debt (Trillion KES)"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

