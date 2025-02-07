import Button from "./button"
const nav = () => {
    return (
        <div className="ui-flex ui-justify-between ui-items-center ui-p-4">
        <div className="ui-text-stone-300 flex">
            LOGO
        </div>
        <div className="ui-flex ui-justify-between ui-items-center ui-space-x-12">
        <a className="ui-text-stone-300" href="">Subscribe</a>
        <a className="ui-text-stone-300" href="">Contact</a>
        <a className="ui-text-stone-300" href="">Our Story</a>
        </div>
        <div className="ui-flex ui-justify-between ui-space-x-4">
        <Button>Sign in</Button>
        <Button>Get Started</Button>
        </div>
    </div>
    )
}

export default nav