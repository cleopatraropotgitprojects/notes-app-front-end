import { NoteCard } from './cards/NoteCard'
import { useNotes } from '../hooks/useNotes'
import { formatTimeAgo } from '../../../lib/formatTimeAgo'
import { useNotesStore } from '../../../store/notesStore'
import { AnimatePresence, motion } from 'framer-motion'
import { useTrashNote } from '../hooks/useTrashNote'
import { TodoNoteCard } from './cards/TodoNoteCard'

const getTemplateType = (tags: string[] = []) => {
  if (tags.includes('todo')) return 'todo'
  return 'simple'
}

export const NoteListPage = () => {
  const { data: notes = [], isLoading } = useNotes()
  const selectedNote = useNotesStore((s) => s.selectedNote)
  const setSelectedNote = useNotesStore((s) => s.setSelectedNote)
  const { mutate: trashNote } = useTrashNote()

  const getNoteCardComponent = (note: any) => {
    const template = getTemplateType(note.tags)

    const commonProps = {
      key: note.id,
      title: note.title || 'Untitled',
      description: note.description || 'No content',
      tags: note.tags,
      time: formatTimeAgo(note.createdAt),
      location: note.location,
      pinned: note.pinned,
      active: selectedNote?.id === note.id,
      onClick: () => {
        if (selectedNote?.id === note.id) {
          setSelectedNote(null)
        } else {
          setSelectedNote(note)
        }
      },
      onDelete: () => {
        trashNote(note.id)
        if (selectedNote?.id === note.id) {
          setSelectedNote(null)
        }
      },
    }

    switch (template) {
      case 'todo':
        return <TodoNoteCard {...commonProps} />
      default:
        return <NoteCard {...commonProps} />
    }
  }

  return (
    <div className="w-[420px] h-full overflow-auto px-8 py-6 space-y-4 bg-white">
      <h2 className="text-xl font-bold mb-2">Notes</h2>
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-10 text-gray-400 text-sm text-center">
          <p>
            No notes yet. <br />
            Click <span className="font-medium text-black">New Page</span> to get started!
          </p>
        </div>
      ) : (
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {getNoteCardComponent(note)}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}
