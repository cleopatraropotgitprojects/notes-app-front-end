import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CardProps = {
  id: string
  column: string
}

export const Card = ({ id, column }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: { column },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-gray-100 text-sm p-3 rounded shadow cursor-move"
    >
      {id}
    </div>
  )
}
