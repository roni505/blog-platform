import Button from "./button";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto flex-1 flex flex-col justify-center">
            <h1 className="mt-28 text-center font-display text-5xl leading-snug tracking-wide font-semibold text-white sm:text-5xl sm:leading-[1.15]">
                Write, Inspire, and Connect with the World
            </h1>
            <div className="flex justify-center mt-4">
                <Link href="/blogs">
                    <Button text="Start reading..." variant="primary" size="lg" />
                </Link>
            </div>
        </section>
    );
};

export default Hero;
