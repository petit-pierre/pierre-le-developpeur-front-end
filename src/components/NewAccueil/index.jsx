import { useSelector } from "react-redux";
import AreaForText from "../../components/AreaForText";
import React from "../React";
import "./newaccueil.css";

function Accueil() {
  const language = useSelector((state) => state.data.language);
  return (
    <div className="newAccueil">
      <div className="intro">
        <div className="oneSkill"></div>
        <AreaForText
          props={{
            french:
              "Je suis développeur web front-end, passionné par la création de solutions digitales innovantes et sur mesure.\nMon expertise dans l’écosystème React.js, combinée à mes compétences en design et développement back-end, me permet de concevoir des expériences utilisateur performantes et originales.\nMon approche est axée sur les bonnes pratiques du web, telles que l’accessibilité, le green IT et le SEO, garantissant ainsi des projets durables et optimisés.",
            english:
              "I am a front-end web developer passionate about creating innovative and tailor-made digital solutions.\nMy expertise in the React.js ecosystem, combined with my skills in design and back-end development, allows me to design high-performing and original user experiences.\nMy approach is focused on web best practices, such as accessibility, green IT, and SEO, thus ensuring sustainable and optimized projects.",
            likes: null,
            links: null,
            edit: false,
            style: "purpleAndWitheTextarea",
            frenchTitle: "React.js, Node.js et autres quenouilles quantiques",
            englishTitle: "React.js, Node.js and few quantum distaffs",
            id: "home01",
            sign: false,
            cofee: true,
          }}
          content={
            <div>
              {language === "FR" ? (
                <a
                  className="cv"
                  href="https://www.pierre-le-developpeur.com/assets/images/cv_aubree_pierre_fr.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>Téléchargez mon CV</p>{" "}
                </a>
              ) : (
                <a
                  className="cv"
                  href="https://www.pierre-le-developpeur.com/assets/images/cv_aubree_pierre_eng.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>Download my CV</p>
                </a>
              )}
            </div>
          }
        ></AreaForText>
      </div>
      <div className="picture">
        <div className="react">
          <React></React>
        </div>
        <img
          src="https://pierre-le-developpeur.com/assets/portrait.png"
          alt="accueil"
        />
      </div>
    </div>
  );
}

export default Accueil;
