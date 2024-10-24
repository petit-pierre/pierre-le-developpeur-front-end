import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./home.css";
import io from "socket.io-client";
import LikeButton from "../../components/LikeButton";
import Contact from "../../components/Contact";
//import { useEffect } from "react";
import Collapse from "../../components/Collapse";
import Cards from "../../components/Cards";
//import { getLikesThunk } from "../../thunkActionsCreator";
import AreaForText from "../../components/AreaForText";
import Accueil from "../../components/Accueil";
import Snow from "../../components/Snow";
import { useState } from "react";

function Home() {
  /*on recupere les valeurs du store redux pour le header*/

  const language = useSelector((state) => state.data.language);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const translations = useSelector((state) => state.data.translations);
  const unsortedprojects = useSelector((state) => state.data.projects);

  /*on trie le tableau des projets par dates*/

  let projects = structuredClone(unsortedprojects);
  projects.sort(function (a, b) {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });

  /*on demare l'ecoute du server websocket pour pouvoire receptionner les likes des autres utilisateurs en temps reel*/

  const socket = io.connect("https://api.petitpierre.net");

  /* ce code est inutile mais je le conserve encore un peu pour en etre sur
  
  const dispatch = useDispatch();

  useEffect(() => {
    const getLikes = async () => {
      const getLikesResult = await dispatch(getLikesThunk());
    };
    getLikes();
  }, []);*/

  /* debut de code pour loading (fonctionalité a venire)
  
  let loaded = false;

  window.addEventListener("load", () => {
    console.log("Chargé !!");
    loaded = true;
  });*/

  const navigate = useNavigate();

  /*on verifie que les valeurs sont bien dans le store, dans le cas contraire on fait un refresh*/

  if (
    likes != null &&
    skills != null &&
    tools &&
    translations &&
    projects != null
  ) {
    /*mise a jour des like a la reception d'un signal socket i/o*/

    async function getOldLikes(response) {
      const get = await fetch("https://api.petitpierre.net/api/likes", {
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
      setTimeout(() => {
        getOldLikes(response);
      }, 150);
    });

    /*on consulte la largeure de la page au chargement afin de ne pas afficher le composant snow (les petales de cerisier) 
  sur les basses resolutions (composant gourmand en ressources)*/

    const Lscreen = window.innerWidth;

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

          <span id="accueil"></span>
          <Accueil></Accueil>
          <div className="accueil">
            <div className="reco">
              <span id="reco" className="recoAnchor"></span>
              <div className="recoTxt">
                <AreaForText
                  props={{
                    french: translations.french.recommendation[0].content,
                    english: translations.english.recommendation[0].content,
                    likes: null,
                    links: null,
                    edit: false,
                    style: "empty",
                    id: "home02",
                    sign: true,
                    author: translations.french.recommendation[0].author,
                    authorLink: translations.french.recommendation[0].link,
                  }}
                ></AreaForText>
              </div>
              <div className="like">
                <LikeButton
                  propsLike={{ id: likes[4]._id, color: "black" }}
                  className="like"
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
                  content={skills.map((skill) => (
                    <div key={skill._id} className="collapseContent">
                      <div className="logoAndTitle">
                        <img
                          src={skill.picture_url}
                          alt="logo"
                          className="logo"
                        ></img>
                        <p className="toolTitle">
                          {language === "FR"
                            ? skill.french_title
                            : skill.english_title}
                        </p>
                      </div>
                    </div>
                  ))}
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
                          <div className="like">
                            <LikeButton
                              propsLike={{
                                id: tool.likes_id,
                                color: "black",
                              }}
                            ></LikeButton>
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
                          <div className="like">
                            <LikeButton
                              propsLike={{ id: tool.likes_id, color: "black" }}
                            ></LikeButton>
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
                          <div className="like">
                            <LikeButton
                              propsLike={{ id: tool.likes_id, color: "black" }}
                            ></LikeButton>
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
          </div>
          <div className="projets" id="projets">
            {projects.map((project) => (
              <div key={project._id}>
                <Cards project={project}></Cards>
              </div>
            ))}
          </div>
          <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }
}

export default Home;
