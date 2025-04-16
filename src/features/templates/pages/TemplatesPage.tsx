import { useNavigate } from 'react-router-dom'
import { useCreateNote } from '../../notes/hooks/useCreateNote'
import { useNotesStore } from '../../../store/notesStore'

const templates = [
  {
    icon: '📝',
    title: 'Simple Note',
    description: 'Blank note with no structure',
    slug: 'simple',
  },
  {
    icon: '📋',
    title: 'To-do List',
    description: 'Checklist with predefined tasks',
    slug: 'todo',
  },
]

const getTemplateContent = (slug: string) => {
  switch (slug) {
    case 'todo':
      return {
        title: 'To-do List',
        description: '- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3',
        tags: ['todo', 'checklist'],
      }
    default:
      return {
        title: '',
        description: '',
        tags: [],
      }
  }
}

export const TemplatesPage = () => {
  const navigate = useNavigate()
  const { mutateAsync: createNote } = useCreateNote()
  const setSelectedNote = useNotesStore((s) => s.setSelectedNote)

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📁 Templates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.slug}
            className="border rounded-lg p-5 bg-gray-50 hover:shadow-md transition cursor-pointer"
            onClick={async () => {
              const content = getTemplateContent(template.slug)
              const note = await createNote(content)
              setSelectedNote(note)
              navigate('/')
            }}
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>{template.icon}</span> {template.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{template.description}</p>
            <button className="mt-4 text-yellow-600 text-sm hover:underline">
              Use this template →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
