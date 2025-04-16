// ✅ TasksPage.tsx
import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Column } from '../components/atoms/Column'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'

export type ColumnId = 'pending' | 'inProgress' | 'done'

type TasksState = {
  [key in ColumnId]: string[]
}

export const TasksPage = () => {
  const [tasks, setTasks] = useState<TasksState>({
    pending: ['Task 1', 'Task 2'],
    inProgress: ['Task 3'],
    done: ['Task 4'],
  })

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const sourceColumn = active.data.current?.column as ColumnId
    const destinationColumn = over.data.current?.column as ColumnId
    const activeId = active.id as string
    const overId = over.id as string

    if (sourceColumn && destinationColumn) {
      if (sourceColumn === destinationColumn) {
        const items = tasks[sourceColumn]
        const oldIndex = items.indexOf(activeId)
        const newIndex = items.indexOf(overId)
        const updated = arrayMove(items, oldIndex, newIndex)

        setTasks((prev) => ({
          ...prev,
          [sourceColumn]: updated,
        }))
      } else {
        const sourceItems = [...tasks[sourceColumn]]
        const destinationItems = [...tasks[destinationColumn]]

        const sourceIndex = sourceItems.indexOf(activeId)
        sourceItems.splice(sourceIndex, 1)

        const destIndex = destinationItems.indexOf(overId)
        destinationItems.splice(destIndex, 0, activeId)

        setTasks((prev) => ({
          ...prev,
          [sourceColumn]: sourceItems,
          [destinationColumn]: destinationItems,
        }))
      }
    }
  }

  return (
    <div className="p-10 w-full">
      <h2 className="text-2xl font-bold mb-6">🧩 Tasks Board</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {(['pending', 'inProgress', 'done'] as ColumnId[]).map((column) => (
            <SortableContext
              key={column}
              items={tasks[column]}
              strategy={verticalListSortingStrategy}
            >
              <Column columnId={column} title={column} tasks={tasks[column]} />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  )
}
