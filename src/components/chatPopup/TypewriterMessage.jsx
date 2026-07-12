import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "./MarkdownComponents";

// eslint-disable-next-line react/prop-types
const TypewriterMessage = ({ content, onDone, alreadyTyped, createdAt }) => {
  const [displayed, setDisplayed] = useState(alreadyTyped ? content : "");
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (alreadyTyped) {
      setDisplayed(content);
      return;
    }

    const startTime = createdAt || Date.now();
    const typingSpeed = 20;
    const fullText = content;
    const initialElapsedTime = Date.now() - startTime;
    let expectedCharCount = Math.floor(initialElapsedTime / typingSpeed);

    if (expectedCharCount >= fullText.length) {
      setDisplayed(fullText);
      if (onDoneRef.current) onDoneRef.current();
      return;
    } else {
      setDisplayed(fullText.substring(0, expectedCharCount));
    }

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const charCount = Math.floor(elapsedTime / typingSpeed);

      if (charCount >= fullText.length) {
        setDisplayed(fullText);
        clearInterval(interval);
        if (onDoneRef.current) onDoneRef.current();
      } else {
        setDisplayed(fullText.substring(0, charCount));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [content, alreadyTyped, createdAt]);

  return (
    <ReactMarkdown components={markdownComponents}>{displayed}</ReactMarkdown>
  );
};

export default TypewriterMessage;
