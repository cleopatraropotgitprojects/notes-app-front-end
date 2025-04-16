import React from 'react'
import { Sidebar } from './components/organisms/Sidebar'
import { Header } from './components/organisms/Header'
import { NoteDetailsPanel } from './features/notes/components/NoteDetailsPanel'
import { NoteList } from './features/notes/components/NoteList'

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 overflow-hidden">
          <NoteList />
          <NoteDetailsPanel />
        </main>
      </div>
    </div>
  )
}

export default App
