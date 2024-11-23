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

  function play(evt) {
    evt.preventDefault();
    if (document.querySelector(".theVideo").paused === true) {
      document.querySelector(".theVideo").play();
    } else {
      document.querySelector(".theVideo").pause();
    }
  }

  function openDial(evt) {
    evt.preventDefault();
    dispatch(userSlice.actions.setContactMenu(!discuss));
    //bd.classList.add("bdMini");
    /*if (bd !== null) {
      if (bd.classList.contains("bdMini") === true) {
        dispatch(userSlice.actions.setContactMenu(true));
        //bd.classList.remove("bdMini");
        //bd.classList.add("bdMaxi");
      } else {
        dispatch(userSlice.actions.setContactMenu(false));
      }
    }*/
  }
  return (
    <div className="accueilField">
      <div className="intro">
        {language === "FR" ? <h1> Développeur web</h1> : <h1>Web developer</h1>}
      </div>
      <div className="videoInReact">
        <div className="softSkills">
          <div className="oneSkill">
            {language === "FR" ? (
              <p>Passionne, Integre,</p>
            ) : (
              <p>Passionate, impartial,</p>
            )}
          </div>

          <div className="oneSkill">
            {language === "FR" ? (
              <p>Creatif, Curieux</p>
            ) : (
              <p>Creative, Curious</p>
            )}
          </div>

          <div className="oneSkill">
            {language === "FR" ? <p>et Determine.</p> : <p>and Determined.</p>}
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
            <p>React.js,</p>
          </div>
          <div className="oneSkill">
            <p>Node.js</p>
          </div>
          <div className="oneSkill">
            {language === "FR" ? (
              <p>quenouilles quantiques</p>
            ) : (
              <p>quantum distaffs</p>
            )}
          </div>
          <div className="negatif"></div>
        </div>
      </div>
      <div className="contactIndication">
        {language === "FR" ? (
          <p
            className="contactMe discussContent"
            onClick={(evt) => openDial(evt)}
          >
            contactez-moi
          </p>
        ) : (
          <p
            className="contactMe discussContent"
            onClick={(evt) => openDial(evt)}
          >
            contact me
          </p>
        )}
      </div>
    </div>
  );
}

export default Accueil;
