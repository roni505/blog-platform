type ButtonProps = {
    text: string,
    variant: "primary" | "secondary",
    onClick?: () => void,
    size: "sm" | "md" | "lg";
    type?: "submit" | "reset" | "button";
}

const variantStyle = {
    primary: "ui-bg-white ui-text-black",
    secondary: "ui-bg-gray-800 ui-text-gray-400"
}

const sizeStyle = {
    lg: "ui-px-4 ui-py-1.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300",
    md: "ui-px-2 ui-py-1.0 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300",
    sm: "ui-px-1 ui-py-0.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300"
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