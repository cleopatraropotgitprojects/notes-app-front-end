import { useState } from "react"
import { X } from "lucide-react"
import Button from "../../../components/atoms/Button";
import { motion } from "framer-motion";

type Props = {
    onClose: () => void
    onSave: (note: { title: string; content: string }) => void
}

const CreateNoteModal = ({ onClose, onSave }: Props) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSave = () => {
        if (!title.trim()) return
        onSave({ title, content })
        onClose()
    }

    return (
        <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <motion.div
                initial={{scale: 0.95, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.95, opacity: 0}}
                transition={{duration: 0.2}}
                className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6 shadow-lg relative"
            >
                <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500" onClick={onClose}>
                    <X />
                </button>

                <h2 className="text-xl font-semibold mb-4">Create Note</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800"
                />
                <textarea
                    rows={5}
                    placeholder="Your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 resize-none"
                />
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CreateNoteModal
