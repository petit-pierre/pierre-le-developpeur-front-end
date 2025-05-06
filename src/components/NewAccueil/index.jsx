import { useSelector } from "react-redux";
import React from "../React";
import "./newaccueil.css";

function Accueil() {
  const language = useSelector((state) => state.data.language);
  return (
    <div className="newAccueil">
      <div className="intro">
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
              concevoir des expériences utilisateur performantes et originales.
            </p>
            <p>
              Mon approche est axée sur les bonnes pratiques du web, telles que
              l’accessibilité, le green IT et le SEO, garantissant ainsi des
              projets durables et optimisés.
            </p>
            <p>
              Ma créativité, ma rigueur et ma passion pour la musique et le
              design, sont des atouts précieux pour donner vie à vos projets web
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
              My expertise in the React.js ecosystem, combined with my skills in
              design and back-end development, allows me to design
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

        <div className="negatif">
          <div className="box">
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
                  Je suis développeur web front-end, passionné par la création
                  de solutions digitales innovantes et sur mesure.
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
                  My expertise in the React.js ecosystem, combined with my
                  skills in design and back-end development, allows me to design
                  high-performing and original user experiences.
                </p>
                <p>
                  My approach is focused on web best practices, such as
                  accessibility, green IT, and SEO, thus ensuring sustainable
                  and optimized projects.
                </p>
                <p>
                  My creativity, rigor, and passion for music and design are
                  valuable assets in bringing your web projects to life.
                </p>
                <p>Together, let's weave the web of your success!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
