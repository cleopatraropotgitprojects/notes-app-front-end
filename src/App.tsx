import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/organisms/Sidebar'
import { Header } from './components/organisms/Header'
import { DynamicNoteDetailsPanel } from './features/notes/components/panels/NoteDetailsPanel'
import { NoteListPage } from './features/notes/components/NoteList'
import { AnimatePresence, motion } from 'framer-motion'
import { useNotesStore } from './store/notesStore'
import { TemplatesPage } from './features/templates'
import { ImportPage } from './pages/ImportPage'
import { DashboardPage } from './pages/DashboardPage'

const MainLayout = () => {
  const selectedNote = useNotesStore((s) => s.selectedNote)

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NoteListPage />
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
                        <DynamicNoteDetailsPanel />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              }
            />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  )
}

export default App
