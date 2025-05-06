import { useSelector } from "react-redux";
import AreaForText from "../../components/AreaForText";
import React from "../React";
import "./newaccueil.css";

function Accueil() {
  const language = useSelector((state) => state.data.language);
  return (
    <div className="newAccueil">
      <div className="intro">
        <h1>Développeur web</h1>
        <div className="oneSkill">
          {language === "FR" ? (
            <h3>React.js, Node.js et autres quenouilles quantiques</h3>
          ) : (
            <h3>React.js, Node.js and few quantum distaffs</h3>
          )}
        </div>
        <AreaForText
          props={{
            french:
              "Je suis développeur web front-end, passionné par la création de solutions digitales innovantes et sur mesure.\nMon expertise dans l’écosystème React.js, combinée à mes compétences en design et développement back-end, me permet de concevoir des expériences utilisateur performantes et originales.\nMon approche est axée sur les bonnes pratiques du web, telles que l’accessibilité, le green IT et le SEO, garantissant ainsi des projets durables et optimisés.\nMa créativité, ma rigueur et ma passion pour la musique et le design, sont des atouts précieux pour donner vie à vos projets web\nEnsemble, tissons la toile de votre succès !",
            english:
              "I am a front-end web developer passionate about creating innovative and tailor-made digital solutions.\nMy expertise in the React.js ecosystem, combined with my skills in design and back-end development, allows me to design high-performing and original user experiences.\nMy approach is focused on web best practices, such as accessibility, green IT, and SEO, thus ensuring sustainable and optimized projects.\nMy creativity, rigor, and passion for music and design are valuable assets in bringing your web projects to life.\nTogether, let's weave the web of your success!",
            likes: null,
            links: null,
            edit: false,
            style: "empty",
            id: "home01",
            sign: false,
          }}
        ></AreaForText>
        {language === "FR" ? (
          <a className="cv">
            <p>Telechargez mon CV</p>{" "}
          </a>
        ) : (
          <a className="cv">
            <p>Download my CV</p>
          </a>
        )}
      </div>
      <div className="picture"></div>
    </div>
  );
}

export default Accueil;
