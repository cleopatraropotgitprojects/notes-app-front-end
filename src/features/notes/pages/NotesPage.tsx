import Button from "../../../components/atoms/Button";
import { StickyNote } from "lucide-react"

const NotesPage = () => {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <StickyNote className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                </div>
                <h1 className="text-2xl font-semibold">No notes yet</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Start organizing your thoughts by creating your first note.
                </p>
                <Button onClick={() => alert("create modal or redirect")}>Create Note</Button>
            </div>
        </main>
    )
}

export default NotesPage
