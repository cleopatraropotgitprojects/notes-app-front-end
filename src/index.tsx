// src/main.tsx sau index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

document.documentElement.classList.add('dark')
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
    </React.StrictMode>
)
