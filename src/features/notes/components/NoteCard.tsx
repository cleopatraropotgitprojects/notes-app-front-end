import { MoreHorizontal } from 'lucide-react'

type NoteCardProps = {
    title: string
    description: string
    time: string
    location?: string
    tags?: string[]
    active?: boolean
    users?: number
    onClick?: () => void
}

export const NoteCard = ({
                             title,
                             description,
                             time,
                             location,
                             active,
                             tags,
                             onClick,
                         }: NoteCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer rounded-2xl p-4 border shadow-sm transition-all ${
                active ? 'bg-yellow-300 text-black' : 'bg-white hover:shadow-md'
            }`}
        >
            {/* Dots */}
            <MoreHorizontal className="absolute top-3 right-3 text-gray-400" size={14} />

            {/* Title */}
            <h3 className="font-semibold text-sm mb-1">{title}</h3>

            {/* Description */}
            <p className="text-xs text-gray-500 line-clamp-2">
                {description}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-gray-700">
                    {tags.map((tag, idx) => (
                        <span key={idx}>#{tag}</span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="mt-3 flex justify-between items-center text-[11px] text-gray-400">
                <span>{time}</span>
                {location && <span className="text-yellow-600">{location}</span>}
            </div>
        </div>
    )
}
