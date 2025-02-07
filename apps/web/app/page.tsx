import Nav from "@repo/ui/nav"
import Carousel  from "@repo/ui/carousel";
import Button from "@repo/ui/button";
import Subscription from "@repo/ui/subscription"

export default function Page() {
  return (<div>
      <Nav></Nav>
      <section className="h-screen justify-center ">
         <h1 className="mt-28 text-center font-display text-4xl font-medium text-white sm:text-5xl sm:leading-[1.15]">
           Write, Inspire, and Connect with the World 
        </h1>
        <div className="flex justify-center mt-4">
        <Button>Start Reading</Button>
        </div>
        <Carousel></Carousel>
      </section>
      <Subscription />
  </div>
  );
}
