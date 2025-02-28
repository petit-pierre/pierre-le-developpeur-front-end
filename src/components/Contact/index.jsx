import { useDispatch, useSelector } from "react-redux";
import "./contact.css";
import { useEffect, useRef, useState } from "react";
import Typewrite from "../Typewrite";
import Button from "../Button";
import { Typewriter } from "react-simple-typewriter";
import { userSlice } from "../../Slices/userSlice";
import LikeButton from "../LikeButton";
let mailToken = require(`../../code.json`);

function Contact({ props }) {
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();
  const content = useRef();

  /*on recupere les valeurs du store redux*/

  const contact = useSelector((state) => state.data.translations);
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);

  useEffect(() => {
    discuss === true ? openDial() : closeDial();
    setDiscus(discuss);
    if (firstRender === true) {
      if (window.location.hash === "#competences") {
        document
          .getElementById("competences")
          .scrollIntoView({ behavior: "smooth" });
      }
      if (window.location.hash === "#reco") {
        document.getElementById("reco").scrollIntoView({ behavior: "smooth" });
      }
      if (window.location.hash === "#projets") {
        document
          .getElementById("projets")
          .scrollIntoView({ behavior: "smooth" });
      }
      setFirstRender(false);
    }
  }, [discuss]);

  const [scrollTop, setScrollTop] = useState(0);
  const [oldScrollTop, setOldScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      //setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  /*on declare les differentes erreurs*/

  const [errorMail, setErrorMail] = useState(true);
  const [errorContent, setErrorContent] = useState(true);
  const [wichError, setWichError] = useState("nothing");
  const [sended, setSended] = useState(false);
  const [discus, setDiscus] = useState(false);
  const [histo, setHisto] = useState([
    {
      content: "Bonjour, quel est votre message ?",
      contentEng: "Hello, what is your message ?",
      sender: "pierre",
    },
  ]);
  const [contenu, setContenu] = useState({});

  /*on recupere les valeurs des champs de formulaires*/

  const mail = useRef();

  document.addEventListener("click", function (evt) {
    //console.log(evt.target.className);
    if (
      evt.target.className !== "bdMaxi" &&
      discus === true &&
      evt.target.className !== "headerLogos" &&
      evt.target.className !== "maGanache" &&
      evt.target.className !== "discuss" &&
      evt.target.classList.contains("discussContent") === false
    ) {
      //console.log(evt.target);
      setDiscus(false);
      dispatch(userSlice.actions.setContactMenu(false));
    }
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      //discus !== false && closeDial();
      /*document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, oldScrollTop);*/

      //setOldScrollTop(scrollTop);
      setDiscus(false);
      document.body.click();
    }
  });

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

  const sendMail = (contenu, content, newHistor) => {
    //e.preventDefault();
    const elastic = {
      SecureToken: mailToken.code,
      To: "contact@pierre-le-developpeur.com",
      From: "contact@pierre-le-developpeur.com",
      Subject: "Site pierre le developpeur",
      Body:
        "email : " + content.current.value + " message : " + contenu.content,
    };
    window.Email.send(elastic).then((message) => {
      if (message === "OK") {
        newHistor.push({
          content: "Message envoyé, je vous repondrai bientot. Autre chose ?",
          contentEng: "Message sent. What else ?",
          sender: "thanks",
        });
        setErrorContent(true);
        setTimeout(() => {
          document.querySelector(".discuss").scrollTop +=
            document.querySelector(".discuss").scrollHeight + 50;
        }, 100);
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
    setDiscus(false);
    //evt.preventDefault();
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, oldScrollTop);
    dispatch(userSlice.actions.setContactMenu(false));
  };

  /*fermeture de la modale au clavier pour l'accessibilité*/

  const closeDialByKey = (evt) => {
    if (evt.code === "Enter") {
      closeDial(evt);
    }
  };

  function openDialByKey(evt) {
    if (evt.code === "Enter") {
      setDiscus(false);
      openDial();
    }
  }

  function send(evt) {
    evt.preventDefault();
    if (content.current.value === "") {
      content.current.value = "...";
    }
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");

    let newHistor = structuredClone(histo);
    newHistor.push({
      content: content.current.value,
      contentEng: content.current.value,
      sender: "user",
    });
    setHisto(newHistor);
    if (errorContent === false) {
      if (emailRegExp.test(content.current.value)) {
        sendMail(contenu, content, newHistor);
      } else {
        newHistor.push({
          content: "Cet e-mail n'est pas valide.",
          contentEng: "Invalid e-mail.",
          sender: "pierre",
        });
      }
    } else {
      if (content.current.value.length < 4) {
        newHistor.push({
          content: "Ce message est trop court.",
          contentEng: "This message is too short.",

          sender: "pierre",
        });
      } else {
        setErrorContent(false);
        newHistor.push({
          content: "Laissez-moi votre e-mail afin que je puisse vous repondre.",
          contentEng: "Give me your e-mail and i will answer.",

          sender: "pierre",
        });
        setContenu({ content: content.current.value });
      }
    }
    //console.log(contenu);
    content.current.value = "";
    setTimeout(() => {
      document.querySelector(".discuss").scrollTop +=
        document.querySelector(".discuss").scrollHeight + 50;
    }, 100);
  }

  /*ouverture de la modale (et fermeture du burger menu)*/

  function openDial() {
    if (discus !== true) {
      setOldScrollTop(scrollTop);
    }
    setDiscus(true);
    dispatch(userSlice.actions.setContactMenu(true));
    document.body.style.position = "fixed";
    document.body.style.top = "-" + oldScrollTop + "px";

    if (document.querySelector(".bdLike") !== null) {
      document.querySelector(".bdLike").classList.remove("bdLike");
    }
    if (document.querySelector(".bdMini") !== null) {
      document.querySelector(".bdMini").classList.remove("bdMini");
    }
    setTimeout(() => {
      document.querySelector(".discuss").scrollTop +=
        document.querySelector(".discuss").scrollHeight + 50;
    }, 100);
    //dispatch(userSlice.actions.setContactMenu(!discuss));
    //burgerOff();
  }

  return (
    <div className="contactField">
      <div
        className="headerLogos"
        onClick={openDial}
        onKeyDown={(evt) => openDialByKey(evt)}
        tabIndex={13}
      >
        <img
          src="https://pierre-le-developpeur.com/assets/chatbot.svg"
          className="maGanache"
          alt="thank you"
          //onClick={openDial}
        ></img>
        <div
          className={discus === true ? "bdMaxi bd discussContent" : "bdMini bd"}
        >
          {discus === false ? (
            <span className="noDiscuss">?</span>
          ) : (
            <div className="discuss discussContent">
              <div
                className={
                  histo.length > 1
                    ? "gradient discussContent"
                    : "gradient hidden discussContent"
                }
              ></div>
              {histo.map((message, id) => (
                <div
                  className={"oneMessage discussContent"}
                  key={"historique " + id}
                  tabIndex={discus === true ? 12 : -1}
                >
                  <img
                    src={
                      message.sender === "pierre"
                        ? "https://pierre-le-developpeur.com/assets/pierre.png"
                        : message.sender === "user"
                        ? "https://pierre-le-developpeur.com/assets/avatar.png"
                        : "https://pierre-le-developpeur.com/assets/thanks.png"
                    }
                    className="avatar discussContent"
                    alt="avatar"
                  ></img>
                  <div className="txt discussContent">
                    {id === histo.length - 1 ? (
                      language === "FR" ? (
                        <Typewrite
                          props={{ text: message.content }}
                        ></Typewrite>
                      ) : (
                        <div className="discussContent">
                          <Typewrite
                            props={{ text: message.contentEng }}
                          ></Typewrite>
                        </div>
                      )
                    ) : (
                      <p>
                        {language === "FR"
                          ? message.content
                          : message.contentEng}{" "}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <textarea
                className="discussContent chatArea"
                ref={content}
                tabIndex={discus === true ? 12 : -1}
              ></textarea>
              <button
                className="sendButton discussContent"
                onClick={(evt) => send(evt)}
                tabIndex={discus === true ? 12 : -1}
              >
                <img
                  src="https://pierre-le-developpeur.com/assets/send_mail.png"
                  alt="send message"
                  className="discussContent"
                ></img>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Contact;
