import { useEffect, useState } from "react";
import "./typewrite.css";

function Typewrite({ props = {} }) {
  const { text = "", setWriter, writer, bIdx } = props;
  const [typed, setTyped] = useState({ source: "", value: "" });
  const isSequenced =
    Number.isInteger(writer) &&
    Number.isInteger(bIdx) &&
    typeof setWriter === "function";

  useEffect(() => {
    if (isSequenced && writer !== bIdx) return;

    if (!text) {
      if (!isSequenced) return;

      const timeout = setTimeout(() => {
        setWriter((currentWriter) => currentWriter + 1);
      }, 0);

      return () => clearTimeout(timeout);
    }

    let characterIndex = 0;
    let timeout;
    let cancelled = false;

    const typeNextCharacter = () => {
      const discussContainer = document.querySelector(".discuss");
      if (discussContainer !== null) {
        discussContainer.scrollTop = discussContainer.scrollHeight;
      }
      timeout = setTimeout(
        () => {
          if (cancelled) return;

          characterIndex += 1;
          setTyped({ source: text, value: text.slice(0, characterIndex) });

          if (characterIndex < text.length) {
            typeNextCharacter();
          } else if (isSequenced) {
            setWriter((currentWriter) => currentWriter + 1);
          }
        },

        Math.floor(Math.random() * 90 + 10),
      );
    };

    typeNextCharacter();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [bIdx, isSequenced, setWriter, text, writer]);

  if (!text) return null;

  return (
    <p className="autoTyper discussContent">
      <p className="discussContent">
        {typed.source === text ? typed.value : ""}
      </p>
    </p>
  );
}

export default Typewrite;
