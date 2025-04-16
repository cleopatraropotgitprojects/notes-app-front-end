type DashboardCartProps = {
  title: string
  number: number
  bgColor: string
  textColor: string
}

export const DashboardCart = ({ title, number, bgColor, textColor }: DashboardCartProps) => {
  return (
    <div
      className={`flex justify-center items-center flex-col ${bgColor} p-6 rounded-lg shadow-lg`}
    >
      <div className={`text-4xl font-bold ${textColor}`}>{number}</div>
      <div className="text-lg text-gray-800 mt-2">{title}</div>
    </div>
  )
}
