import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode;
}

const Button = (
    {children}: ButtonProps
) => {
    return <div>
        <button className="ui-bg-white ui-px-4 ui-py-1.5 ui-rounded-sm ui-font-bold hover:ui-bg-slate-300">
            {children}
        </button>
    </div>
}

export default Button