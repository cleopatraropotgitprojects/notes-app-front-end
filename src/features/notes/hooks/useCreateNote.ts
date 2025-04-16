import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Note } from './useNotes'

export const useCreateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (noteData?: Partial<Note>) => {
      const res = await fetch('https://notes-app-backend-gkkz.onrender.com/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData || {}),
      })
      if (!res.ok) throw new Error('Failed to create note')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
