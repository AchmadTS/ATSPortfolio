import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegPaperPlane } from "react-icons/fa";
import { LuBot } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "./MarkdownComponents";
import CopyButton from "./CopyButton";
import TypewriterMessage from "./TypewriterMessage";
import { findLocalAnswer, stripBullets } from "./data/chatOptimizer";

// eslint-disable-next-line react/prop-types
const ChatMain = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const API_URL =
    import.meta.env.VITE_IS_DEPLOYMENT === "true"
      ? "/api/chat"
      : "http://localhost:3000/api/chat";

  const isInputDisabled =
    loading || messages.some((msg) => msg.role === "assistant" && !msg.typed);

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

  const suggestions = [
    "What are Achmad's main technical skills?",
    "Tell me about recent projects",
    "What his educational background?",
    "What kind of developer role is he looking for?",
    "What technologies do you use?",
  ];

  const handleSend = async (text) => {
    if (!text.trim() || isInputDisabled) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    const localAnswer = findLocalAnswer(text);
    if (localAnswer) {
      setLoading(true);
      const charCount = localAnswer.length;
      const delay = Math.min(Math.max(charCount * 20, 800), 5000);

      setTimeout(() => {
        const aiMessage = {
          role: "assistant",
          content: localAnswer,
        };
        setMessages((prev) => [...prev, aiMessage]);
        setLoading(false);
      }, delay);

      return;
    }

    setLoading(true);
    try {
      const contextWindow = messages.slice(-4).map((msg) => ({
        ...msg,
        content:
          msg.role === "assistant" ? stripBullets(msg.content) : msg.content,
      }));
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...contextWindow, userMessage] }),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        data = {
          choices: [
            { message: { content: "AI response invalid or timeout." } },
          ],
        };
      }

      const aiMessage = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "No response from AI.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops, something went wrong!" },
      ]);
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
             border border-border-soft shadow-[0_8px_32px_rgba(0,0,0,0.4)]
             overflow-hidden text-white"
          >
            <button
              className="cursor-pointer absolute top-4 right-4 z-50 text-text-muted hover:text-white hover:rotate-90 transition-transform"
              onClick={onClose}
            >
              <IoClose size={22} />
            </button>

            <div
              className="flex items-center gap-3 px-6 pt-6 pb-4 shrink-0 
                  bg-linear-to-br from-card to-card-soft backdrop-blur-2xl"
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
                <p className="text-xs text-text-muted">
                  Powered by OpenRouterAI
                </p>
              </div>
            </div>

            <div className="flex-1 px-6 text-center mt-7 pb-6 overflow-y-auto overscroll-contain custom-scroll space-y-4">
              {messages.length === 0 && (
                <>
                  <h3 className="text-xl font-bold mb-2 text-orange">
                    Welcome to My AI Assistant!
                  </h3>
                  <p className="text-sm text-white/75 mb-6">
                    Hi! I&apos;m here to help you learn more. Feel free to ask
                    anything!
                  </p>
                  <p className="text-xs text-text-muted mb-3">Try asking:</p>
                  <div className="flex flex-col gap-3">
                    {suggestions.map((text, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (!isInputDisabled) handleSend(text);
                        }}
                        disabled={isInputDisabled}
                        className={`w-full rounded-full border border-border-soft bg-card-soft px-5 py-2.5 
                          text-sm text-white/90 transition shadow-sm
                          ${
                            isInputDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer hover:border-accent hover:text-white hover:bg-accent-soft hover:scale-[1.03] hover:shadow-[0_0_10px_rgba(94,206,220,0.35)] active:scale-[0.97]"
                          }`}
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
                    className={`px-4 py-3 mt-2 rounded-2xl max-w-[85%] wrap-break-word text-left ${
                      msg.role === "user"
                        ? "bg-orange/70 text-white shadow-md"
                        : "bg-card backdrop-blur-2xl border border-border-soft text-white/90 shadow-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <>
                        <TypewriterMessage
                          content={msg.content}
                          alreadyTyped={msg.typed}
                          onDone={() => {
                            setMessages((prev) =>
                              prev.map((m, i) =>
                                i === idx ? { ...m, typed: true } : m,
                              ),
                            );
                          }}
                        />
                        {msg.typed && <CopyButton text={msg.content} />}
                      </>
                    ) : (
                      <>
                        <ReactMarkdown components={markdownComponents}>
                          {msg.content}
                        </ReactMarkdown>
                        <CopyButton text={msg.content} isUser={true} />
                      </>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex flex-col items-center justify-center py-10 space-y-3">
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
                  <p className="text-sm text-text-muted flex items-center gap-1">
                    Thinking
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    >
                      .
                    </motion.span>
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div
              className="px-4 py-5 shrink-0 
              bg-linear-to-br from-card to-card-soft backdrop-blur-2xl"
            >
              <div
                className={`flex items-center rounded-full border px-3 py-2 transition ${
                  isInputDisabled
                    ? "border-border-soft opacity-60 bg-black/10"
                    : "border-border-soft focus-within:border-accent"
                }`}
              >
                <input
                  type="text"
                  maxLength={255}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    isInputDisabled
                      ? "Please wait..."
                      : "Ask me anything (max 255 character)..."
                  }
                  disabled={isInputDisabled}
                  className={`flex-1 bg-transparent outline-none text-sm text-white placeholder-text-muted px-2 ${
                    isInputDisabled ? "cursor-not-allowed" : ""
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isInputDisabled) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (!isInputDisabled) handleSend(inputValue);
                  }}
                  disabled={isInputDisabled}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition shadow-md ${
                    isInputDisabled
                      ? "bg-white/10 text-white/30 cursor-not-allowed"
                      : "cursor-pointer bg-linear-to-r from-orange to-darkOrange hover:from-lightOrange hover:to-orange text-white"
                  }`}
                >
                  <FaRegPaperPlane className="text-base" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatMain;
