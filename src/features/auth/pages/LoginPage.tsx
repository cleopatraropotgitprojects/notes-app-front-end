import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import Button from "../../../components/atoms/Button";

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError("Email and password are required.")
            return
        }

        localStorage.setItem("token", "fake-token-123")
        navigate("/notes")
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Login</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back 👋</p>
                </div>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-black"
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <Button type="submit" className="w-full">Login</Button>
            </form>
        </main>
    )
}

export default LoginPage
