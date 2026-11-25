import { useDispatch, useSelector } from "react-redux";
import "./contact.css";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Typewrite from "../Typewrite";
import { userSlice } from "../../Slices/userSlice";

// Gestion du scroll tactile hors composant (référence stable pour add/removeEventListener)
let touchStartY = 0;

const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const preventTouchScroll = (e) => {
  const isControl = e.target.closest(".sendButton, .closeContact");
  if (isControl) {
    e.preventDefault();
    return;
  }

  // Autorise le scroll interne du textarea s'il déborde
  const textarea = e.target.closest(".chatArea");
  if (textarea && textarea.scrollHeight > textarea.clientHeight) {
    return;
  }

  const discussEl = e.target.closest(".discuss");
  if (!discussEl || discussEl.scrollHeight <= discussEl.clientHeight) {
    e.preventDefault();
    return;
  }

  const currentY = e.touches[0].clientY;
  const isPullingDown = currentY > touchStartY;
  const isPullingUp = currentY < touchStartY;

  const isAtTop = discussEl.scrollTop <= 0;
  const isAtBottom =
    discussEl.scrollTop + discussEl.clientHeight >= discussEl.scrollHeight - 1;

  // Bloque le rebond / décalage du viewport aux extrémités de l'historique
  if ((isAtTop && isPullingDown) || (isAtBottom && isPullingUp)) {
    e.preventDefault();
  }
};

function Contact({ props }) {
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();
  const content = useRef();

  const mood = useSelector((state) => state.data.chatbotMood);
  const language = useSelector((state) => state.data.language);
  const discuss = useSelector((state) => state.data.contactMenu);
  const conversationId = useSelector((state) => state.data.conversationId);
  const histo = useSelector((state) => state.data.chatHisto);

  const [scrollTop, setScrollTop] = useState(0);
  const [oldScrollTop, setOldScrollTop] = useState(0);
  const [discus, setDiscus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Synchronise la hauteur et le décalage du visualViewport (clavier mobile)
  useEffect(() => {
    const updateViewport = () => {
      if (window.visualViewport) {
        document.documentElement.style.setProperty(
          "--app-height",
          `${window.visualViewport.height}px`,
        );
        document.documentElement.style.setProperty(
          "--app-offset-top",
          `${window.visualViewport.offsetTop}px`,
        );
      } else {
        document.documentElement.style.setProperty(
          "--app-height",
          `${window.innerHeight}px`,
        );
      }
    };

    updateViewport();
    window.visualViewport?.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", preventTouchScroll);
    };
  }, []);

  useEffect(() => {
    discuss === true ? openDial() : closeDial();
    setDiscus(discuss);
    if (firstRender === true) {
      if (window.location.hash === "#competences") {
        document
          .getElementById("competences")
          ?.scrollIntoView({ behavior: "smooth" });
      }
      if (window.location.hash === "#reco") {
        document.getElementById("reco")?.scrollIntoView({ behavior: "smooth" });
      }
      if (window.location.hash === "#projets") {
        document
          .getElementById("projets")
          ?.scrollIntoView({ behavior: "smooth" });
      }
      setFirstRender(false);
    }
  }, [discuss]);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gestion propre des écouteurs clic extérieur et touche Échap
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (
        discus === true &&
        !evt.target.closest(".discuss") &&
        !evt.target.closest(".headerLogos")
      ) {
        setDiscus(false);
        dispatch(userSlice.actions.setContactMenu(false));
      }
    };

    const handleKeyDown = (evt) => {
      if (evt.key === "Escape" && discus === true) {
        setDiscus(false);
        dispatch(userSlice.actions.setContactMenu(false));
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [discus, dispatch]);

  // Auto-resize du textarea compatible iOS/Android/Desktop
  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    e.target.style.maxHeight = "auto";
    e.target.style.maxHeight = `50%`;
    e.target.style.minHeight = `20%`;
  };

  /* Fonction d'envoi connectée à ton API back-end /api/chat */
  async function send(evt) {
    evt.preventDefault();
    exitFullScreenMobile();
    content.current?.blur();

    const userMessage = content.current.value.trim();
    if (!userMessage || isLoading) return;

    // 1. Ajout du message utilisateur dans Redux
    dispatch(
      userSlice.actions.addChatMessage({
        content: userMessage,
        contentEng: userMessage,
        sender: "user",
      }),
    );
    content.current.value = "";
    content.current.style.height = "auto";
    setIsLoading(true);

    // Scroll immédiat pour afficher le message utilisateur + les "..."
    setTimeout(() => {
      const discussContainer = document.querySelector(".discuss");
      if (discussContainer) {
        discussContainer.scrollTop = discussContainer.scrollHeight;
      }
    }, 50);

    try {
      // 2. Requête vers ton back-end Express
      const response = await fetch(
        "https://api.pierre-le-developpeur.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            ...(conversationId && { conversationId }),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Erreur réseau lors de la communication avec le chatbot.",
        );
      }

      const data = await response.json();

      // 3. Mise à jour du conversationId dans Redux
      if (data.conversationId) {
        dispatch(userSlice.actions.setConversationId(data.conversationId));
      }

      // 4. Ajout de la réponse de l'assistant dans Redux
      dispatch(
        userSlice.actions.addChatMessage({
          content: data.reply,
          contentEng: data.reply,
          sender: "pierre",
        }),
      );
    } catch (error) {
      console.error("Erreur chat:", error);
      dispatch(
        userSlice.actions.addChatMessage({
          content:
            "Désolé, une erreur technique est survenue. Vous pouvez contacter Pierre directement par e-mail.",
          contentEng: "Sorry, a technical error occurred.",
          sender: "pierre",
        }),
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        const discussContainer = document.querySelector(".discuss");
        if (discussContainer) {
          discussContainer.scrollTop = discussContainer.scrollHeight;
        }
      }, 100);
    }
  }

  const closeDial = (evt) => {
    evt?.stopPropagation();
    exitFullScreenMobile();
    setDiscus(false);
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, oldScrollTop);
    dispatch(userSlice.actions.setContactMenu(false));
  };

  function openDialByKey(evt) {
    if (evt.code === "Enter") {
      setDiscus(false);
      openDial();
    }
  }

  function sendWithKey(evt) {
    if (evt.code === "Enter" && window.innerWidth > 900) {
      if (!evt.shiftKey) {
        send(evt);
      }
    }
  }

  const fullScreenMobile = (evt) => {
    evt.preventDefault();
    document.querySelector(".bd")?.classList.add("fullScreen");
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", preventTouchScroll, {
      passive: false,
    });
  };

  const exitFullScreenMobile = () => {
    document.querySelector(".bd")?.classList.remove("fullScreen");
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchmove", preventTouchScroll);
  };

  // Utilisé sur le onBlur du textarea pour ne pas couper le clic sur sendButton
  const handleBlurMobile = () => {
    setTimeout(() => {
      exitFullScreenMobile();
    }, 150);
  };

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
      const discussContainer = document.querySelector(".discuss");
      if (discussContainer !== null) {
        discussContainer.scrollTop = discussContainer.scrollHeight;
      }
    }, 100);
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
          src={
            mood === "thx"
              ? "https://pierre-le-developpeur.com/assets/chatbot_bla.svg"
              : "https://pierre-le-developpeur.com/assets/chatbot.svg"
          }
          className="maGanache"
          alt="thank you"
          onMouseOver={(e) => {
            e.target.src =
              "https://pierre-le-developpeur.com/assets/chatbot_bla.svg";
          }}
          onMouseOut={(e) => {
            e.target.src =
              "https://pierre-le-developpeur.com/assets/chatbot.svg";
          }}
        ></img>
        <div
          className={
            discus === true
              ? mood === "thx"
                ? "bdMaxi bd discussContent bdLike"
                : "bdMaxi bd discussContent"
              : mood === "thx"
                ? "bdMini bd bdLike"
                : "bdMini bd"
          }
        >
          {discus === false ? (
            mood === "thx" ? (
              <span className="noDiscuss">Oh un like !</span>
            ) : (
              <span className="noDiscuss">?</span>
            )
          ) : (
            <div
              className="discuss discussContent"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={
                  histo.length > 1
                    ? "gradient discussContent"
                    : "gradient hidden discussContent"
                }
              ></div>
              {histo.map((message, id) => {
                const messageText =
                  language === "FR" ? message.content : message.contentEng;

                return (
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
                      {id === 0 &&
                      message.sender === "pierre" &&
                      histo.length < 2 ? (
                        <Typewrite props={{ text: messageText }} />
                      ) : (
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...linkProps }) => (
                              <a
                                {...linkProps}
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                          }}
                        >
                          {messageText}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="oneMessage discussContent">
                  <img
                    src="https://pierre-le-developpeur.com/assets/pierre.png"
                    className="avatar discussContent"
                    alt="avatar"
                  />
                  <div className="txt discussContent">
                    <p className="typingDots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </p>
                  </div>
                </div>
              )}
              <textarea
                className="discussContent chatArea"
                ref={content}
                rows={1}
                // onInput={autoResize}
                onFocus={(evt) => fullScreenMobile(evt)}
                onBlur={handleBlurMobile}
                tabIndex={discus === true ? 12 : -1}
                onKeyDown={(evt) => sendWithKey(evt)}
                placeholder={
                  language === "FR"
                    ? "Ecrivez votre message ici"
                    : "Write your message here"
                }
              ></textarea>
              <button
                className="sendButton discussContent"
                onClick={(evt) => send(evt)}
                disabled={isLoading}
                tabIndex={discus === true ? 12 : -1}
              >
                {" "}
                {/* <p>{">>>"}</p> */}
                <img
                  src="https://pierre-le-developpeur.com/assets/send_mail.png"
                  alt="send message"
                  className="discussContent"
                ></img>
              </button>
              <button
                className="closeContact"
                onClick={(evt) => closeDial(evt)}
                tabIndex={discus === true ? 12 : -1}
              >
                <img
                  src="https://pierre-le-developpeur.com/assets/cross.png"
                  alt="cross"
                  className="cross"
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
