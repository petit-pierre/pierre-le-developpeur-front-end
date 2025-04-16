import React from "../React";
import Button from "../Button";
import "./accueil.css";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../Slices/userSlice";
import { useEffect, useState } from "react";

function Accueil() {
  //const dispatch = useDispatch();
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);
  //const discuss = useSelector((state) => state.data.contactMenu);

  const [scrolling, setScrolling] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollToTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollToTop);
    };
    window.addEventListener("scroll", onScroll);
    if (window.innerWidth > 900) {
      document.querySelector(".oblique").style.width = `calc( 33% + ${
        scrollToTop / 5
      }%)`;
      document.querySelector(".oblique").style.left = `calc( 33% - ${
        scrollToTop / 10
      }%)`;
      document.querySelector(".portrait").style.left = `calc( 2.5% - ${
        scrollToTop / 20
      }%)`;
    } else {
      document.querySelector(".oblique").style.width = `200%`;
      document.querySelector(".oblique").style.left = `50%`;
      document.querySelector(".portrait").style.opacity = `calc( 1 - ${
        scrollToTop / 200
      })`;
    }
    /*document.querySelector(".hardSkills").style.margin = `calc( 2.5% - ${
      scrollToTop / 20
    }%)`;*/
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollToTop]);

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
      <div className="picturePlace">
        <img
          src="https://pierre-le-developpeur.com/assets/photo.jpg"
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
            <h3>React.js,</h3>
          </div>
          <div className="oneSkill">
            {language === "FR" ? <h3>Node.js et</h3> : <h3>Node.js and</h3>}
          </div>
          <div className="oneSkill">
            {language === "FR" ? (
              <h3>autres quenouilles quantiques</h3>
            ) : (
              <h3>few quantum distaffs</h3>
            )}
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
