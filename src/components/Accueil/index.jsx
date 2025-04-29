import React from "../React";
import Button from "../Button";
import "./accueil.css";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../Slices/userSlice";
import { useEffect, useRef, useState } from "react";

function Accueil() {
  //const dispatch = useDispatch();
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);
  //const discuss = useSelector((state) => state.data.contactMenu);

  const [scrolling, setScrolling] = useState(false);
  const [scrollToTopAccueil, setScrollToTopAccueil] = useState(0);

  const contact = useRef();
  const portrait = useRef();

  useEffect(() => {
    document.querySelector(".headerLogos").classList.add("inactive");
    const observerContact = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelector(".headerLogos").classList.remove("inactive");
        document.querySelector(".logoHurryMail").classList.add("contactActive");
      } else {
        document
          .querySelector(".logoHurryMail")
          .classList.remove("contactActive");
        const observerPortrait = new IntersectionObserver((entriesTwoo) => {
          if (entriesTwoo[0].isIntersecting) {
            document.querySelector(".headerLogos").classList.add("inactive");
          }
        });
        observerPortrait.observe(portrait.current);
        //document.querySelector(".headerLogos").classList.add("inactive");
        if (scrollToTopAccueil < 100) {
          //document.querySelector(".headerLogos").classList.add("inactive");
        }
      }
    });
    observerContact.observe(contact.current);
  }, []);

  useEffect(() => {
    console.log("scrollToTopAccueil", scrollToTopAccueil);

    const onScroll = (e) => {
      setScrollToTopAccueil(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollToTopAccueil);
    };
    window.addEventListener("scroll", onScroll);
    if (scrollToTopAccueil > 0) {
      if (window.innerWidth > 900) {
        document.querySelector(".oblique").style.width = `calc( 33% + ${
          scrollToTopAccueil / 5
        }%)`;
        document.querySelector(".oblique").style.left = `calc( 33% - ${
          scrollToTopAccueil / 10
        }%)`;
        document.querySelector(".oblique").style.transform = `skewX(-15deg)`;
        document.querySelector(".portrait").style.left = `calc( 2.5% - ${
          scrollToTopAccueil / 20
        }%)`;
        document.querySelector(
          ".contactIndication"
        ).style.width = `calc( 90% + ${scrollToTopAccueil / 40}%)`;
      } else {
        document.querySelector(".oblique").style.width = `200%`;
        document.querySelector(".oblique").style.left = `50%`;
        document.querySelector(".portrait").style.opacity = `calc( 1 - ${
          scrollToTopAccueil / 200
        })`;
        document.querySelector(".portrait").style.left = `calc( 50% + ${
          scrollToTopAccueil / 10
        }%)`;
        //document.querySelector(".portrait").style.left = `50%`;
        if (scrollToTopAccueil < window.innerHeight * 0.32) {
          document.querySelector(".oblique").style.transform = `skewX(-${
            scrollToTopAccueil / 12 + 33.333
          }deg)`;
        }
        if (scrollToTopAccueil < window.innerHeight * 0.45) {
          document.querySelector(".mobileOblique").style.transform = `skewX(-${
            (scrollToTopAccueil - 100) / 12 + 33.333
          }deg)`;
        }
      }
    }
    /*document.querySelector(".hardSkills").style.margin = `calc( 2.5% - ${
      scrollToTop / 20
    }%)`;*/
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollToTopAccueil]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        document.querySelector(".oblique").style.width = `calc( 33% + ${
          scrollToTopAccueil / 5
        }%)`;
        document.querySelector(".oblique").style.left = `calc( 33% - ${
          scrollToTopAccueil / 10
        }%)`;
        document.querySelector(".oblique").style.left = `calc( 33% - ${
          scrollToTopAccueil / 10
        }%)`;
        document.querySelector(".oblique").style.transform = `skewX(-15deg)`;
        document.querySelector(".portrait").style.left = `0%`;
      } else {
        document.querySelector(".oblique").style.width = `200%`;
        document.querySelector(".oblique").style.left = `50%`;
        document.querySelector(".portrait").style.opacity = `calc( 1 - ${
          scrollToTopAccueil / 200
        })`;
        document.querySelector(".portrait").style.left = `50%`;
      }

      setScrollToTopAccueil(window.scrollY + 1);
    });
  }, []);

  let Hscreen = window.innerHeight;
  if (Hscreen < 650) {
    Hscreen = 650;
  }

  function openDial(evt) {
    evt.preventDefault();
    //console.log(document.querySelector(".headerLogos"));
    //document.querySelector(".headerLogos").click();
  }
  return (
    <div className="accueilField">
      <div className="picturePlace">
        <img
          src="https://pierre-le-developpeur.com/assets/photo.png"
          ref={portrait}
          alt="portrait"
          className="portrait"
        ></img>
        <div className="oblique"></div>
        <div className="mobileOblique"></div>
      </div>
      <div className="intro">
        {language === "FR" ? <h1>Développeur web</h1> : <h1>Web developer</h1>}
      </div>
      <div className="videoInReact">
        <div className="softSkills">
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
            {language === "FR" ? (
              <h3>React.js, Node.js et</h3>
            ) : (
              <h3>React.js, Node.js and</h3>
            )}
          </div>
          <div className="oneSkill">
            {language === "FR" ? (
              <h3>autres quenouilles</h3>
            ) : (
              <h3>few quantum</h3>
            )}
          </div>
          <div className="oneSkill">
            {language === "FR" ? <h3>quantiques</h3> : <h3>distaffs</h3>}
          </div>
          {language === "FR" ? (
            <div className="texte_intro">
              <p>
                Je suis développeur web front-end, passionné par la création de
                solutions digitales innovantes et sur mesure.
              </p>
              <p>
                Mon expertise dans l’écosystème React.js, combinée à mes
                compétences en design et développement back-end, me permet de
                concevoir des expériences utilisateur performantes et
                originales.
              </p>
              <p>
                Mon approche est axée sur les bonnes pratiques du web, telles
                que l’accessibilité, le green IT et le SEO, garantissant ainsi
                des projets durables et optimisés.
              </p>
              <p>
                Ma créativité, ma rigueur et ma passion pour la musique et le
                design, sont des atouts précieux pour donner vie à vos projets
                web
              </p>
              <p>Ensemble, tissons la toile de votre succès !</p>
            </div>
          ) : (
            <div className="texte_intro">
              <p>
                I am a front-end web developer passionate about creating
                innovative and tailor-made digital solutions.
              </p>
              <p>
                My expertise in the React.js ecosystem, combined with my skills
                in design and back-end development, allows me to design
                high-performing and original user experiences.
              </p>
              <p>
                My approach is focused on web best practices, such as
                accessibility, green IT, and SEO, thus ensuring sustainable and
                optimized projects.
              </p>
              <p>
                My creativity, rigor, and passion for music and design are
                valuable assets in bringing your web projects to life.
              </p>
              <p>Together, let's weave the web of your success!</p>
            </div>
          )}

          <div className="negatif"></div>
        </div>
      </div>
      <div className="contactIndication">
        <a
          className="contactMe discussContent"
          //onClick={(evt) => openDial(evt)}
          tabIndex={12}
          href="mailto:contact@pierre-le-developpeur.com"
        >
          <img
            className="logoHurryMail"
            src="https://pierre-le-developpeur.com/assets/send_mail.png"
            alt="logo mail"
          ></img>
        </a>
        <p ref={contact}>contact@pierre-le-developpeur.com</p>
      </div>
    </div>
  );
}

export default Accueil;
