import About from "@/components/About";
import Lander from "@/components/Lander";
import Services from "@/components/Services";
import Why from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Lander />
      <Services />
      <About />
      <Why />
    </>
  );
}
