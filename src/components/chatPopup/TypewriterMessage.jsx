import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "./MarkdownComponents";

// eslint-disable-next-line react/prop-types
const TypewriterMessage = ({ content, onDone, alreadyTyped }) => {
  const [displayed, setDisplayed] = useState(alreadyTyped ? content : "");

  useEffect(() => {
    if (alreadyTyped) return;

    const typingSpeed = 20;
    const startTime = Date.now();
    const fullText = content;
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const expectedCharCount = Math.floor(elapsedTime / typingSpeed);

      if (expectedCharCount >= fullText.length) {
        setDisplayed(fullText);
        clearInterval(interval);
        onDone();
      } else {
        setDisplayed(fullText.substring(0, expectedCharCount));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [content, alreadyTyped, onDone]);

  return (
    <ReactMarkdown components={markdownComponents}>{displayed}</ReactMarkdown>
  );
};

export default TypewriterMessage;
