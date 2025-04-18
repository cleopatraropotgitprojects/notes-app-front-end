import { Pin } from 'lucide-react'

type NoteCardProps = {
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

export const NoteCard = ({
  title,
  description,
  time,
  location,
  active,
  tags,
  pinned,
  onClick,
}: NoteCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl p-4 border shadow-sm transition-all ${
        active ? 'bg-yellow-300 text-black' : 'bg-white hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        {pinned && <Pin size={14} className="text-black" />}
      </div>

      <p className="text-xs text-gray-500 line-clamp-2">{description}</p>

      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-gray-700">
          {tags.map((tag, idx) => (
            <span key={idx}>#{tag}</span>
          ))}
        </div>
      )}

      <div className="mt-3 flex justify-between items-center text-[11px] text-gray-400">
        <span>{time}</span>
        {location && <span className="text-yellow-600">{location}</span>}
      </div>
    </div>
  )
}
