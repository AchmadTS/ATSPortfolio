import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "./MarkdownComponents";

// eslint-disable-next-line react/prop-types
const TypewriterMessage = ({ content, onDone, alreadyTyped }) => {
  const [displayed, setDisplayed] = useState(alreadyTyped ? content : "");
  // eslint-disable-next-line react/prop-types
  const [index, setIndex] = useState(alreadyTyped ? content.length : 0);
  useEffect(() => {
    if (alreadyTyped) return;

    // eslint-disable-next-line react/prop-types
    if (index < content.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + content[index]);
        setIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else {
      onDone();
    }
  }, [index, content, alreadyTyped, onDone]);

  return (
    <ReactMarkdown components={markdownComponents}>{displayed}</ReactMarkdown>
  );
};

export default TypewriterMessage;