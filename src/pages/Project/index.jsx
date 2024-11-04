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

function Project() {
  const navigate = useNavigate();

  /*on recupere les valeurs du store redux pour le header*/

  const language = useSelector((state) => state.data.language);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const projects = useSelector((state) => state.data.projects);
  const translations = useSelector((state) => state.data.translations);

  /*on recupere le titre du projet*/

  let { title } = useParams();

  //const dispatch = useDispatch();
  let divCounter = true;

  /*on demmare AOS, une librairie pour gerer des effets au scroll*/

  useEffect(() => {
    AOS.init();
  }, []);

  /*on fait en sorte d'effacer du DOM les fleches du slider apres que l'utilisateur ai suffisemment scroller 
    (et de les remmettre dans le cas contraire*/

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    if (
      document.querySelector(".arrowRight") !== null &&
      document.querySelector(".arrowLeft") !== null
    ) {
      if (scrollTop > 100) {
        document.querySelector(".arrowRight").classList.add("blinded");
        document.querySelector(".arrowLeft").classList.add("blinded");
      } else {
        document.querySelector(".arrowRight").classList.remove("blinded");
        document.querySelector(".arrowLeft").classList.remove("blinded");
      }
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

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

  /*on verifie que les valeurs sont bien dans le store, dans le cas contraire on fait un refresh*/

  if (
    likes != null &&
    skills != null &&
    tools &&
    projects &&
    project &&
    translations != null
  ) {
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
        <div
          className="scrollDown"
          style={{
            opacity: 1 - scrollTop / 40,
          }}
        >
          <div className="scrollDot"></div>
        </div>
        <span id="project"></span>

        <div
          className="slider"
          style={{
            opacity: 1 - scrollTop / 350,
          }}
        >
          <div
            className="transition"
            style={{
              bottom: "0",
              height: scrollTop * 4,
            }}
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
          <AreaForText
            props={{
              french: project.french_description,
              english: project.english_description,
              likes: project.content_likes_id,
              links: project.links,
              edit: false,
              style: "windows",
              cofee: true,
              id: "project00",
            }}
          ></AreaForText>
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
                    alt="illustration projet"
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
                  <LikeButton
                    propsLike={{ id: tool.likes_id, color: "black" }}
                  ></LikeButton>
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
                  <LikeButton
                    propsLike={{ id: skill.likes_id, color: "black" }}
                  ></LikeButton>
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
