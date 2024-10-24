import { useDispatch, useSelector } from "react-redux";
import "./contact.css";
import { useRef, useState } from "react";
import Typewrite from "../Typewrite";
import Button from "../Button";
import { Typewriter } from "react-simple-typewriter";
import { userSlice } from "../../Slices/userSlice";
import LikeButton from "../LikeButton";
let mailToken = require(`../../code.json`);

function Contact({ props }) {
  const dispatch = useDispatch();

  /*on recupere les valeurs du store redux*/

  const contact = useSelector((state) => state.data.translations);
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);

  /*on declare les differentes erreurs*/

  const [errorMail, setErrorMail] = useState(true);
  const [errorContent, setErrorContent] = useState(true);
  const [wichError, setWichError] = useState("nothing");
  const [sended, setSended] = useState(false);

  /*on recupere les valeurs des champs de formulaires*/

  const content = useRef();
  const mail = useRef();

  /*on gere les erreurs sur le mail avec la methode du formulaire controlé*/

  const formMailError = (e) => {
    e.preventDefault();
    setSended(false);
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(e.target.value)) {
      setErrorMail(false);
      if (errorContent === false) {
        setWichError("nothing");
      } else {
        setWichError("content");
      }
    } else {
      setErrorMail(true);
      setWichError("mail");
    }
  };

  /*on gere les erreurs sur le message avec la methode du formulaire controlé*/

  const formContentError = (e) => {
    e.preventDefault();
    setSended(false);

    if (
      e.target.value.length > 6 &&
      e.target.value !== translations.english.succes &&
      e.target.value !== translations.french.succes &&
      e.target.value !== translations.english.content &&
      e.target.value !== translations.french.content
    ) {
      setErrorContent(false);
      if (errorMail === false) {
        setWichError("nothing");
      } else {
        setWichError("mail");
      }
    } else {
      setErrorContent(true);
      setWichError("content");
    }
  };

  /*fonction pour l'envoi du mail, en cas d'erreur un mailto est utilisé en remplacement*/

  const sendMail = (content, mail, e) => {
    e.preventDefault();
    const elastic = {
      SecureToken: mailToken.code,
      To: "contact@pierre-le-developpeur.com",
      From: "contact@pierre-le-developpeur.com",
      Subject: "Site pierre le developpeur",
      Body:
        "email : " + mail.current.value + " message : " + content.current.value,
    };
    window.Email.send(elastic).then((message) => {
      if (message === "OK") {
        setErrorContent(true);
        content.current.value = "";
        setSended(true);
      } else {
        window.open(
          "mailto:contact@pierre-le-developpeur.com?subject=Contact pierre le développeur&body=" +
            content.current.value
        );
      }
    });
  };

  /*ouverture de la modale*/

  const dial = (evt) => {
    evt.preventDefault();
    document.querySelector(".contact00").focus();
    dispatch(userSlice.actions.setContactMenu(true));
  };

  /*fermeture de la modale au clique*/

  const closeDial = (evt) => {
    evt.preventDefault();
    setSended(false);
    dispatch(userSlice.actions.setContactMenu(false));
  };

  /*fermeture de la modale au clavier pour l'accessibilité*/

  const closeDialByKey = (evt) => {
    if (evt.code === "Enter") {
      closeDial(evt);
    }
  };

  return (
    <div className="contactField">
      <div className={discuss === true ? "witheBack" : "noBack"}></div>
      <img
        src="https://pierre-le-developpeur.com/assets/bd.png"
        className="triangle"
        alt="BD"
      ></img>
      <img
        src="https://pierre-le-developpeur.com/assets/bd.png"
        className="triangleMini"
        alt="BD"
      ></img>
      <div className={discuss === true ? "bd discuss" : "bd noDiscuss"}>
        {discuss === true ? (
          <div className="helloContainer">
            {sended === true ? (
              language === "FR" ? (
                <div className="p">
                  <div className="p">
                    <Typewrite
                      props={{ text: contact.french.succes }}
                    ></Typewrite>
                  </div>
                </div>
              ) : (
                <div className="p">
                  <div className="p">
                    <div>
                      <Typewrite
                        props={{ text: contact.english.succes }}
                      ></Typewrite>
                    </div>
                  </div>
                </div>
              )
            ) : wichError === "nothing" ? (
              language === "FR" ? (
                <div className="p">
                  <Typewrite
                    props={{ text: contact.french.contact }}
                  ></Typewrite>
                </div>
              ) : (
                <div className="p">
                  <div>
                    <Typewrite
                      props={{ text: contact.english.contact }}
                    ></Typewrite>
                  </div>
                </div>
              )
            ) : wichError === "mail" ? (
              language === "FR" ? (
                <div className="p">
                  <div>
                    <div>
                      <Typewrite
                        props={{ text: contact.french.error_mail }}
                      ></Typewrite>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p">
                  <div>
                    <div>
                      <div>
                        <Typewrite
                          props={{ text: contact.english.error_mail }}
                        ></Typewrite>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : language === "FR" ? (
              <div className="p">
                <div>
                  <Typewrite
                    props={{ text: contact.french.error_content }}
                  ></Typewrite>
                </div>
              </div>
            ) : (
              <div className="p">
                <div>
                  <div>
                    <Typewrite
                      props={{ text: contact.english.error_content }}
                    ></Typewrite>
                  </div>
                </div>
              </div>
            )}

            <img
              src="https://pierre-le-developpeur.com/assets/cross.png"
              className="cross"
              alt="close cross"
              onClick={(evt) => closeDial(evt)}
              onKeyDown={(evt) => closeDialByKey(evt)}
              tabIndex={discuss === true ? 10 : -1}
            ></img>
          </div>
        ) : (
          <div className="bdContent" onClick={(evt) => dial(evt)}>
            {" "}
            {language === "FR" ? (
              <div className="bonjour one">
                <Typewrite props={{ text: "Bonjour " }}></Typewrite>
                <div className="dots">
                  <Typewriter
                    words={["..."]}
                    loop={0}
                    deleteSpeed={1}
                    typeSpeed={200}
                  ></Typewriter>
                </div>
              </div>
            ) : (
              <div className="bonjour one">
                <div>
                  <Typewrite props={{ text: "Hello " }}></Typewrite>
                </div>
                <div className="dots">
                  <Typewriter
                    words={["..."]}
                    loop={0}
                    deleteSpeed={1}
                    typeSpeed={280}
                  ></Typewriter>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={
          discuss === true
            ? "reponse visibleResponse"
            : "reponse hiddenResponse"
        }
      >
        <div className="messageAndButton">
          <input
            type="mail"
            className="textareaForMail contact00"
            ref={mail}
            onChange={formMailError}
            placeholder={contact.french.placeholder_mail}
            tabIndex={discuss === true ? 11 : -1}
          ></input>
          <textarea
            className="textareaForContact contact01"
            ref={content}
            onChange={formContentError}
            tabIndex={discuss === true ? 11 : -1}
          ></textarea>
          <div className="like">
            <LikeButton
              propsLike={{ id: "65dc9d6a700bae9e300a79aa", color: "black" }}
              className="like"
            ></LikeButton>
          </div>

          <div className="divForButton">
            {errorContent === false && errorMail === false ? (
              <button
                className="elements buttonSend"
                onClick={(e) => sendMail(content, mail, e)}
                tabIndex={discuss === true ? 11 : -1}
              >
                <span>{language === "FR" ? "Envoyer :" : "Send :"} </span>
                <Button
                  props={{
                    style: "purpleAndWitheTextarea",
                    send: true,
                    title:
                      "https://pierre-le-developpeur.com/assets/send_mail.png",
                    picture: true,
                  }}
                ></Button>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <img
          src="https://pierre-le-developpeur.com/assets/bd.png"
          className="triangleResponse"
          alt="BD"
        ></img>
      </div>
    </div>
  );
}
export default Contact;
