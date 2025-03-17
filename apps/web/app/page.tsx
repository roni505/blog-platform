import Nav from "@repo/ui/nav"
import Carousel  from "@repo/ui/carousel";
import TechStack from "@repo/ui/tech-stack"
import Subscription from "@repo/ui/subscription";
import Footer from "@repo/ui/footer";
import Hero from "@repo/ui/hero";

import { Lexend } from "next/font/google";

const lexend = Lexend({subsets: ["latin"]});

export default function Page() {
  return (
      <div className={lexend.className}>
          <Nav />
          <Hero />
          <Carousel />
          <TechStack />
          <Subscription/>
          <Footer/>
      </div>
  );
}
