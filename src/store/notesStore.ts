import { create } from 'zustand'
import {Note} from "../features/notes/hooks/useNotes";

type NoteStore = {
    selectedNote: Note | null
    setSelectedNote: (note: Note | null) => void
    updateNoteLive: (fields: Partial<Note>) => void
}

export const useNotesStore = create<NoteStore>((set) => ({
    selectedNote: null,
    setSelectedNote: (note) => set({ selectedNote: note }),
    updateNoteLive: (fields) =>
        set((state) =>
            state.selectedNote ? { selectedNote: { ...state.selectedNote, ...fields } } : {}
        ),
}))
