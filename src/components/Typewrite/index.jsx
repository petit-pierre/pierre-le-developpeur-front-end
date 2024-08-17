import { useEffect, useState } from "react";
import "./typewrite.css";

function Typewrite({ props }) {
  let timer;
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);

  const handleGenerate = () => {
    if (started) {
      return;
    }
    setStarted(true);
    let i = -1;
    timer = setInterval(() => {
      i++;
      if (i === props.text.length - 1) clearInterval(timer);
      setText((prev) => prev + props.text[i]);
    }, 80);
  };

  /*
  const handleReset = () => {
    setText("");
    clearInterval(timer);
    setStarted(false);
  };
  */

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  handleGenerate();
  return (
    <div className="autoTyper">
      <span>{text}</span>
    </div>
  );
}
export default Typewrite;
