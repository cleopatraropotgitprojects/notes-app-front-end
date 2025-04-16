import { useState, useEffect } from 'react'
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
import { DashboardCart } from '../components/atoms/DashboardCart'

export const DashboardPage = () => {
  const [timeData, setTimeData] = useState([])
  const [totalNotes, setTotalNotes] = useState(0)
  const [pinnedNotes, setPinnedNotes] = useState(0)
  const [deletedNotes, setDeletedNotes] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://notes-app-backend-gkkz.onrender.com/api/dashboard')
        const data = await response.json()

        setTotalNotes(data.totalNotes)
        setPinnedNotes(data.pinnedNotes)
        setDeletedNotes(data.deletedNotes)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
          <DashboardCart
            title="Total Notes"
            number={totalNotes}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <DashboardCart
            title="Total pinned notes"
            number={pinnedNotes}
            bgColor="bg-yellow-100"
            textColor="text-yellow-600"
          />
          <DashboardCart
            title="Total deleted notes"
            number={deletedNotes}
            bgColor="bg-red-100"
            textColor="text-red-600"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-white opacity-75 z-10 flex justify-center items-center">
            <span className="text-3xl font-bold text-gray-500">Not available currently</span>
          </div>

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
    </div>
  )
}
