import { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const CopyButton = ({ text, isUser = false }) => {
  const [copied, setCopied] = useState(false);
  const stripMarkdown = (md) => {
    return md
      .replace(/\|/g, " ")
      .replace(/[-|]{3,}/g, "")
      .replace(/<\/?br\s*\/?>/gi, "\n")
      .replace(/•\s+/g, "\n- ")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  const handleCopy = async (e) => {
    e.preventDefault();

    const cleanText = stripMarkdown(text);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(cleanText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = cleanText;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`mt-2 py-2 pr-2 flex items-center gap-1.5 text-xs transition-colors duration-300 cursor-pointer select-none ${
        isUser
          ? "text-white/70 hover:text-white"
          : "text-cyan hover:text-orange"
      }`}
    >
      {copied ? (
        <FaCheck className={isUser ? "text-white" : "text-green-400"} />
      ) : (
        <FaRegCopy />
      )}
      <span
        className={copied ? (isUser ? "text-white" : "text-green-400") : ""}
      >
        {copied
          ? "Berhasil disalin!"
          : isUser
            ? "Salin Perintah"
            : "Salin Response"}
      </span>
    </button>
  );
};

export default CopyButton;
