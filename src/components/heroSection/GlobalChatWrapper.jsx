import { useState, useEffect } from "react";
import ChatMain from "../chatPopup/ChatMain";

const GlobalChatWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggleEvent = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-chat", handleToggleEvent);

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("toggle-chat", handleToggleEvent);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <ChatMain isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export default GlobalChatWrapper;
