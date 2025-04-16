import { Search, Download, Pin, MoreHorizontal, Trash } from 'lucide-react'
import { useNotesStore } from '../../store/notesStore'
import { useUpdateNote } from '../../features/notes/hooks/useUpdateNotes'
import { useTrashNote } from '../../features/notes/hooks/useTrashNote'

export const Header = () => {
  const selectedNote = useNotesStore((s) => s.selectedNote)
  const setSelectedNote = useNotesStore((s) => s.setSelectedNote)
  const updateNoteLive = useNotesStore((s) => s.updateNoteLive)
  const { mutate: deleteNote } = useTrashNote()
  const { mutate: updateNote } = useUpdateNote()

  const handleDelete = () => {
    if (selectedNote) {
      deleteNote(selectedNote.id)
      setSelectedNote(null)
    }
  }

  const handlePinToggle = () => {
    if (selectedNote) {
      const newPinned = !selectedNote.pinned
      updateNoteLive({ pinned: newPinned })
      updateNote({ ...selectedNote, pinned: newPinned })
    }
  }

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
      <div className="flex items-center gap-8 flex-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-black to-yellow-500" />
          <span className="font-semibold">Awsmd</span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-500">
        {selectedNote && (
          <>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition flex items-center gap-1"
            >
              <Trash size={18} />
              <span className="hidden sm:inline">Delete</span>
            </button>

            <button
              onClick={handlePinToggle}
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              <Pin size={18} fill={selectedNote.pinned ? '#facc15' : 'none'} />
            </button>
          </>
        )}

        <span className="cursor-not-allowed hover:text-black">Updates</span>
        <span className="cursor-not-allowed hover:text-black">Share</span>
        <MoreHorizontal size={18} className="cursor-not-allowed hover:text-black" />
      </div>
    </header>
  )
}
