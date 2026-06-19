import Navbar from "@/components/Navbar";
import ScrollySection from "@/components/ScrollySection";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollySection />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
