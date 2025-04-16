import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useTrashNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`https://notes-app-backend-gkkz.onrender.com/api/notes/${id}/trash`, {
        method: 'PATCH',
      })
      if (!res.ok) throw new Error('Failed to trash note')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['trashed-notes'] })
    },
  })
}
