import { FileText, Download, Trash2, LayoutDashboard, Code, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useCreateNote } from '../../features/notes/hooks/useCreateNote'
import { useNotesStore } from '../../store/notesStore'
import { useState } from 'react'
import { TrashModal } from '../modals/TrashModal'
import { useNavigate } from 'react-router-dom'

const navTop = [
  { label: 'Templates', icon: FileText, active: false },
  { label: 'Import', icon: Download, active: false },
  { label: 'Trash', icon: Trash2, active: false },
]

const workspace = [
  { label: 'Dashboard', icon: LayoutDashboard, active: false },
  { label: 'Notes', icon: FileText, active: false },
  { label: 'Development', icon: Code, active: false },
]

export const Sidebar = () => {
  const { mutateAsync: createNote } = useCreateNote()
  const setSelectedNote = useNotesStore((s) => s.setSelectedNote)
  const [showTrash, setShowTrash] = useState(false)
  const navigate = useNavigate()

  const handleAddNote = async () => {
    const newNote = await createNote({})
    setSelectedNote(newNote)
    navigate('/notes')
  }

  return (
    <aside className="w-64 h-screen border-r px-5 py-6 flex flex-col justify-between bg-white">
      <div>
        <nav className="space-y-4">
          {navTop.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-sm text-black hover:opacity-80 cursor-pointer"
              onClick={() => {
                if (label === 'Trash') {
                  setShowTrash(true)
                } else if (label === 'Templates') {
                  navigate('/templates')
                } else if (label === 'Import') {
                  navigate('/import')
                }
              }}
            >
              <Icon size={18} />
              {label}
            </div>
          ))}
        </nav>
        <div className="mt-8">
          <p className="text-xs text-gray-400 uppercase mb-2">Workspace</p>
          <div className="space-y-3">
            {workspace.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={cn(
                  'flex items-center justify-between cursor-pointer group',
                  active ? 'text-black font-medium' : 'text-gray-400 hover:text-black'
                )}
                onClick={() => {
                  if (label === 'Dashboard') {
                    navigate('/dashboard')
                  } else if (label === 'Development') {
                    navigate('/development')
                  } else if (label === 'Notes') {
                    navigate('/notes')
                  }
                }}
              >
                <div className="flex items-center gap-3 text-sm">
                  <Icon size={18} />
                  {label}
                </div>
              </div>
            ))}
            <button
              onClick={handleAddNote}
              className="text-sm text-yellow-500 flex items-center gap-2 hover:opacity-80"
            >
              <Plus size={18} />
              New Page
            </button>
          </div>
        </div>
      </div>
      {showTrash && <TrashModal onClose={() => setShowTrash(false)} />}
    </aside>
  )
}
