import { useState, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'

export const DevelopmentPage = () => {
  const [code, setCode] = useState<string>('// Write your TypeScript code here')

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      <MonacoEditor
        language="typescript"
        value={code}
        onChange={handleEditorChange}
        theme="vs-light"
        height="90%"
      />
    </div>
  )
}
