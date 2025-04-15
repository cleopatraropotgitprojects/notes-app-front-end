import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

const DarkModeToggle = () => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const isDark = localStorage.getItem("theme") === "dark"
        setDark(isDark)
        document.documentElement.classList.toggle("dark", isDark)
    }, [])

    const toggle = () => {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle("dark", next)
        localStorage.setItem("theme", next ? "dark" : "light")
    }

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
            aria-label="Toggle Dark Mode"
        >
            {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-800" />}
        </button>
    )
}

export default DarkModeToggle
