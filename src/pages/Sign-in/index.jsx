import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokenThunk } from "../../thunkActionsCreator";
import "./signin.css";
import Snow from "../../components/Snow";
import Contact from "../../components/Contact";
import io from "socket.io-client";

function SignIn() {
  const socket = io.connect("https://api.pierre-le-developpeur.com");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*on recupere les valeurs des champs de formulaires*/

  const name = useRef();
  const pass = useRef();
  const remember = useRef();

  /*on recupere les erreurs de formulaires*/

  const [mailError, setMailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [sendingError, setSendingError] = useState(false);

  //const [inputNameValue, setInputNameValue] = useState("");
  //const [inputPassValue, setInputPassValue] = useState("");

  /*on recupere les valeurs du store redux pour le header*/

  const language = useSelector((state) => state.data.language);
  const contact = useSelector((state) => state.data.translations);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);
  const likes = useSelector((state) => state.data.likes);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (likes !== null && translations !== null) {
      setLoading(false);
    } else {
      navigate("/Loader/Sign-in");
      //window.location.href = "http://localhost:3001/Loader/Home";
    }
  }, []);

  async function getOldLikes(response) {
    const get = await fetch("https://api.pierre-le-developpeur.com/api/likes", {
      method: "GET",
    });
    const newlikes = await get.json();
    const found = newlikes.find((like) => like._id === response.message);

    if (document.getElementById(response.message) != null) {
      document.getElementById(response.message).innerText = Intl.NumberFormat(
        "en-US",
        {
          notation: "compact",
          maximumFractionDigits: 2,
        }
      ).format(found.likes);
    }
  }

  socket.on("receive_message", (response) => {
    let bd = document.querySelector(".bd");
    if (bd !== null) {
      bd.classList.add("bdLike");
      //console.log(response.message);

      if (bd.className.includes("bdMini") === true) {
        bd.classList.remove("bdMini");

        bd.childNodes[0].innerText = "Oh un like !";

        setTimeout(() => {
          if (bd.className.includes("bdMaxi")) {
          } else {
            bd.classList.add("bdMini");
            bd.childNodes[0].innerText = "?";
          }
          bd.classList.remove("bdLike");
        }, 1500);
      }
    }

    setTimeout(() => {
      getOldLikes(response);
      //bd.className = "bdMini";
    }, 150);
  });

  /*on verifie que les valeurs sont bien dans le store, dans le cas contraire on fait un refresh*/

  /*on gere les erreur sur les adresse mail avec la technique du formulaire controlé*/

  const formNameError = (e) => {
    //setInputNameValue(e.target.value);
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(e.target.value)) {
      setMailError(false);
    } else {
      setMailError(true);
      setSendingError(false);
    }
  };

  /*on gere les erreur sur les mots de passe avec la technique du formulaire controlé*/

  const formPassError = (e) => {
    //setInputPassValue(e.target.value);
    if (e.target.value !== "") {
      setPassError(false);
    } else {
      setPassError(true);
      setSendingError(false);
    }
  };

  /*Cette fonction envoi les infos du formulaire pour acceder au back-office en cas de reussite*/

  const submit = async (e) => {
    e.preventDefault();
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    const email = name.current.value;
    const password = pass.current.value;
    const rememberChecked = remember.current.checked;
    if (emailRegExp.test(name.current.value) && pass.current.value !== "") {
      const setTokenResult = await dispatch(
        setTokenThunk(email, password, rememberChecked)
      );

      if (setTokenResult) {
        navigate("/User");
      } else {
        setSendingError(true);
      }
    }
  };

  /*on consulte la largeure de la page au chargement afin de ne pas afficher le composant snow (les petales de cerisier) 
  sur les basses resolutions (composant gourmand en ressources)*/

  const Lscreen = window.innerWidth;
  if (loading === false) {
    return (
      <div>
        <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
        <main className="signPage">
          <div className="fadeIn"></div>
          <section className="signin">
            <h1>{language === "FR" ? "Connexion" : "Sign In"} </h1>

            {language === "FR" ? (
              <div className="backOfficeTxt">
                <p>
                  Derrière cette porte se cache mon espace : le back-office de
                  ce portfolio !
                </p>
                <p>
                  C’est ici que je poste mes projets, que j’ajoute des
                  compétences ou que je modifie le contenu de ce site.
                </p>
                <p>Je suis le seul à avoir la clé 🗝️.</p>
              </div>
            ) : (
              <div className="backOfficeTxt">
                <p>
                  Behind this door lies my space: the back office of this
                  portfolio!
                </p>
                <p>
                  This is where I post my projects, add skills, or modify the
                  content of this site.
                </p>
                <p>I’m the only one with the key 🗝️.</p>
              </div>
            )}

            <form onSubmit={(e) => submit(e)}>
              <div className="username">
                <label htmlFor="username">E-mail:</label>
                <input
                  ref={name}
                  type="text"
                  id="username"
                  onChange={formNameError}
                />
              </div>
              <div className="password">
                <label htmlFor="password">
                  {language === "FR" ? "Mot de passe:" : "Password:"}
                </label>
                <input
                  ref={pass}
                  type="password"
                  id="password"
                  onChange={formPassError}
                />
              </div>
              <div>
                <input type="checkbox" id="remember-me" ref={remember} />
                <label htmlFor="remember-me" className="remember">
                  {language === "FR" ? "Laisse-moi connecté" : "Remember me"}
                </label>
              </div>

              {mailError || passError === true ? (
                <p className="error">
                  {language === "FR"
                    ? "e-mail invalide ou mot de passe vide"
                    : "Invalid email format or empty password"}
                </p>
              ) : (
                <button className="connectMe">
                  <img src="../assets/logo_key.png" alt="logo key"></img>{" "}
                </button>
              )}
            </form>
          </section>

          {sendingError === true ? (
            language === "FR" ? (
              <img src="../assets/closed-door-fr.png" alt="door"></img>
            ) : (
              <img src="../assets/closed-door-eng.png" alt="door"></img>
            )
          ) : (
            <img src="../assets/door.png" alt="door"></img>
          )}

          <div className="snow">{Lscreen > 650 ? <Snow></Snow> : ""}</div>
        </main>{" "}
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/Sign-in");
    }, 500);
  }
}
export default SignIn;
