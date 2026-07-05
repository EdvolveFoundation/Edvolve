"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DashboardCharts({
  stats = {
  blogs: 0,
  staffs: 0,
  messages: 0,
  events: 0,
  registrations: 0,
  monthlyActivity: [],
}
}) {

  const analyticsData = [
    {
      name: "Blogs",
      value: Number(stats.blogs || 0),
    },
    {
      name: "Staffs",
      value: Number(stats.staffs || 0),
    },
    {
      name: "Messages",
      value: Number(stats.messages || 0),
    },
    {
      name: "Events",
      value: Number(stats.events || 0),
    },
    {
      name: "Registrations",
      value: Number(stats.registrations || 0),
    },
  ];

  const monthlyActivityData = Array.isArray(stats.monthlyActivity)
    ? stats.monthlyActivity.map((item) => ({
        month: item.month,
        blogs: Number(item.blogs || 0),
        messages: Number(item.messages || 0),
        events: Number(item.events || 0),
        registrations: Number(item.registrations || 0),
      }))
    : [];

  const colors = [
    "#572649",
    "#ca5bab",
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  const hasData = analyticsData.some(
    (item) => item.value > 0
  );
  const hasMonthlyData = monthlyActivityData.some(
    (item) =>
      item.blogs > 0 ||
      item.messages > 0 ||
      item.events > 0 ||
      item.registrations > 0
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">
          Dashboard Overview
        </h3>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
              >
                {analyticsData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales Statistics */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">
            Platform Activity
          </h3>

          <div className="w-full h-[350px]">
            {hasMonthlyData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyActivityData}>
                <CartesianGrid
                  stroke="#E5E7EB"
                  strokeDasharray="5 5"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Legend />

                <defs>
                  <linearGradient id="blogGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B5FEF" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#CA5BAB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5B5FEF" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient id="messageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F87171" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F87171" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <Area
                  type="monotone"
                  dataKey="blogs"
                  stroke="#5B5FEF"
                  fill="url(#blogGradient)"
                  strokeWidth={3}
                  name="Blogs"
                />

                <Area
                  type="monotone"
                  dataKey="messages"
                  stroke="#F87171"
                  fill="url(#messageGradient)"
                  strokeWidth={3}
                  name="Messages"
                />
                <Area
                  type="monotone"
                  dataKey="events"
                  stroke="#22C55E"
                  fill="transparent"
                  strokeWidth={3}
                  name="Events"
                />

                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#F59E0B"
                  fill="transparent"
                  strokeWidth={3}
                  name="Registrations"
                />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No activity has been recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">
          Content Distribution
        </h3>

        <div className="w-full h-[320px]">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analyticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
