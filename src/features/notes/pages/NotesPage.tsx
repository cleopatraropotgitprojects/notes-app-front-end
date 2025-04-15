import Button from "../../../components/atoms/Button";
import {StickyNote, Trash2} from "lucide-react"
import {useEffect, useState} from "react";
import CreateNoteModal from "../components/CreateNoteModal";
import {motion, AnimatePresence} from "framer-motion";
import MainLayout from "../../../layouts/MainLayout";

type Note = {
    id: string
    title: string
    content: string
}

const NotesPage = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [showModal, setShowModal] = useState(false)

// Load din localStorage
    useEffect(() => {
        const stored = localStorage.getItem("notes")
        if (stored) {
            setNotes(JSON.parse(stored))
        }
    }, [])

// Save în localStorage
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const addNote = (note: { title: string; content: string }) => {
        const newNote: Note = {
            id: Date.now().toString(),
            ...note,
        }
        setNotes((prev) => [newNote, ...prev])
    }

    const deleteNote = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if (confirm) {
            setNotes((prev) => prev.filter((n) => n.id !== id))
        }
    }
    return (
        <MainLayout>
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">My Notes</h1>
                    <Button onClick={() => setShowModal(true)}>Create Note</Button>
                </div>

                {notes.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 space-y-4 mt-20">
                        <StickyNote className="mx-auto w-14 h-14 text-gray-400 dark:text-gray-600" />
                        <p className="text-lg">No notes yet. Create your first one!</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {notes.map((note) => (
                                <motion.div
                                    key={note.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg font-semibold">{note.title}</h2>
                                        <button onClick={() => deleteNote(note.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 line-clamp-4 whitespace-pre-line">
                                        {note.content}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {showModal && (
                    <CreateNoteModal onClose={() => setShowModal(false)} onSave={addNote} />
                )}
            </div>
        </main>
        </MainLayout>
    )
}

export default NotesPage
