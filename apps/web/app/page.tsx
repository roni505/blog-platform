import Nav from "@repo/ui/nav"
import Carousel  from "@repo/ui/carousel";
import Subscription from "@repo/ui/subscription";
import Footer from "@repo/ui/footer";
import Hero from "@repo/ui/hero";

export default function Page() {
  return (<div>
      <Nav />
      <Hero />
      <Carousel />
      <Subscription/>
      <Footer/>
  </div>
  );
}
