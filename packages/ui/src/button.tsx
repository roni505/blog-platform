type ButtonProps = {
    text: string;
    variant: "primary" | "secondary";
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
};

const variantStyle = {
    primary: "bg-dark text-white border-strokeColor border",
    secondary: "text-gray-300 border-strokeColor border",
};

const disabledStyle = "opacity-50 cursor-not-allowed";

const responsiveSize = "text-base px-4 py-2 lg:text-lg lg:px-6 lg:py-4 rounded-[14px] hover:bg-btnHover";

const Button = ({
    text,
    variant,
    onClick,
    type,
    disabled = false,
}: ButtonProps) => {
    return (
        <button
            className={`${responsiveSize} ${variantStyle[variant]} ${
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
