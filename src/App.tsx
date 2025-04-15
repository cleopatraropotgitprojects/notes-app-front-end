// src/App.tsx
import React from 'react'
import {Sidebar} from "./components/organisms/Sidebar";
import {Header} from "./components/organisms/Header";
import {NoteDetailsPanel} from "./features/notes/components/NoteDetailsPanel";

const App = () => {
  return (
      <div className="text-center text-xl font-semibold text-yellow-400 mt-10">
          <Header/>
          <div className="flex justify-between">
              <Sidebar/>
              <NoteDetailsPanel/>
          </div>
      </div>
  )
}

export default App
