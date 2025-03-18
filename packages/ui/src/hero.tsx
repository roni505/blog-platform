import Button from "./button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

const Hero = () => {
    return (
        <section className="p-6 lg:max-w-7xl mx-auto flex flex-col justify-center mt-6 lg:mt-7">
        <h1 className="w-full lg:max-w-2xl mx-auto mt-28 text-center tracking-wide text-white text-4xl sm:text-5xl sm:leading-[1.15] lg:text-6xl lg:leading-snug font-medium">
                <Balancer>Write Effortlessly. Publish Instantly.</Balancer>
            </h1>
            <div className="flex justify-center mt-9">
                <Link href="/Blogs">
                    <Button text="Start reading" variant="secondary" size="lg" />
                </Link>
            </div>
        </section>
    );
};

export default Hero;
