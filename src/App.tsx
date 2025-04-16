import React from 'react'
import { Sidebar } from './components/organisms/Sidebar'
import { Header } from './components/organisms/Header'
import { NoteDetailsPanel } from './features/notes/components/NoteDetailsPanel'
import { NoteList } from './features/notes/components/NoteList'
import { AnimatePresence, motion } from 'framer-motion'
import { useNotesStore } from './store/notesStore'

const App = () => {
  const selectedNote = useNotesStore((s) => s.selectedNote)

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 overflow-hidden">
          <NoteList />
          <AnimatePresence mode="wait">
            {selectedNote && (
              <motion.div
                key={selectedNote.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-1 h-full bg-white px-10 py-8 overflow-auto border-l"
              >
                <NoteDetailsPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
