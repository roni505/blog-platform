import { ReactNode } from "react"

type ButtonProps = {
    text: string,
    variant: "primary" | "secondary",
    onClick?: () => void,
    size: "sm" | "md" | "lg";
    type?: "submit" | "reset" | "button";
}

const variantStyle = {
    primary: "ui-bg-white ui-px-4 ui-py-1.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300",
    secondary: "ui-bg-white ui-px-4 ui-py-1.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-500"
}

const sizeStyle = {
    sm: "ui-bg-white ui-px-4 ui-py-1.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300",
    md: "ui-bg-white ui-px-2 ui-py-1.0 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300",
    lg: "ui-bg-white ui-px-1 ui-py-0.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300"
}

const Button = (
    {
        text,
        variant,
        onClick,
        size,
        type
    }: ButtonProps
) => {
    return (
        <button 
        className={`${variantStyle[variant]} ${sizeStyle[size]}`}
        onClick={onClick}
        type={type}
        >
            {text}
        </button>
    )
}

export default Button