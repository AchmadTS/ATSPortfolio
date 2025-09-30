import { useState } from "react";
import AboutMeMain from "./components/aboutMeSection/AboutMeMain";
import ContactMeMain from "./components/contactMeSection/ContactMeMain";
import ExperienceMain from "./components/experienceSection/ExperienceMain";
import FooterMain from "./components/footer/FooterMain";
import HeroGradient from "./components/heroSection/HeroGradient";
import HeroMain from "./components/heroSection/HeroMain";
import NavbarMain from "./components/navbar/NavbarMain";
import ProjectsMain from "./components/projectsSection/ProjectsMain";
import SchoolsMain from "./components/schoolsSection/SchoolsMain";
import SkillsMain from "./components/skillsSection/SkillsMain";
import SubSkills from "./components/skillsSection/SubSkills";
import SubHeroMain from "./components/subHeroSection/SubHeroMain";
import ChatMain from "./components/chatPopup/ChatMain";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="font-body text-white relative overflow-hidden">
      <NavbarMain />
      <HeroMain />
      <HeroGradient />
      <SubHeroMain />
      <AboutMeMain />
      <SkillsMain />
      <SubSkills />
      <ExperienceMain />
      <ProjectsMain />
      <SchoolsMain />
      <ContactMeMain />
      <FooterMain />

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-orange hover:bg-darkOrange flex items-center justify-center shadow-lg transition"
      >
        💬
      </button>

      <ChatMain isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}

export default App;
