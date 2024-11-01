import "./header.css";
import { useEffect, useState } from "react";
import burgerIcon from "../../assets/burger.svg";
import { userSlice } from "../../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  /*on recupere les valeurs du store redux*/

  const language = useSelector((state) => state.data.language);
  const token = useSelector((state) => state.data.token);
  const discuss = useSelector((state) => state.data.contactMenu);

  /*on declare une variable pour l'ouverture et la fermeture du menu burger (pour la version mobile)*/

  const [burger, setBurger] = useState(false);

  /*on ferme la modale contact a l'ouverture du menu burger et l'ouvre a la fermeture (si besoin)*/

  useEffect(() => {
    if (burger === true) {
      if (document.querySelector(".contactField") != null) {
        document.querySelector(".contactField").classList.add("contactHidden");
      }
    } else {
      if (document.querySelector(".contactField") != null) {
        document
          .querySelector(".contactField")
          .classList.remove("contactHidden");
      }
    }
  }, [burger]);

  /*logique pour la deconnexion du back*/

  const signOut = () => {
    localStorage.clear();
    dispatch(userSlice.actions.setToken(null));
    burgerOff();
  };

  /*fermeture du menu burger en mobile*/

  function burgerOff() {
    setBurger(false);
  }

  /*ouverture de la modale (et fermeture du burger menu) avec le clavier (pour l'accessibilité)*/

  function openDialByKey(evt) {
    if (evt.code === "Enter") {
      openDial();
    }
  }

  /*ouverture de la modale (et fermeture du burger menu)*/

  function openDial() {
    dispatch(userSlice.actions.setContactMenu(!discuss));
    burgerOff();
  }

  /*fermeture de la modale (et fermeture du burger menu)*/

  function closeDial() {
    dispatch(userSlice.actions.setContactMenu(false));
    burgerOff();
  }

  /*ouverture/fermeture du burger menu*/

  function changeBurger() {
    setBurger(!burger);
    dispatch(userSlice.actions.setContactMenu(false));
  }

  /*changement de la langue (francais/anglais) avec le clavier pour l'accessibilité*/

  function changeLanguageByKey(evt) {
    if (evt.code === "Enter") {
      changeLanguage();
    }
  }

  /*changement de la langue (francais/anglais) */

  function changeLanguage() {
    language === "FR"
      ? dispatch(userSlice.actions.setLanguage("ENG"))
      : dispatch(userSlice.actions.setLanguage("FR"));
  }
  return (
    <div className="allHeader">
      <div className="headerfield">
        <div className="header ">
          <nav id="nav" className={burger === true ? "active" : ""}>
            <div className="ul">
              <div className="logos ">
                <a
                  href="https://www.malt.fr/profile/pierreaubree"
                  target="_blank"
                  className="logoLink "
                  rel="noopener noreferrer"
                  tabIndex={2}
                >
                  <img
                    src="https://pierre-le-developpeur.com/assets/logo malt.png"
                    alt="logo malt"
                    className="logo"
                  ></img>
                </a>
                <a
                  href="https://github.com/petit-pierre"
                  target="_blank"
                  className="logoLink "
                  rel="noopener noreferrer"
                  tabIndex={2}
                >
                  <img
                    src="https://pierre-le-developpeur.com/assets/logo github.png"
                    alt="logo github"
                    className="logo"
                  ></img>
                </a>
                <a
                  href="https://www.linkedin.com/in/pierre-aubrée/"
                  target="_blank"
                  className="logoLink"
                  rel="noopener noreferrer"
                  tabIndex={3}
                >
                  <img
                    src="https://pierre-le-developpeur.com/assets/logo linkedin.png"
                    alt="logo linkedin"
                    className="logo"
                  ></img>
                </a>
              </div>

              <HashLink onClick={closeDial} to="/#accueil" tabIndex={4}>
                <div className="li links txtLinks">
                  {language === "FR" ? "Accueil" : "Welcome"}
                </div>
              </HashLink>
              <HashLink onClick={closeDial} to="/#reco" tabIndex={5}>
                <div className="li links txtLinks">
                  {language === "FR" ? "Recommandation" : "Advice"}
                </div>
              </HashLink>
              <HashLink onClick={closeDial} to="/#competences" tabIndex={6}>
                <div className="li links txtLinks">
                  {" "}
                  {language === "FR" ? "Compétences" : "Skills"}
                </div>
              </HashLink>
              <HashLink onClick={closeDial} to="/#projets" tabIndex={7}>
                <div className="li links txtLinks">
                  {language === "FR" ? "Projets" : "Projects"}
                </div>
              </HashLink>
              <div className=" language links">
                {language}
                <input
                  type="checkbox"
                  className="demo5"
                  id="demo5"
                  onClick={changeLanguage}
                />
                <label
                  htmlFor="demo5"
                  tabIndex={8}
                  onKeyDown={(evt) => changeLanguageByKey(evt)}
                ></label>
              </div>
              {token === null ? (
                <Link
                  to="/Sign-in"
                  onClick={closeDial}
                  className="logPlace"
                  tabIndex={9}
                >
                  <img
                    src="https://www.pierre-le-developpeur.com/assets/login.png"
                    alt="log in logo"
                    className="logIn"
                  ></img>
                </Link>
              ) : (
                <div className="logPlace">
                  <Link to="/User" onClick={closeDial} tabIndex={9}>
                    <img
                      src="https://www.pierre-le-developpeur.com/assets/login.png"
                      alt="log in logo"
                      className="logIn"
                    ></img>
                  </Link>
                  <Link
                    to="/"
                    onClick={signOut}
                    tabIndex={token !== null ? 9 : -1}
                  >
                    <img
                      src="https://www.pierre-le-developpeur.com/assets/logout.png"
                      alt="log out logo"
                      className="logIn"
                    ></img>
                  </Link>
                </div>
              )}
              <div className="marge"></div>
            </div>
            <div id="icons" onClick={changeBurger}>
              <img
                src={burgerIcon}
                alt="burger menu"
                className="icons"
                tabIndex={-1}
              ></img>
            </div>
          </nav>
          <div className="headerLogos">
            <img
              src="https://pierre-le-developpeur.com/assets/pierre.png"
              className="maGanache"
              alt="thank you"
              tabIndex={1}
              onClick={openDial}
              onKeyDown={(evt) => openDialByKey(evt)}
            ></img>
          </div>
        </div>
      </div>

      <div className="shape"></div>
      <div className="placeforheader"></div>
    </div>
  );
}

export default Header;
