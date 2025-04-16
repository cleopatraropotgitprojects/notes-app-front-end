import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { AnimatePresence, motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { useUpdateNote } from '../../hooks/useUpdateNotes'
import { useNotesStore } from '../../../../store/notesStore'

export const TodoNoteDetails = () => {
  const { selectedNote, updateNoteLive } = useNotesStore()
  const { mutate: updateNote } = useUpdateNote()
  const [tasks, setTasks] = useState<string[]>([])
  const [checked, setChecked] = useState<boolean[]>([])
  const [newTask, setNewTask] = useState('')
  const [title, setTitle] = useState(selectedNote?.title || 'To-do List')

  const debouncedSave = useMemo(
    () =>
      debounce((updatedTasks: string[], updatedTitle: string) => {
        updateNoteLive({ title: updatedTitle, description: updatedTasks.join('\n') })
        updateNote({
          ...selectedNote,
          id: selectedNote!.id,
          title: updatedTitle,
          description: updatedTasks.join('\n'),
        })
      }, 300),
    [selectedNote, updateNote]
  )

  useEffect(() => {
    const lines = selectedNote?.description?.split('\n').filter(Boolean) || []
    setTasks(lines.map((line) => line.replace(/^- \[ \] /, '').trim()))
    setChecked(new Array(lines.length).fill(false))
    setTitle(selectedNote?.title || 'To-do List')
  }, [selectedNote])

  const handleTaskToggle = (index: number) => {
    const updatedChecked = [...checked]
    updatedChecked[index] = !updatedChecked[index]
    setChecked(updatedChecked)
  }

  const handleTaskDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    const updatedChecked = checked.filter((_, i) => i !== index)
    setTasks(updatedTasks)
    setChecked(updatedChecked)
    debouncedSave(updatedTasks, title)
  }

  const handleAddTask = () => {
    if (!newTask.trim()) return
    const updatedTasks = [...tasks, newTask.trim()]
    const updatedChecked = [...checked, false]
    setTasks(updatedTasks)
    setChecked(updatedChecked)
    setNewTask('')
    debouncedSave(updatedTasks, title)
  }

  return (
    <div className="h-full px-10 py-8 overflow-auto">
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          debouncedSave(tasks, e.target.value)
        }}
        className="text-2xl font-bold mb-6 w-full outline-none"
        placeholder="To-do List"
      />

      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-yellow-500"
                checked={checked[index]}
                onChange={() => handleTaskToggle(index)}
              />
              <span
                className={`text-sm ${checked[index] ? 'line-through text-gray-400' : 'text-gray-700'}`}
              >
                {task}
              </span>
              <button
                onClick={() => handleTaskDelete(index)}
                className="ml-auto text-gray-300 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddTask()
        }}
        className="flex items-center gap-3 mt-6"
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="text-sm border px-3 py-2 rounded w-full outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 text-sm rounded hover:bg-yellow-600 transition"
        >
          Add
        </button>
      </form>
    </div>
  )
}
