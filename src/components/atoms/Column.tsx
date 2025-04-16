import { SortableContext } from '@dnd-kit/sortable'
import { Card } from './Card'
import { ColumnId } from '../../pages/TasksPage'

type ColumnProps = {
  tasks: string[]
  title: ColumnId
  columnId: ColumnId
}

export const Column = ({ columnId, title, tasks }: ColumnProps) => {
  return (
    <div className="bg-white border rounded p-4 min-h-[300px]">
      <h3 className="font-semibold capitalize mb-3">{title.replace(/([A-Z])/g, ' $1')}</h3>
      <SortableContext items={tasks}>
        <div className="space-y-2">
          {tasks.map((task) => (
            <Card key={task} id={task} column={columnId} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
