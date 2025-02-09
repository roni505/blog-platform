import Button from "./button"

const subscription = () => {
    return (
        <div className="ui-max-w-7xl ui-mx-auto ui-flex ui-flex-col ui-items-center ui-justify-center ui-pt-52 ui-pb-28">
            <div className="ui-text-white ui-text-5xl ui-text-center ui-font-semibold">
            <p>
            Receive Notifications for
            </p>
            <p className="ui-mt-4">
            Every New Post
            </p>
            </div>
            <div className="ui-flex ui-space-x-4 ui-mt-8">
            <input className="ui-bg-slate-900 ui-ps-20" type="email" name="" id="" placeholder="Your email address"/>
            <Button>Subscribe</Button>
            </div>
        </div>
    )
}

export default subscription