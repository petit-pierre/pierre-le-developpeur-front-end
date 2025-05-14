import { useSelector } from "react-redux";
import "./project.css";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../../components/Slider";
import LikeButton from "../../components/LikeButton";
import Collapse from "../../components/Collapse";
import { useEffect, useState } from "react";
import AreaForText from "../../components/AreaForText";
import Contact from "../../components/Contact";
import AOS from "aos";
import "aos/dist/aos.css";
import io from "socket.io-client";

function Project() {
  const navigate = useNavigate();
  const socket = io.connect("https://api.pierre-le-developpeur.com");
  /*on recupere les valeurs du store redux pour le header*/

  const language = useSelector((state) => state.data.language);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const projects = useSelector((state) => state.data.projects);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);

  /*on recupere le titre du projet*/

  let { title } = useParams();

  const [loading, setLoading] = useState(true);

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
      navigate("/Loader/" + title);
      //window.location.href = "http://localhost:3001/Loader/Home";
    }
  }, []);

  //const dispatch = useDispatch();
  let divCounter = true;

  /*on demmare AOS, une librairie pour gerer des effets au scroll*/

  useEffect(() => {
    AOS.init();
  }, []);

  /*on fait en sorte d'effacer du DOM les fleches du slider apres que l'utilisateur ai suffisemment scroller 
    (et de les remmettre dans le cas contraire*/

  const [scrolling, setScrolling] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollToTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollToTop);
    };
    window.addEventListener("scroll", onScroll);
    if (
      document.querySelector(".arrowRight") !== null &&
      document.querySelector(".arrowLeft") !== null
    ) {
      if (scrollToTop > 100) {
        document.querySelector(".arrowRight").classList.add("blinded");
        document.querySelector(".arrowLeft").classList.add("blinded");
      } else {
        document.querySelector(".arrowRight").classList.remove("blinded");
        document.querySelector(".arrowLeft").classList.remove("blinded");
      }
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollToTop]);

  /* ce code est inutile mais je le conserve encore un peu pour en etre sur
  useEffect(() => {
    const getLikes = async () => {
      const getLikesResult = await dispatch(getLikesThunk());
    };
    getLikes();
  }, []);
  */

  /*on recupere les infos du projet concerné par cette page*/

  const project = projects.find((project) => project.french_title === title);

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

  if (loading === false) {
    /*on creer un tableau pour tier les slides*/

    /*on creer un tableau pour les tools du projet*/

    const tadaTools = [];
    for (let oneOfTools of tools) {
      for (let projectTool of project.tools) {
        if (projectTool.id.includes(oneOfTools._id)) {
          tadaTools.push(oneOfTools);
        }
      }
    }

    /*on creer un tableau pour les skills du projet*/

    const tadaSkills = [];
    for (let oneOfSkills of skills) {
      for (let projectSkill of project.skills) {
        if (projectSkill.id.includes(oneOfSkills._id)) {
          tadaSkills.push(oneOfSkills);
        }
      }
    }

    return project !== undefined ? (
      <div className="projectPage">
        <div className={discuss === false ? "blabla" : "blablabla"}>
          <img
            src="https://pierre-le-developpeur.com/assets/blabla.jpg"
            alt="ceriser du japon"
          ></img>
        </div>
        <div className="fadeIn"></div>
        <div
          className="scrollDown"
          style={
            discuss === true
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 1 - scrollToTop / 40,
                }
          }
        >
          <div className="scrollDot"></div>
        </div>
        <span id="project"></span>

        <div
          className="slider"
          style={
            discuss === true
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 1 - scrollToTop / 350,
                }
          }
        >
          <div
            className="transition"
            style={
              discuss === true
                ? {
                    height: 2000,
                  }
                : {
                    bottom: "0",
                    height: scrollToTop * 4,
                  }
            }
          ></div>
          <Slider
            sliders={project.sliders}
            mini={false}
            likeId={project.slider_likes_id}
          ></Slider>{" "}
        </div>
        <div
          className="textAndLinks"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="resum">
            <AreaForText
              props={{
                french: project.french_description,
                english: project.english_description,
                likes: project.content_likes_id,
                links: null,
                //links: project.links,
                edit: false,
                style: "purpleAndWitheTextarea",
                cofee: true,
                id: "project00",
                frenchTitle: project.french_title,
                englishTitle: project.english_title,
              }}
            ></AreaForText>
          </div>

          <div className="links">
            <AreaForText
              props={{
                french: project.links[0].url + "\n" + project.links[2].url,
                english: project.links[1].url + "\n" + project.links[3].url,

                links: null,
                //links: project.links,
                edit: false,
                style: "purpleAndWitheTextarea",
                cofee: false,
                id: "project01",
                frenchTitle: "Liens",
                englishTitle: "Links",
              }}
            ></AreaForText>
          </div>
        </div>
        <div className="description">
          {project.details.map((slide) =>
            slide.alt === "Video" ? (
              <div
                className="videoField"
                data-aos="zoom-in"
                data-aos-duration="2000"
              >
                <div key={"video" + slide._id}>
                  {language === "FR" ? (
                    slide.french_content === "nothing" ? (
                      ""
                    ) : (
                      <p>{slide.french_content} </p>
                    )
                  ) : slide.english_content === "nothing" ? (
                    ""
                  ) : (
                    <p>{slide.english_content} </p>
                  )}
                  <iframe
                    className="video"
                    height={window.innerWidth * 0.45}
                    src={slide.picture.concat("?rel=0")}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <div
                key={slide._id}
                className={
                  divCounter === true
                    ? "descriptionUnit left"
                    : "descriptionUnit right"
                }
              >
                <div className="pics">
                  <img
                    src={slide.picture}
                    alt={slide.alt}
                    data-aos="flip-left"
                    data-aos-duration="1000"
                  ></img>
                </div>
                <div
                  className="text"
                  data-aos={divCounter === true ? "fade-left" : "fade-right"}
                >
                  <AreaForText
                    props={{
                      french: slide.french_content,
                      english: slide.english_content,
                      edit: false,
                      style: "empty",
                      cofee: false,
                      id: "project" + slide._id,
                    }}
                  >
                    {" "}
                  </AreaForText>{" "}
                  {(divCounter = !divCounter)}
                </div>
              </div>
            )
          )}
        </div>
        <div className="tools">
          <div className="collapse" data-aos="fade-right">
            <Collapse
              name={language === "FR" ? "Competences" : "Skills"}
              content={tadaTools.map((tool) => (
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
              ))}
            ></Collapse>
          </div>

          <div className="collapse" data-aos="fade-left">
            <Collapse
              name="Soft skills"
              content={tadaSkills.map((skill) => (
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
                        : skill.english_title}{" "}
                    </p>
                  </div>
                </div>
              ))}
            ></Collapse>
          </div>
        </div>

        <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
      </div>
    ) : (
      setTimeout(() => {
        navigate("/HomeProject" + title);
      }, 500)
    );
  }
}
export default Project;
