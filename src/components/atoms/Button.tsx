type ButtonProps = {
    title: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'ghost'
    type?: 'button' | 'submit'
    disabled?: boolean
}

export const Button = ({ title, onClick, variant = 'primary', type = 'button', disabled }: ButtonProps) => {
    const base = 'rounded-xl px-4 py-2 font-medium transition-all'
    const variants = {
        primary: 'bg-black text-white hover:bg-gray-900',
        secondary: 'bg-white border border-gray-300 hover:bg-gray-100',
        ghost: 'bg-transparent hover:bg-gray-100',
    }

    return (
        <button
            className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            type={type}
            disabled={disabled}>
            {title}
        </button>
    )
}
