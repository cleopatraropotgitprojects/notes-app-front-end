import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const DashboardPage = () => {
  // Datele pentru graficul de timp activ
  const timeData = [
    { day: 'Mon', time: 1.5 },
    { day: 'Tue', time: 2 },
    { day: 'Wed', time: 2.5 },
    { day: 'Thu', time: 3 },
    { day: 'Fri', time: 3.5 },
    { day: 'Sat', time: 2 },
    { day: 'Sun', time: 1.5 },
  ]

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
          <div className="flex justify-center items-center flex-col bg-green-100 p-6 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-green-600">25</div>
            <div className="text-lg text-gray-800 mt-2">Total Notes</div>
          </div>

          <div className="flex justify-center items-center flex-col bg-yellow-100 p-6 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-yellow-600">7</div>
            <div className="text-lg text-gray-800 mt-2">Total pinned notes</div>
          </div>

          <div className="flex justify-center items-center flex-col bg-red-100 p-6 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-red-600">12</div>
            <div className="text-lg text-gray-800 mt-2">Total deleted notes</div>
          </div>
        </div>

        {/* Graficul Timing & Progress */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Active time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#4A90E2"
              fill="rgba(74, 144, 226, 0.2)"
              fillOpacity={1}
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
