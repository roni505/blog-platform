import Button from "./button"
import Link from 'next/link'

const Hero = () => {
    return (
        <section className="ui-max-w-7xl ui-mx-auto ui-flex-1 ui-flex ui-flex-col ui-justify-center ">
        <h1 className="ui-mt-28 ui-text-center ui-font-display  ui-text-5xl ui-leading-snug ui-tracking-wide ui-font-semibold ui-text-white ui-sm:text-5xl ui-sm:leading-[1.15]">
          Write, Inspire, and Connect with the World 
       </h1>
       <div className="ui-flex ui-justify-center ui-mt-4">
        <Link href="/blogs">
       <Button text="Start reading..." variant="primary" size="lg" />
        </Link>
       </div>
     </section>
    )
}

export default Hero