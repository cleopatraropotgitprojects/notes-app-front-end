import React from "react";
import {cn} from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary"
}

const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={cn(
                "px-4 py-2 rounded-md font-medium transition-all",
                variant === "primary" && "bg-black text-white hover:bg-gray-800",
                variant === "secondary" && "border border-black text-black hover:bg-gray-100",
                className
            )}
        />
    )
}

export default Button
