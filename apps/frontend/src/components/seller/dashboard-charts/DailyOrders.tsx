"use client";

import { ShoppingBagIcon } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Wed", count: 20 },
  { day: "Thu", count: 35 },
  { day: "Fri", count: 50 },
  { day: "Sat", count: 40 },
  { day: "Sun", count: 30 },
  { day: "Mon", count: 25 },
  { day: "Tue", count: 45 },
];

export default function DailyOrders() {
  return (
    <div className="w-full p-4 bg-white border-gray-200 rounded-md backdrop-blur-md text-sm">
      <div className="py-2 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <span className="p-2 bg-accent-50 rounded-full">
            <ShoppingBagIcon size={18} className="stroke-accent" />
          </span>
          <h3 className="text-gray-700 font-medium">Daily Orders</h3>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-gray-700 font-semibold">150</span>
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
        <BarChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ffb0" />
              <stop offset="100%" stopColor="#80ffe0" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, 50]}
            ticks={[0, 10, 20, 30, 40, 50]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
