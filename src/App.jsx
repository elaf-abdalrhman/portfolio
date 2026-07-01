import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import LevelRail from './components/LevelRail'
import ScrollStage from './components/ui/ScrollStage'
import Galaxy from './components/Galaxy'

export default function App() {
  return (
    <>
      <Galaxy />
      <ScrollProgress />
      <Nav />
      <LevelRail />
      <main className="relative z-10">
        <Hero />
        <ScrollStage>
          <About />
        </ScrollStage>
        <ScrollStage>
          <Experience />
        </ScrollStage>
        <ScrollStage>
          <Projects />
        </ScrollStage>
        <ScrollStage>
          <Skills />
        </ScrollStage>
        <ScrollStage>
          <Education />
        </ScrollStage>
      </main>
      <Contact />
    </>
  )
}
