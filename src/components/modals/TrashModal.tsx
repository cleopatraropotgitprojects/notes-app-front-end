import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

type TrashModalProps = {
  onClose: () => void
}

type Note = {
  id: string
  title: string
  description: string
  createdAt: string
}

export const TrashModal = ({ onClose }: TrashModalProps) => {
  const queryClient = useQueryClient()
  const [isDeleting, setIsDeleting] = useState(false)

  const { data: trashedNotes = [], isLoading } = useQuery<Note[]>({
    queryKey: ['trashed-notes'],
    queryFn: async () => {
      const res = await fetch('https://notes-app-backend-gkkz.onrender.com/api/notes?trashed=true')
      if (!res.ok) throw new Error('Failed to fetch trashed notes')
      return res.json()
    },
  })

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`https://notes-app-backend-gkkz.onrender.com/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trashed: false }),
      })
      if (!res.ok) throw new Error('Failed to restore')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trashed-notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`https://notes-app-backend-gkkz.onrender.com/api/notes/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete permanently')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trashed-notes'] })
    },
  })

  const deleteAllNotes = async () => {
    setIsDeleting(true)
    for (const note of trashedNotes) {
      await deleteMutation.mutateAsync(note.id)
    }
    setIsDeleting(false)
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">🗑 Trashed Notes</h2>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : trashedNotes.length === 0 ? (
          <p className="text-sm text-gray-400">No trashed notes found.</p>
        ) : (
          <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {trashedNotes.map((note) => (
              <li
                key={note.id}
                className="border rounded-lg p-4 bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-sm font-medium">{note.title || 'Untitled'}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {note.description || 'No content'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => restoreMutation.mutate(note.id)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(note.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete permanently
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {trashedNotes.length > 0 && (
          <button
            onClick={deleteAllNotes} // Apelăm funcția care șterge toate notele
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700"
          >
            {isDeleting ? 'Deleting...' : 'Delete All Notes Permanently'}
          </button>
        )}

        {isDeleting && (
          <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-20">
            <span className="text-white text-2xl font-bold">Deleting...</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
