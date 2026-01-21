import { useState, useEffect } from "react";
import { FiCommand } from "react-icons/fi";
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
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setShowCtrlKPopup(true);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowCtrlKPopup(false), 800);
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
        <div
          className={`hidden lg:flex fixed bottom-6 left-6 z-50 items-center gap-3 px-5 py-3 bg-gradient-to-r from-gray-800/90 to-gray-700/90 border border-cyan-400/40 backdrop-blur-mdtext-white rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.15)] ${fadeOut ? "animate-slideDownFadeOut" : "animate-slideUpFadeIn"}`}
        >
          <span className="text-cyan-300 text-lg">
            <FiCommand />
          </span>

          <p className="text-sm font-medium">
            <kbd className="bg-gray-900/60 px-2 py-1 rounded-md border border-white/20 text-xs mr-1">
              Ctrl + K
            </kbd>
            to chat with
            <span className="text-cyan-300 font-semibold"> aTs Copilot</span>
          </p>
        </div>
      )}

      <ChatMain isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}

export default App;
