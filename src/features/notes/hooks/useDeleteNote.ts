import { useMutation, useQueryClient } from '@tanstack/react-query'
import {useNotesStore} from "../../../store/notesStore";

export const useDeleteNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`https://notes-app-backend-gkkz.onrender.com/api/notes/${id}`, {
                method: 'DELETE'
            })
            if (!res.ok) throw new Error('Failed to delete note')
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })

            const current = useNotesStore.getState().selectedNote
            if (current?.id === id) {
                useNotesStore.getState().setSelectedNote(null)
            }
        }
    })
}
