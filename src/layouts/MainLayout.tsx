import { useNavigate } from "react-router-dom"
import DarkModeToggle from "../components/atoms/DarkModeToggle";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-lg font-semibold">Notes App</h1>
                <div className="flex items-center gap-3">
                    <DarkModeToggle />
                    <button
                        onClick={logout}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="px-4 py-6 max-w-6xl mx-auto">{children}</main>
        </div>
    )
}

export default MainLayout
