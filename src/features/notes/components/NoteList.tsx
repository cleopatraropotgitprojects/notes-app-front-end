import { NoteCard } from './NoteCard'
import { useNotes } from '../hooks/useNotes'
import {formatTimeAgo} from "../../../lib/formatTimeAgo";
import {useNotesStore} from "../../../store/notesStore";
import {useDeleteNote} from "../hooks/useDeleteNote";

export const NoteList = () => {
    const { data: notes = [], isLoading } = useNotes()
    const selectedNote = useNotesStore((s) => s.selectedNote)
    const setSelectedNote = useNotesStore((s) => s.setSelectedNote)
    const { mutate: deleteNote } = useDeleteNote()

    return (
        <div className="w-[420px] h-full overflow-auto px-8 py-6 space-y-4 bg-white">
            <h2 className="text-xl font-bold mb-2">Notes</h2>
            {isLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : (
                notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        title={note.title || 'Untitled'}
                        description={note.description || 'No content'}
                        tags={note.tags}
                        time={formatTimeAgo(note.createdAt)}
                        location={note.location}
                        active={selectedNote?.id === note.id}
                        onClick={() => setSelectedNote(note)}
                        onDelete={() => {
                            deleteNote(note.id)
                            if (selectedNote?.id === note.id) {
                                setSelectedNote(null)
                            }
                        }}
                    />
                ))
            )}
        </div>
    )
}
