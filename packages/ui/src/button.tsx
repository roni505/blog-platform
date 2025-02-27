type ButtonProps = {
    text: string,
    variant: "primary" | "secondary",
    onClick?: () => void,
    size?: "sm" | "md" | "lg",
    type?: "submit" | "reset" | "button",
    disabled?: boolean
}

const variantStyle = {
    primary: "ui-bg-dark ui-text-white ui-border-strokeColor ui-border",
    secondary: "ui-bg-gray-800 ui-text-gray-400"
}

const disabledStyle = "ui-opacity-50 ui-cursor-not-allowed";

const sizeStyle = {
    lg: "ui-px-6 ui-py-4 ui-rounded-[14px]",
    md: "ui-px-2 ui-py-1.0 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300",
    sm: "ui-px-1 ui-py-0.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300"
}

const responsiveSize = "ui-text-base ui-px-4 ui-py-2 ui-lg:px-6 ui-lg:py-4 ui-lg:text-lg ui-text-base"

const Button = (
    {
        text,
        variant,
        onClick,
        size = "md",
        type,
        disabled = false
    }: ButtonProps
) => {
    return (
        <button 
        className={`${responsiveSize} ${variantStyle[variant]} ${sizeStyle[size]} ${disabled ? disabledStyle : ""} `}
        onClick={!disabled ? onClick : undefined}
        type={type}
        disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button