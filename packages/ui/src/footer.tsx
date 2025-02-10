import Link from "next/link"

const footer = () => {
    return (
        <footer className="ui-max-w-7xl ui-mx-auto ui-flex ui-flex-col ui-space-x-14 ui-justify-center ui-items-center">
            <div className="ui-text-white ui-flex ui-gap-12 ui-pb-12">
            <Link href="">Home</Link>
            <Link href="">Blog</Link>
            <Link href="">Contact</Link>
            <Link href="">Our Story</Link>
            </div>
            <hr className="ui-bg-white ui-w-full" />
            <div className="ui-text-white ui-flex ui-p-12 ui-font- ">
                <h1>
                    Designed and Developed by Roni
                </h1>
            </div>
        </footer>
    )
}

export default footer;