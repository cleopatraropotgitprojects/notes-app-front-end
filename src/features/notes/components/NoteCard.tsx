import { AnimatePresence, motion } from 'framer-motion'

type NoteCardProps = {
  title: string
  description: string
  time: string
  location?: string
  tags?: string[]
  active?: boolean
  users?: number
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
  onClick,
}: NoteCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl p-4 border shadow-sm transition-all ${
        active ? 'bg-yellow-300 text-black' : 'bg-white hover:shadow-md'
      }`}
    >
      {/* Title */}
      <h3 className="font-semibold text-sm mb-1">{title}</h3>

      {/* Description */}
      <p className="text-xs text-gray-500 line-clamp-2">{description}</p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-gray-700">
          <AnimatePresence>
            {tags.map((tag, idx) => (
              <motion.span
                key={tag + idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                #{tag}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex justify-between items-center text-[11px] text-gray-400">
        <span>Created: {time}</span>
        {location && <span className="text-yellow-600">{location}</span>}
      </div>
    </div>
  )
}
