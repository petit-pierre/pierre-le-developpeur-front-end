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

    (function loop() {
      setTimeout(() => {
        i++;
        setText((prev) => prev + props.text[i]);
        if (i !== props.text.length - 1) {
          loop();
        }
      }, randomSpeed(10, 100));
    })();
  };

  const randomSpeed = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  handleGenerate();
  return (
    <div className="autoTyper discussContent">
      <p className="discussContent">{text}</p>
    </div>
  );
}
export default Typewrite;
