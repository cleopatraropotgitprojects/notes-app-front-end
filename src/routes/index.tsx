import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NotesPage from "../features/notes/pages/NotesPage";
import LoginPage from "../features/auth/pages/LoginPage";

const AppRoutes = () => {
    const isLoggedIn = localStorage.getItem('token')

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={isLoggedIn ? "/notes" : "/login"} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="*" element={<div className="text-center mt-10">404 Not Found</div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
