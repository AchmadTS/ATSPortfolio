import { useState, useEffect } from "react";
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
  const [showCtrlKPopup, setShowCtrlKPopup] = useState(false);
  useEffect(() => {
    setShowCtrlKPopup(true);

    const timer = setTimeout(() => {
      setShowCtrlKPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsChatOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

      {showCtrlKPopup && (
        <div className="fixed bottom-6 left-6 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Ctrl + K to chat with aTs Copilot
        </div>
      )}

      <ChatMain isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}

export default App;
