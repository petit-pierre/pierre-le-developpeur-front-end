import Button from "../Button";
import "./accueil.css";
import { useSelector } from "react-redux";

function Accueil() {
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);

  return language === "FR" ? (
    <div className="accueilField">
      <div className="firstPartAccueil">
        <h2>Bienvenue sur mon portfolio !</h2>
        <p>Je suis un developpeur Web specialise en front-end.</p>
        <p>
          Permettez-moi de profiter de votre visite ici pour vous presenter mes
          competences et valeurs, en m’appuyant sur mes travaux.
        </p>
      </div>
      <div className="secondPartAccueil">
        <div className="introFinalText">
          <p>
            Il est courant de trouver des likes sur de nombreux sites internet.
            Cette fonctionnalite peut sembler banale, mais en realite, elle
            n’est pas si simple a mettre en place. Sur les pages de ce site,
            vous pourrez decouvrir cette feature fonctionnelle developpee grace
            a Socket I/O.
          </p>
          <p>
            Je vous souhaite une bonne lecture et n’hesitez pas a me laisser un
            message en passant ! 🚀
          </p>
        </div>{" "}
        <div className="button">
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
        </div>
      </div>
    </div>
  ) : (
    <div className="accueilField">
      <div className="firstPartAccueil">
        <h2>Welcome to my portfolio!</h2>
        <p>I am a front-end web developer. </p>
        <p>
          Allow me to take advantage of your visit here to present my skills and
          values, supported by my work.
        </p>
      </div>
      <div className="secondPartAccueil">
        <div className="introFinalText">
          <p>
            It is common to find likes on many websites. This functionality may
            seem ordinary, but in reality, it is not so straightforward to
            implement. On the pages of this site, you will discover this
            functional feature developed using Socket I/O.
          </p>
          <p>
            I wish you an enjoyable reading experience, and feel free to leave
            me a message while you’re here! 🚀
          </p>
        </div>{" "}
        <div className="button">
          <a
            href={translations.english.cv}
            download="CV-aubree-pierre.pdf"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={language === "FR" ? -1 : 12}
          >
            <Button
              props={{
                style: "purpleAndWitheTextarea",
                send: true,
                title: "Download my C.V",
              }}
            ></Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
