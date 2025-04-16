import { CheckSquare } from 'lucide-react'

type TodoNoteCardProps = {
  title: string
  description: string
  time: string
  location?: string
  tags?: string[]
  active?: boolean
  pinned?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export const TodoNoteCard = ({
  title,
  description,
  time,
  location,
  tags,
  active,
  pinned,
  onClick,
  onDelete,
}: TodoNoteCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl p-4 border transition-all ${
        active ? 'bg-yellow-300 text-black' : 'bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <CheckSquare size={16} className="text-yellow-600" />
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>

      <ul className="text-xs text-gray-500 pl-4 list-disc line-clamp-3 whitespace-pre-line">
        {description
          .split('\n')
          .filter((line) => line.trim().startsWith('- [ ]'))
          .map((line, i) => (
            <li key={i}>{line.replace('- [ ]', '').trim()}</li>
          ))}
      </ul>

      <div className="mt-3 flex justify-between items-center text-[11px] text-gray-400">
        <span>{time}</span>
        {location && <span className="text-yellow-600">{location}</span>}
      </div>
    </div>
  )
}
