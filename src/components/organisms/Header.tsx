import { Search, Download, Pin, MoreHorizontal, Trash } from 'lucide-react'
import { useDeleteNote } from '../../features/notes/hooks/useDeleteNote'
import { useNotesStore } from '../../store/notesStore'
import { useUpdateNote } from '../../features/notes/hooks/useUpdateNotes'

export const Header = () => {
  const selectedNote = useNotesStore((s) => s.selectedNote)
  const setSelectedNote = useNotesStore((s) => s.setSelectedNote)
  const updateNoteLive = useNotesStore((s) => s.updateNoteLive)
  const { mutate: deleteNote } = useDeleteNote()
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

        <div className="flex justify-center flex-1">
          <div className="relative w-[420px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search notes"
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
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

        <Download size={18} className="text-gray-400 cursor-pointer hover:text-black" />
        <span className="cursor-pointer hover:text-black">Updates</span>
        <span className="cursor-pointer hover:text-black">Share</span>
        <MoreHorizontal size={18} className="cursor-pointer hover:text-black" />
      </div>
    </header>
  )
}
