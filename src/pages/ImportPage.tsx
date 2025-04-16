import { useState } from 'react'
import { useCreateNote } from '../features/notes/hooks/useCreateNote'
import { extractPdfText } from '../lib/extractPdfText'
import { UploadCloud } from 'lucide-react'

export const ImportPage = () => {
  const { mutateAsync: createNote } = useCreateNote()
  const [message, setMessage] = useState('')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setMessage('Importing...')
    try {
      const content = await extractPdfText(file)

      await createNote({
        title: file.name.replace(/\.[^/.]+$/, ''),
        description: content,
        tags: ['imported'],
      })

      setMessage(' Imported successfully!')
    } catch (err) {
      console.error(err)
      setMessage(' Failed to import.')
    }
  }

  return (
    <div className="w-full flex items-center justify-center bg-white px-4">
      <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <div className="flex justify-center mb-4 text-yellow-500">
          <UploadCloud size={32} />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Import a File</h2>
        <p className="text-sm text-gray-500 mb-6">Supported: .txt (pdf coming soon)</p>

        <label className="block w-full cursor-pointer">
          <input type="file" accept=".txt" onChange={handleFile} className="hidden" />
          <div className="w-full py-3 px-6 border border-dashed border-yellow-400 rounded-lg hover:bg-yellow-50 transition text-sm text-gray-600 font-medium">
            Click to upload
          </div>
        </label>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  )
}
