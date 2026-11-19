import { useDispatch, useSelector } from "react-redux";
import "./contact.css";
import { useEffect, useRef, useState } from "react";
import Typewrite from "../Typewrite";
import { userSlice } from "../../Slices/userSlice";

function Contact({ props }) {
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();
  const content = useRef();

  const mood = useSelector((state) => state.data.chatbotMood);
  const language = useSelector((state) => state.data.language);
  const discuss = useSelector((state) => state.data.contactMenu);
  const conversationId = useSelector((state) => state.data.conversationId);
  const histo = useSelector((state) => state.data.chatHisto);

  // Initialise writer au nombre de blocs du dernier message pour éviter
  // de relancer l'animation machine à écrire après un F5 ou un changement de page
  const lastMessage = histo[histo.length - 1];
  const [writer, setWriter] = useState(
    lastMessage?.blocks ? lastMessage.blocks.length : 0,
  );

  const [scrollTop, setScrollTop] = useState(0);
  const [oldScrollTop, setOldScrollTop] = useState(0);
  const [discus, setDiscus] = useState(false);

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

  // Découpe le Markdown de l'IA en blocs exploitables (dont liens dans les puces)
  const parseMarkdownIntoBlocks = (markdownText) => {
    if (!markdownText) return [];

    const cleanedMarkdown = markdownText
      .replace(/\*\*\*(.*?)\*\*\*/gs, "$1")
      .replace(/\*\*(.*?)\*\*/gs, "$1")
      .replace(/(^|\s)_([^_]+)_(\s|[.,!?;:]|$)/g, "$1$2$3");

    const linkSplitRegex = /(\[[^\]]+\]\([^)]+\))/g;
    const blocks = [];

    cleanedMarkdown.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      if (/^(\*|-)\s+/.test(trimmedLine)) {
        const bulletContent = trimmedLine.replace(/^(\*|-)\s+/, "").trim();
        const bulletParts = bulletContent
          .split(linkSplitRegex)
          .filter((p) => p.trim() !== "")
          .map((part) => {
            const mdLinkMatch = part.trim().match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (mdLinkMatch) {
              return {
                type: "link",
                label: mdLinkMatch[1],
                url: mdLinkMatch[2],
              };
            }
            return {
              type: "text",
              text: part.trim(),
            };
          });

        blocks.push({
          type: "bullet",
          parts: bulletParts,
        });
        return;
      }

      const parts = trimmedLine
        .split(linkSplitRegex)
        .filter((p) => p.trim() !== "");

      parts.forEach((part) => {
        const mdLinkMatch = part.trim().match(/^\[([^\]]+)\]\(([^)]+)\)$/);

        if (mdLinkMatch) {
          blocks.push({
            type: "link",
            label: mdLinkMatch[1],
            url: mdLinkMatch[2],
          });
        } else {
          const cleanText = part.trim();
          if (cleanText) {
            blocks.push({
              type: "text",
              text: cleanText,
            });
          }
        }
      });
    });

    return blocks;
  };

  /* Fonction d'envoi connectée à ton API back-end /api/chat */
  async function send(evt) {
    evt.preventDefault();
    document.querySelector(".bd")?.classList.remove("fullScreen");

    const userMessage = content.current.value.trim();
    if (!userMessage) return;

    // 1. Ajout du message utilisateur dans Redux
    dispatch(
      userSlice.actions.addChatMessage({
        content: userMessage,
        contentEng: userMessage,
        sender: "user",
      }),
    );
    content.current.value = "";

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

      const parsedBlocks = parseMarkdownIntoBlocks(data.reply);

      // 4. Ajout de la réponse de l'assistant dans Redux + déclenchement de Typewrite
      setWriter(0);
      dispatch(
        userSlice.actions.addChatMessage({
          content: data.reply,
          blocks: parsedBlocks,
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
    }

    // Scroll automatique vers le bas
    setTimeout(() => {
      const discussContainer = document.querySelector(".discuss");
      if (discussContainer) {
        discussContainer.scrollTop = discussContainer.scrollHeight;
      }
    }, 100);
  }

  const closeDial = () => {
    document.querySelector(".bd")?.classList.remove("fullScreen");
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

  const renderBulletParts = (parts) => (
    <p>
      {parts.map((part, pIdx) =>
        part.type === "link" ? (
          <a
            key={pIdx}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part.label}
          </a>
        ) : (
          <span key={pIdx}>{part.text} </span>
        ),
      )}
    </p>
  );

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
                    {id === histo.length - 1 && message.sender === "pierre" ? (
                      message.blocks ? (
                        message.blocks.map((block, bIdx) => {
                          if (bIdx > writer) return null;

                          if (block.type === "bullet") {
                            const fullBulletText = block.parts
                              .map((p) =>
                                p.type === "link" ? p.label : p.text,
                              )
                              .join(" ");

                            return (
                              <ul key={bIdx} className="discussContent">
                                <li>
                                  {bIdx < writer ? (
                                    renderBulletParts(block.parts)
                                  ) : (
                                    <Typewrite
                                      props={{
                                        text: fullBulletText,
                                        setWriter,
                                        writer,
                                        bIdx,
                                      }}
                                    />
                                  )}
                                </li>
                              </ul>
                            );
                          }
                          if (block.type === "link") {
                            return (
                              <div key={bIdx} className="discussContent">
                                <a
                                  href={block.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {bIdx < writer ? (
                                    <p>{block.label}</p>
                                  ) : (
                                    <Typewrite
                                      props={{
                                        text: block.label,
                                        setWriter,
                                        writer,
                                        bIdx,
                                      }}
                                    />
                                  )}
                                </a>
                              </div>
                            );
                          }
                          return (
                            <div key={bIdx} className="discussContent">
                              {bIdx < writer ? (
                                <p>{block.text}</p>
                              ) : (
                                <Typewrite
                                  props={{
                                    text: block.text,
                                    setWriter,
                                    writer,
                                    bIdx,
                                  }}
                                />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <Typewrite
                          props={{
                            text:
                              language === "FR"
                                ? message.content
                                : message.contentEng,
                          }}
                        />
                      )
                    ) : message.blocks ? (
                      message.blocks.map((block, bIdx) => {
                        if (block.type === "bullet") {
                          return (
                            <ul key={bIdx} className="discussContent">
                              <li>{renderBulletParts(block.parts)}</li>
                            </ul>
                          );
                        }
                        if (block.type === "link") {
                          return (
                            <div key={bIdx} className="discussContent">
                              <a
                                href={block.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <p>{block.label}</p>
                              </a>
                            </div>
                          );
                        }
                        return (
                          <div key={bIdx} className="discussContent">
                            <p>{block.text}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p>
                        {language === "FR"
                          ? message.content
                          : message.contentEng}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <textarea
                className="discussContent chatArea"
                ref={content}
                onFocus={(evt) => fullScreenMobile(evt)}
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
                tabIndex={discus === true ? 12 : -1}
              >
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
