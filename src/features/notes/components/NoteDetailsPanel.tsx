import {useNotesStore} from "../../../store/notesStore";

export const NoteDetailsPanel = () => {
    const { selectedNote, updateNoteLive } = useNotesStore()

    if (!selectedNote) return <div className="flex-1 bg-white" />

    return (
        <div className="flex-1 h-full bg-white px-10 py-8 overflow-auto border-l">
            <input
                value={selectedNote.title}
                onChange={(e) => updateNoteLive({ title: e.target.value })}
                placeholder="Enter a title"
                className="text-2xl font-bold mb-2 w-full outline-none"
            />
            <textarea
                value={selectedNote.description}
                onChange={(e) => updateNoteLive({ description: e.target.value })}
                placeholder="Start writing here..."
                className="w-full text-gray-600 text-sm mb-6 leading-relaxed resize-none h-40 outline-none"
            />
        </div>
    )
}
