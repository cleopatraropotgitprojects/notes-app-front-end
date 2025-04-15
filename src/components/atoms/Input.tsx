import React from "react";

type InputProps = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const Input = ({ value, onChange, placeholder }: InputProps) => (
    <input
        type="text"
        className="w-full px-4 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
)
