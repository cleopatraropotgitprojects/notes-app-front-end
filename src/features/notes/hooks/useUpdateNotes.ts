import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Note } from './useNotes'

export const useUpdateNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (note: Partial<Note> & { id: string }) => {
            const res = await fetch(`https://notes-app-backend-gkkz.onrender.com/api/notes/${note.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note),
            })
            if (!res.ok) throw new Error('Failed to update note')
            return res.json()
        },
        onSuccess: (updatedNote) => {
            queryClient.setQueryData<Note[]>(['notes'], (prev = []) =>
                prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
            )
        },
    })
}
