import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Note } from './useNotes'

export const useCreateNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            const res = await fetch('https://notes-app-backend-gkkz.onrender.com/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
            if (!res.ok) throw new Error('Error creating note')
            return res.json()
        },
        onSuccess: (newNote: Note) => {
            queryClient.setQueryData<Note[]>(['notes'], (prev = []) => [newNote, ...prev])
        }
    })
}
