import React from "../React";
import Button from "../Button";
import "./accueil.css";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../Slices/userSlice";

function Accueil() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);

  let Hscreen = window.innerHeight;
  if (Hscreen < 650) {
    Hscreen = 650;
  }

  function openDial(evt) {
    evt.preventDefault();
    document.querySelector(".headerLogos").click();
  }
  return (
    <div className="accueilField">
      <div className="intro">
        {language === "FR" ? <h1>Développeur web</h1> : <h1>Web developer</h1>}
      </div>
      <div className="videoInReact">
        <div className="softSkills">
          <div className="oneSkill">
            {language === "FR" ? (
              <h3>Passionné, Intégre,</h3>
            ) : (
              <h3>Passionate, impartial,</h3>
            )}
          </div>

          <div className="oneSkill">
            {language === "FR" ? (
              <h3>Créatif, Curieux</h3>
            ) : (
              <h3>Creative, Curious</h3>
            )}
          </div>

          <div className="oneSkill">
            {language === "FR" ? (
              <h3>et Détérminé.</h3>
            ) : (
              <h3>and Determined.</h3>
            )}
          </div>
          <div className="negatif"></div>
        </div>
        <div className="react">
          <React></React>
        </div>
        <div className="buttonPlace">
          {language === "FR" ? (
            <a
              href={translations.french.cv}
              download="CV-aubree-pierre.pdf"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={language === "FR" ? 12 : -1}
            >
              <Button
                props={{
                  style: "purpleAndWitheTextarea",
                  send: true,
                  title: "Telechargez mon C.V",
                }}
              ></Button>
            </a>
          ) : (
            <a
              href={translations.english.cv}
              download="CV-aubree-pierre.pdf"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={language === "ENG" ? 12 : -1}
            >
              <Button
                props={{
                  style: "purpleAndWitheTextarea",
                  send: true,
                  title: "Download my C.V",
                }}
              ></Button>
            </a>
          )}
        </div>

        <div className="hardSkills">
          <div className="oneSkill">
            <h3>React.js,</h3>
          </div>
          <div className="oneSkill">
            <h3>Node.js</h3>
          </div>
          <div className="oneSkill">
            {language === "FR" ? (
              <h3>quenouilles quantiques</h3>
            ) : (
              <h3>quantum distaffs</h3>
            )}
          </div>
          <div className="negatif"></div>
        </div>
      </div>
      <div className="contactIndication">
        <button
          className="contactMe discussContent"
          onClick={(evt) => openDial(evt)}
          tabIndex={12}
        >
          <img
            className="discussContent"
            src="https://pierre-le-developpeur.com/assets/send_mail.png"
            alt="logo mail"
          ></img>
        </button>
        <p>contact@pierre-le-developpeur.com</p>
      </div>
    </div>
  );
}

export default Accueil;
