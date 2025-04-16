import { useQuery } from '@tanstack/react-query'

export type Note = {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  location?: string
  pinned?: boolean
  sharedWithUsersCount?: number
}

export const useNotes = () => {
  return useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await fetch('https://notes-app-backend-gkkz.onrender.com/api/notes')
      if (!res.ok) throw new Error('Failed to fetch notes')
      return res.json()
    },
  })
}
