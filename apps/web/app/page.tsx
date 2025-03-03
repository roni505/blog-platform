import Nav from "@repo/ui/nav"
import Carousel  from "@repo/ui/carousel";
import Subscription from "@repo/ui/subscription";
import Footer from "@repo/ui/footer";
import Hero from "@repo/ui/hero";
import Stack from "@repo/ui/stack"

export default function Page() {
  return (
      <div>
          <Nav />
          <Hero />
          <Carousel />
          <Stack />
          <Subscription/>
          <Footer/>
      </div>
  );
}
