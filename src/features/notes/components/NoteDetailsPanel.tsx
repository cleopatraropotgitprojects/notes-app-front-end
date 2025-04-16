import { useEffect, useMemo, useState } from 'react'
import { useNotesStore } from '../../../store/notesStore'
import { useUpdateNote } from '../hooks/useUpdateNotes'
import debounce from 'lodash.debounce'

export const NoteDetailsPanel = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const { selectedNote, updateNoteLive } = useNotesStore()
  const { mutate: updateNote } = useUpdateNote()

  const debouncedSave = useMemo(
    () =>
      debounce((note) => {
        setIsSaving(true)
        updateNote(note, {
          onSuccess: () => {
            setIsSaving(false)
            setJustSaved(true)
            setTimeout(() => setJustSaved(false), 1000)
          },
        })
      }, 10),
    [updateNote]
  )

  useEffect(() => {
    return () => debouncedSave.cancel()
  }, [debouncedSave])

  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const isSave = (isMac && e.metaKey && e.key === 's') || (!isMac && e.ctrlKey && e.key === 's')

      const isInputFocused =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'

      if (isSave && isInputFocused) {
        e.preventDefault()
        if (selectedNote) {
          updateNote(selectedNote)
        }
      }
    }

    document.addEventListener('keydown', handleSaveShortcut, true)
    return () => document.removeEventListener('keydown', handleSaveShortcut, true)
  }, [selectedNote, updateNote])

  if (!selectedNote) {
    return (
      <div className="flex-1 h-full bg-white px-10 py-8 flex items-center justify-center text-gray-400">
        <p className="text-sm">📝 Select a note to view or create a new one</p>
      </div>
    )
  }

  const handleChange = (field: 'title' | 'description', value: string) => {
    updateNoteLive({ [field]: value })
    debouncedSave({ ...selectedNote, [field]: value })
  }

  const handleTagsChange = (newTags: string[]) => {
    updateNoteLive({ tags: newTags })
    debouncedSave({ ...selectedNote, tags: newTags })
  }

  return (
    <div className="flex-1 h-full bg-white px-10 py-8 overflow-auto border-l">
      <div className="text-sm text-gray-400 mb-2 h-5 transition-opacity duration-300">
        {isSaving ? 'Saving...' : justSaved ? 'Saved ✓' : ''}
      </div>
      <input
        value={selectedNote.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Enter a title"
        className="text-2xl font-bold mb-2 w-full outline-none"
      />
      <textarea
        value={selectedNote.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Start writing here..."
        className="w-full text-gray-600 text-sm mb-6 leading-relaxed resize-none h-40 outline-none"
      />
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-1">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {selectedNote.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full flex items-center gap-1"
            >
              #{tag}
              <button
                onClick={() => {
                  const updated = selectedNote.tags?.filter((_, i) => i !== idx) || []
                  handleTagsChange(updated)
                }}
                className="text-gray-400 hover:text-red-500 text-[10px]"
              >
                ✕
              </button>
            </span>
          ))}

          <input
            type="text"
            placeholder="Add tag"
            className="text-xs border px-2 py-1 rounded-full outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                e.preventDefault()
                const value = e.currentTarget.value.trim().replace(/^#/, '')
                if (!selectedNote.tags?.includes(value)) {
                  handleTagsChange([...(selectedNote.tags || []), value])
                  e.currentTarget.value = ''
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
