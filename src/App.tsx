import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Approach from "./components/Approach";
import ResumeSection from "./components/ResumeSection";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-accent-ink"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Approach />
        <ResumeSection />
      </main>

      <Contact />

      {/* Subtle cinematic grain */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
