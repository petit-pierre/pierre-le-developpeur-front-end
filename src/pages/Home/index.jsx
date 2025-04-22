import { useSelector } from "react-redux";
import "./home.css";
import io from "socket.io-client";
import LikeButton from "../../components/LikeButton";
import Contact from "../../components/Contact";
import Collapse from "../../components/Collapse";
import Cards from "../../components/Cards";
//import { getLikesThunk } from "../../thunkActionsCreator";
import AreaForText from "../../components/AreaForText";
import Accueil from "../../components/Accueil";
import Snow from "../../components/Snow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  /*on recupere les valeurs du store redux pour le header*/

  const unsortedprojects = useSelector((state) => state.data.projects);
  const language = useSelector((state) => state.data.language);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const translations = useSelector((state) => state.data.translations);
  //console.log(unsortedprojects)
  /*on trie le tableau des projets par dates*/

  let projects = structuredClone(unsortedprojects);
  projects.sort(function (a, b) {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
  let newTab = [];
  for (let proj of projects) {
    if (proj.best === true) {
      newTab.push(proj);
    }
  }
  //console.log(newTab);
  const [loading, setLoading] = useState(true);
  const [sortedProjects, setSortedProjects] = useState(newTab);

  /*on demare l'ecoute du server websocket pour pouvoire receptionner les likes des autres utilisateurs en temps reel*/

  const socket = io.connect("https://api.pierre-le-developpeur.com");

  useEffect(() => {
    if (
      likes !== null &&
      skills !== null &&
      tools !== null &&
      translations !== null &&
      projects.length > 0
    ) {
      setLoading(false);
    } else {
      navigate("/Loader/Home");
      //window.location.href = "http://localhost:3001/Loader/Home";
    }
  }, []);

  function projectChoice() {
    setSortedProjects([]);
    newTab = [];
    for (let proj of projects) {
      if (
        proj.best === true &&
        document.querySelector(".topProject").checked === true
      ) {
        newTab.push(proj);
      }

      if (
        proj.category === "Front-end" &&
        document.querySelector(".frontEnd").checked === true
      ) {
        newTab.push(proj);
      }

      if (
        proj.category === "Full stack" &&
        document.querySelector(".fullStack").checked === true
      ) {
        newTab.push(proj);
      }

      if (
        proj.category === "Design" &&
        document.querySelector(".design").checked === true
      ) {
        newTab.push(proj);
      }

      if (
        proj.category === "C.M.S" &&
        document.querySelector(".cms").checked === true
      ) {
        newTab.push(proj);
      }

      if (document.querySelector(".Tous").checked === true) {
        newTab.push(proj);
      }
    }
    setSortedProjects(newTab);
  }

  /* debut de code pour loading (fonctionalité a venire)
  
  let loaded = false;

  window.addEventListener("load", () => {
    console.log("Chargé !!");
    loaded = true;
  });*/

  //const navigate = useNavigate();

  /*on verifie que les valeurs sont bien dans le store, dans le cas contraire on fait un refresh*/

  //setSortedProjects([]);

  /*mise a jour des like a la reception d'un signal socket i/o*/

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
        document.querySelector(".maGanache").src =
          "https://pierre-le-developpeur.com/assets/chatbot_bla.svg";
        setTimeout(() => {
          document.querySelector(".maGanache").src =
            "https://pierre-le-developpeur.com/assets/chatbot.svg";
        }, 1000);

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

  /*on consulte la largeure de la page au chargement afin de ne pas afficher le composant snow (les petales de cerisier) 
  sur les basses resolutions (composant gourmand en ressources)*/

  const Lscreen = window.innerWidth;
  if (loading === false) {
    return (
      <div>
        <div className="home body">
          {Lscreen > 650 ? (
            <div className="petales">
              <Snow></Snow>
            </div>
          ) : (
            ""
          )}
          <div className="fadeIn"></div>
          <div className="without">
            <span id="accueil"></span>
            <Accueil></Accueil>

            <div className="reco">
              <span id="reco" className="recoAnchor"></span>
              <div className="recoTxt">
                <AreaForText
                  props={{
                    french: translations.recommendation[0].contentfr,
                    english: translations.recommendation[0].contenteng,
                    likes: null,
                    links: null,
                    edit: false,
                    style: "empty",
                    id: "home02",
                    sign: true,
                    author: translations.recommendation[0].author,
                    authorLink: translations.recommendation[0].link,
                  }}
                ></AreaForText>
              </div>

              <LikeButton
                propsLike={{ id: likes[4]._id, color: "black" }}
              ></LikeButton>
            </div>
          </div>
          <div className="contact"></div>
          <div className="gradient"></div>
          <div className="competences">
            <span id="competences"></span>
            <div className="contentSkills">
              <AreaForText
                props={{
                  french: translations.french.skills,
                  english: translations.english.skills,
                  likes: null,
                  links: null,
                  edit: false,
                  style: "purpleAndWitheTextarea",
                  title: "Competences",
                  id: "home03",
                }}
                content={
                  <div className="collapseContent">
                    <div className="logoAndTitle">
                      <img
                        src={skills[1].picture_url}
                        alt="logo"
                        className="logo"
                      ></img>
                      <p className="toolTitle">
                        {language === "FR"
                          ? skills[1].french_title
                          : skills[1].english_title}
                      </p>
                    </div>
                    <div className="logoAndTitle">
                      <img
                        src={skills[2].picture_url}
                        alt="logo"
                        className="logo"
                      ></img>
                      <p className="toolTitle">
                        {language === "FR"
                          ? skills[2].french_title
                          : skills[2].english_title}
                      </p>
                    </div>
                    <div className="logoAndTitle">
                      <img
                        src={skills[13].picture_url}
                        alt="logo"
                        className="logo"
                      ></img>
                      <p className="toolTitle">
                        {language === "FR"
                          ? skills[13].french_title
                          : skills[13].english_title}
                      </p>
                    </div>
                    <div className="logoAndTitle">
                      <img
                        src={skills[14].picture_url}
                        alt="logo"
                        className="logo"
                      ></img>
                      <p className="toolTitle">
                        {language === "FR"
                          ? skills[14].french_title
                          : skills[14].english_title}
                      </p>
                    </div>
                  </div>
                }
              ></AreaForText>
            </div>
            <div className="pictureJap">
              <img
                src="https://pierre-le-developpeur.com/assets/background.png"
                className="background"
                alt="cerisier du japon (background)"
              ></img>
            </div>

            <div className="tools">
              <div className="collapse">
                <Collapse
                  name={"Design/Mao"}
                  content={tools.map((tool) =>
                    tool.categorie === "Design" ? (
                      <div key={tool._id} className="collapseContent">
                        <div className="logoAndTitle">
                          <img
                            src={tool.picture_url}
                            alt="logo"
                            className="logo"
                          ></img>
                          <p className="toolTitle">{tool.title} </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                ></Collapse>
              </div>
              <div className="collapse">
                <Collapse
                  name={"Front-end"}
                  content={tools.map((tool) =>
                    tool.categorie === "Front-end" ? (
                      <div key={tool._id} className="collapseContent">
                        <div className="logoAndTitle">
                          <img
                            src={tool.picture_url}
                            alt="logo"
                            className="logo"
                          ></img>
                          <p className="toolTitle">{tool.title}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                ></Collapse>
              </div>
              <div className="collapse">
                <Collapse
                  name={"Back-end"}
                  content={tools.map((tool) =>
                    tool.categorie === "Back-end" ? (
                      <div key={tool._id} className="collapseContent">
                        <div className="logoAndTitle">
                          <img
                            src={tool.picture_url}
                            alt="logo"
                            className="logo"
                          ></img>
                          <p className="toolTitle">{tool.title}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                ></Collapse>
              </div>
            </div>
          </div>

          <div className="projets" id="projets">
            <form className="projectChoice">
              <input
                type="radio"
                id="topProject"
                name="projectChoice"
                value="topProject"
                defaultChecked
                className={
                  language === "FR"
                    ? "topProject topProjectfr choice"
                    : "topProject topProjecteng choice"
                }
                onChange={(evt) => projectChoice(evt)}
              ></input>

              <input
                type="radio"
                id="frontEnd"
                name="projectChoice"
                value="frontEnd"
                className="frontEnd choice"
                onChange={(evt) => projectChoice(evt)}
              ></input>

              <input
                type="radio"
                id="design"
                name="projectChoice"
                value="design"
                className="design choice"
                onChange={(evt) => projectChoice(evt)}
              ></input>

              <input
                type="radio"
                id="fullStack"
                name="projectChoice"
                value="fullStack"
                className="fullStack choice"
                onChange={(evt) => projectChoice(evt)}
              ></input>

              <input
                type="radio"
                id="cms"
                name="projectChoice"
                value="cms"
                className="cms choice"
                onChange={(evt) => projectChoice(evt)}
              ></input>

              <input
                type="radio"
                id="Tous"
                name="projectChoice"
                value="Tous"
                className={
                  language === "FR"
                    ? "Tous Tousfr choice"
                    : "Tous Touseng choice"
                }
                onChange={(evt) => projectChoice(evt)}
              ></input>
            </form>
            {loading === false
              ? sortedProjects.map((project) => (
                  <div key={project._id}>
                    <Cards project={project}></Cards>
                  </div>
                ))
              : ""}
          </div>
          <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
        </div>
      </div>
    );
  }
}

export default Home;
