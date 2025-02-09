import Button from "./button"

const Hero = () => {
    return (
        <section className="ui-max-w-7xl ui-mx-auto ui-flex-1 ui-flex ui-flex-col ui-justify-center ">
        <h1 className="ui-mt-28 ui-text-center ui-font-display ui-text-4xl ui-font-medium ui-text-white ui-sm:text-5xl ui-sm:leading-[1.15]">
          Write, Inspire, and Connect with the World 
       </h1>
       <div className="ui-flex ui-justify-center ui-mt-4">
       <Button>Start Reading</Button>
       </div>
     </section>
    )
}

export default Hero