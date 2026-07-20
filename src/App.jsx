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
import CertificateMain from "./components/certificateSection/CertificateMain";
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
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsChatOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleManualOpen = () => setIsChatOpen((prev) => !prev);
    window.addEventListener("toggle-chat", handleManualOpen);
    return () => window.removeEventListener("toggle-chat", handleManualOpen);
  }, []);

  useEffect(() => {
    setShowCtrlKPopup(true);
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowCtrlKPopup(false), 800);
    }, 5000);
    return () => clearTimeout(timer);
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
      <CertificateMain />
      <SchoolsMain />
      <ContactMeMain />
      <FooterMain />

      {showCtrlKPopup && (
        <div
          className={`hidden lg:flex fixed bottom-6 left-6 z-50 items-center gap-3 px-5 py-3 bg-surface/95 border border-accent/35 backdrop-blur-md text-white rounded-xl shadow-accentGlow ${fadeOut ? "animate-slideDownFadeOut" : "animate-slideUpFadeIn"}`}
        >
          <span className="text-accent text-lg">
            <FiCommand />
          </span>
          <p className="text-sm font-medium">
            <kbd className="bg-card px-2 py-1 rounded-md border border-border-soft text-xs mr-1">
              Ctrl + K
            </kbd>
            to chat with
            <span className="text-accent font-semibold"> aTs Copilot</span>
          </p>
        </div>
      )}
      <ChatMain isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}

export default App;
