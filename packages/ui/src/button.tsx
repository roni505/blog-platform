type ButtonProps = {
    text: string;
    variant: "primary" | "secondary" | "delete";
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
    className?: string;
};

const variantStyle = {
    primary: "text-white border-strokeColor border bg-dark",
    secondary: "text-gray-300 border-strokeColor border",
    delete: "text-white border-red-700 border bg-[#340000] hover:bg-red-800"
};

const disabledStyle = "opacity-50 cursor-not-allowed";

const responsiveSize = "text-base px-4 py-2 lg:text-lg lg:px-6 lg:py-3 rounded-[14px] hover:bg-btnHover";

const Button = ({
    text,
    variant,
    onClick,
    type,
    disabled = false,
    className,
}: ButtonProps) => {
    return (
        <button
            className={` ${className} ${responsiveSize} ${variantStyle[variant]} ${
                disabled ? disabledStyle : ""
            }`}
            onClick={!disabled ? onClick : undefined}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
