"use client";

import { BadgeDollarSign } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Wed", revenue: 0 },
  { day: "Thu", revenue: 500 },
  { day: "Fri", revenue: 1500 },
  { day: "Sat", revenue: 800 },
  { day: "Sun", revenue: 300 },
  { day: "Mon", revenue: 600 },
  { day: "Tue", revenue: 400 },
];

const formatYAxis = (value: number) => {
  if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(1) + "k";
  return `N${value.toFixed(1)}`;
};

export default function DailyRevenue() {
  return (
    <div className="w-full p-4 bg-white border-gray-200 rounded-md backdrop-blur-md text-sm">
      <div className="py-2 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <span className="p-2 bg-accent-50 rounded-full">
            <BadgeDollarSign size={18} className="stroke-accent" />
          </span>
          <h3 className="text-gray-700 font-medium">Daily Revenue</h3>
        </div>
        <div className="text-gray-700 font-semibold flex items-center space-x-1">
          <span>$80.00</span>
          <span
            role="img"
            aria-label="caret-up"
            className="anticon anticon-caret-up"
            style={{ color: "rgb(82, 196, 26)" }}
          >
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              data-icon="caret-up"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
            </svg>
          </span>
        </div>
      </div>
      <ResponsiveContainer width="99%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={(value) => [`$${value}.00`, "Revenue"]} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#00ffb0"
            fill="#80ffe0"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
