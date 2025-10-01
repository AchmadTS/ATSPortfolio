import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegPaperPlane } from "react-icons/fa";
import { LuBot } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const ChatMain = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "What are Achmad' main technical skills?",
    "Tell me about recent projects",
    "What his educational background?",
    "What kind of developer role is he looking for?",
    "What technologies do you use?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "No response from AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        role: "assistant",
        content: "Oops, something went wrong!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
          <motion.div
            key="chat-popup"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative w-[95%] max-w-lg h-[80vh] flex flex-col rounded-3xl
             border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]
             overflow-hidden text-white"
          >
            <button
              className="absolute top-4 right-4 z-50 text-gray-300 hover:text-white hover:rotate-90 transition-transform"
              onClick={onClose}
            >
              <IoClose size={22} />
            </button>

            <div
              className="flex items-center gap-3 px-6 pt-6 pb-4 shrink-0 
                  bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl"
            >
              <motion.div
                animate={{
                  rotate: [0, 360, 360],
                  boxShadow: [
                    "0 0 0px rgba(251, 151, 24, 0.0)",
                    "0 0 10px rgba(251, 151, 24, 0.6)",
                    "0 0 0px rgba(251, 151, 24, 0.0)",
                  ],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1,
                  times: [0, 0.4, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="bg-orange/20 p-2 rounded-full"
              >
                <LuBot className="text-orange text-xl" />
              </motion.div>

              <div>
                <h2 className="text-base font-semibold text-orange">
                  Ask me anything!
                </h2>
                <p className="text-xs text-gray-400">Powered by advanced AI</p>
              </div>
            </div>

            <div className="flex-1 px-6 text-center mt-7 pb-6 overflow-y-auto custom-scroll space-y-4">
              {messages.length === 0 && (
                <>
                  <h3 className="text-xl font-bold mb-2 text-orange">
                    Welcome to My AI Assistant!
                  </h3>
                  <p className="text-sm text-gray-300 mb-6">
                    Hi! I&apos;m here to help you learn more. Feel free to ask
                    anything!
                  </p>
                  <p className="text-xs text-gray-400 mb-3">Try asking:</p>
                  <div className="flex flex-col gap-3">
                    {suggestions.map((text, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(text)}
                        className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-2.5 
                          text-sm text-gray-200 transition shadow-sm
                          hover:border-teal-400 hover:text-white hover:bg-teal-500/20 
                          hover:scale-[1.03] hover:shadow-[0_0_10px_rgba(45,212,191,0.4)] 
                          active:scale-[0.97]"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-3 mt-2 rounded-xl max-w-[70%] ${
                      msg.role === "user"
                        ? "bg-orange/70 text-white"
                        : "bg-gray-700/60 text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div
              className="px-4 py-5 shrink-0 
              bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl"
            >
              <div className="flex items-center rounded-full border border-white/20 px-3 py-2 focus-within:border-teal-400 transition">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-400 px-2"
                  onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                    bg-gradient-to-r from-orange to-darkOrange 
                    hover:from-lightOrange hover:to-orange 
                    transition shadow-md"
                >
                  <FaRegPaperPlane className="text-white text-base" />
                </button>
              </div>
              {loading && (
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Thinking...
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatMain;
