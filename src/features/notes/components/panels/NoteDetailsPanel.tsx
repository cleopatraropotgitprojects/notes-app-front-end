import { useEffect, useMemo, useState } from 'react'
import { useNotesStore } from '../../../../store/notesStore'
import { useUpdateNote } from '../../hooks/useUpdateNotes'
import debounce from 'lodash.debounce'
import { motion, AnimatePresence } from 'framer-motion'
import { Combobox } from '@headlessui/react'
import { TodoNoteDetails } from './TodoNoteDetails'

const LOCATION_KEY = 'custom_locations'

const getTemplateType = (tags: string[] = []) => {
  if (tags.includes('todo')) return 'todo'
  return 'simple'
}

export const DynamicNoteDetailsPanel = () => {
  const selectedNote = useNotesStore((s) => s.selectedNote)

  if (!selectedNote) return null

  const type = getTemplateType(selectedNote.tags)

  switch (type) {
    case 'todo':
      return <TodoNoteDetails />
    default:
      return <NoteDetailsPanel />
  }
}

export const NoteDetailsPanel = () => {
  const [locationOptions, setLocationOptions] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [locationQuery, setLocationQuery] = useState('')
  const { selectedNote, updateNoteLive } = useNotesStore()
  const { mutate: updateNote } = useUpdateNote()

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCATION_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setLocationOptions(parsed.filter((x) => typeof x === 'string' && x.trim() !== ''))
        }
      } catch (err) {
        console.error('Failed to parse locations from localStorage', err)
      }
    }
  }, [])

  // Keep locationQuery in sync with selected note
  useEffect(() => {
    setLocationQuery(selectedNote?.location || '')
  }, [selectedNote?.location])

  const safeQuery = (locationQuery || '').toLowerCase()

  const filteredLocations = locationOptions
    .filter((loc): loc is string => typeof loc === 'string' && loc.trim() !== '')
    .filter((loc) => loc.toLowerCase().includes(safeQuery))

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
      }, 400),
    [updateNote]
  )

  useEffect(() => () => debouncedSave.cancel(), [debouncedSave])

  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const isSave = (isMac && e.metaKey && e.key === 's') || (!isMac && e.ctrlKey && e.key === 's')
      const isInputFocused =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'

      if (isSave && isInputFocused) {
        e.preventDefault()
        if (selectedNote) updateNote(selectedNote)
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

  const handleChange = (field: 'title' | 'description' | 'location', value: string) => {
    updateNoteLive({ [field]: value })
    debouncedSave({ ...selectedNote, [field]: value })
  }

  const handleTagsChange = (newTags: string[]) => {
    updateNoteLive({ tags: newTags })
    debouncedSave({ ...selectedNote, tags: newTags })
  }

  const handleLocationSelect = (value: string) => {
    handleChange('location', value)
    setLocationQuery(value)

    if (value && !locationOptions.includes(value)) {
      const updated = [...locationOptions, value]
      setLocationOptions(updated)
      localStorage.setItem(LOCATION_KEY, JSON.stringify(updated))
    }
  }

  return (
    <div className="flex-1 h-full bg-white px-10 py-8 overflow-auto border-l">
      {/* Saving Status */}
      <div className="text-sm text-gray-400 mb-2 h-5 transition-opacity duration-300">
        {isSaving ? 'Saving...' : justSaved ? 'Saved ✓' : ''}
      </div>

      {/* Title */}
      <input
        value={selectedNote.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Enter a title"
        className="text-2xl font-bold mb-2 w-full outline-none"
      />

      {/* Description */}
      <textarea
        value={selectedNote.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Start writing here..."
        className="w-full text-gray-600 text-sm mb-6 leading-relaxed resize-none h-40 outline-none"
      />

      {/* Tags */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-1">Tags</h4>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {selectedNote.tags?.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
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
              </motion.span>
            ))}
          </AnimatePresence>

          {/* Add tag input */}
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

      {/* Location with autocomplete */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
        <Combobox value={selectedNote.location || ''} onChange={handleLocationSelect}>
          <div className="relative">
            <Combobox.Input
              className="text-sm border rounded px-3 py-1 outline-none w-full"
              placeholder="e.g. Remote"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
            <Combobox.Options className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded bg-white border text-sm shadow">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-3 py-1 hover:bg-yellow-100 text-sm cursor-pointer"
                  >
                    <Combobox.Option value={loc} as="div" className="flex-1">
                      {loc}
                    </Combobox.Option>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const updated = locationOptions.filter((l) => l !== loc)
                        setLocationOptions(updated)
                        localStorage.setItem(LOCATION_KEY, JSON.stringify(updated))
                      }}
                      className="ml-2 text-gray-400 hover:text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <Combobox.Option
                  value={locationQuery}
                  className="cursor-pointer px-3 py-1 text-yellow-600 bg-yellow-50"
                >
                  ➕ Add “{locationQuery}”
                </Combobox.Option>
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </div>
  )
}
