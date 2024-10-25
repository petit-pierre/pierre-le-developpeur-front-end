import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePictureThunk,
  putProjectThunk,
  setLikeThunk,
  setProjectPictureThunk,
  setProjectThunk,
} from "../../thunkActionsCreator";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./postProject.css";
import PicsUpload from "../../components/PicsUpload";

function PostProject() {
  const [close, setClose] = useState(false);
  const [picToDelete, setPicToDelete] = useState([]);
  let picsToDelete = [];
  let project = "newOne";
  let { projectId } = useParams();
  //console.log(projectId);
  const projects = useSelector((state) => state.data.projects);
  const [now, setNow] = useState(new Date());
  const titl = now + "";
  const title = titl
    .split(" ")
    .join("")
    .substring(0, 20)
    .split(":")
    .join("")
    .toLowerCase();

  let password = localStorage.getItem("password");
  //console.log(title);

  if (projectId !== "newOne") {
    project = projects.find((projects) => projects._id === projectId);
  }
  const previousLikes = useSelector((state) => state.data.likes);
  //let sliders = [];
  //let links = [];
  const [sliders, setSliders] = useState([]);
  const [links, setLinks] = useState([]);
  const [truc, setTruc] = useState(0);
  const [video, setVideo] = useState(false);
  //let slideToDellette = [];
  const [slideToDellette, setSlideToDellette] = useState([]);
  //let Sliders = [];

  /*useEffect(() => {
    console.log("coucou");
  }, [links]);*/

  //console.log(project);
  useEffect(() => {
    if (projectId !== "newOne") {
      setLinks(links.concat(project.links));
      setSliders(sliders.concat(project.sliders));
    }
  }, []);

  const linkList = [
    { id: 1, name: "web" },
    { id: 2, name: "github" },
    { id: 3, name: "pierre le dev" },
  ];

  const Category = [
    { id: 1, name: "Front-end" },
    { id: 2, name: "Design" },
    { id: 3, name: "Full stack" },
    { id: 4, name: "C.M.S" },
  ];
  const Skills = useSelector((state) => state.data.skills);
  const Tools = useSelector((state) => state.data.tools);
  let designTools = [];
  let frontTools = [];
  let backTools = [];
  for (let tool of Tools) {
    if (tool.categorie === "Design") {
      designTools.push({ title: tool.title, id: tool._id });
    }
  }
  for (let tool of Tools) {
    if (tool.categorie === "Front-end") {
      frontTools.push({ title: tool.title, id: tool._id });
    }
  }
  for (let tool of Tools) {
    if (tool.categorie === "Back-end") {
      backTools.push({ title: tool.title, id: tool._id });
    }
  }

  const frenchProjectTitle = useRef();
  const englishProjectTitle = useRef();
  const date = useRef();
  const frenchDescription = useRef();
  const englishDescription = useRef();
  const linkUrl = useRef();
  const frenchSliderContent = useRef();
  const englishSliderContent = useRef();
  const frenchResum = useRef();
  const englishResum = useRef();
  const sliderVideo = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = useSelector((state) => state.data.token);
  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function saveProject(evt) {
    //ajouter validation de tout les champs!!!!
    evt.preventDefault();
    const projectCategories = document.querySelectorAll(".Categories");
    let category = "";
    for (let projectCategory of projectCategories) {
      if (projectCategory.checked === true) {
        category = projectCategory.value;
      }
    }
    if (
      frenchProjectTitle.current.value &&
      englishProjectTitle.current.value &&
      category &&
      date.current.value &&
      englishDescription.current.value &&
      frenchDescription.current.value &&
      frenchResum.current.value &&
      englishResum.current.value !== ""
    ) {
      const projectTool = document.querySelectorAll(".Tools");
      const projectTools = [];
      for (let tool of projectTool) {
        if (tool.checked === true) {
          projectTools.push({ id: tool.value, name: tool.name });
        }
      }
      const projectSkill = document.querySelectorAll(".Skills");
      const projectSkills = [];
      for (let skill of projectSkill) {
        if (skill.checked === true) {
          projectSkills.push({ id: skill.value, name: skill.name });
        }
      }

      setPicToDelete(slideToDellette);
      //console.log(picToDelete);
      if (picsToDelete !== null) {
        setClose(true);
      }
      for (let slid of sliders) {
        if (slid.newPicture === true) {
          delete slid._id;
        }
      }

      const newProject = {
        best: document.querySelector(".topProject").checked,
        french_title: frenchProjectTitle.current.value,
        english_title: englishProjectTitle.current.value,
        category: category,
        date: date.current.value,
        tools: projectTools,
        english_description: englishDescription.current.value,
        french_description: frenchDescription.current.value,
        french_resum: frenchResum.current.value,
        english_resum: englishResum.current.value,
        links: links,
        sliders: sliders,
        details: [],
        skills: projectSkills,
      };

      const likeSubmit = async () => {
        let likes = {
          title: newProject.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        newProject.likes_id = setLikesResult._id;
      };
      if (projectId !== "newOne") {
        newProject.likes_id = project.likes_id;
      } else {
        likeSubmit();
      }

      const likeSliderSubmit = async () => {
        let likes = {
          title: "slider" + newProject.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        newProject.slider_likes_id = setLikesResult._id;
      };
      if (projectId !== "newOne") {
        newProject.slider_likes_id = project.slider_likes_id;
      } else {
        likeSliderSubmit();
      }

      const likeContentSubmit = async () => {
        const likes = {
          title: "content" + newProject.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        newProject.content_likes_id = setLikesResult._id;
      };
      if (projectId !== "newOne") {
        newProject.content_likes_id = project.content_likes_id;
      } else {
        likeContentSubmit();
      }

      const finalSubmit = async () => {
        setTimeout(() => {
          if (project === "newOne") {
            const setProjectResult = dispatch(
              setProjectThunk(newProject, token)
            );
          } else {
            const id = projectId;
            const putProjectResult = dispatch(
              putProjectThunk(newProject, token, id)
            );
          }
        }, 1000);
      };

      finalSubmit();
      setTimeout(() => {
        navigate("/User");
      }, 1000);
    } else {
      alert("champs incomplets");
    }
  }
  function RemoveSlide(evt, projectSlide) {
    evt.preventDefault();
    if (projectSlide.newPicture === true) {
      let tempObj = { name: "slide" + projectSlide.picture_id + ".webp" };
      slideToDellette.push(tempObj);
      setSlideToDellette(slideToDellette);
    }

    const found = sliders.find((sli) => sli === projectSlide);
    const index = sliders.findIndex((slideIndex) => slideIndex === found);
    sliders.splice(index, 1);
    setSliders(sliders);
    set(evt);
  }
  function ProjectSliderUpdate(evt) {
    evt.preventDefault();

    //console.log(now);
    if (frenchSliderContent.current.value === "") {
      frenchSliderContent.current.value = "nothing";
    }
    if (englishSliderContent.current.value === "") {
      englishSliderContent.current.value = "nothing";
    }
    //console.log(frenchSliderContent.current.value);
    let Slider = document.querySelector(".Slider");
    let TextPicture = document.querySelector(".TextPicture");

    let Video = document.querySelector(".Video");
    let SliderType = null;
    if (Slider.checked === true) {
      SliderType = "Slider";
    }
    if (TextPicture.checked === true) {
      SliderType = "TextPicture";
    }
    //let photo = document.querySelector(".sliderPicture");
    if (Video.checked === true) {
      SliderType = "Video";
      if (
        sliderVideo.current.value &&
        //frenchSliderContent.current.value &&
        //englishSliderContent.current.value &&
        SliderType !== null
        //sliderAlt.current.value !== ""
      ) {
        const videoUrl = "https://www.youtube.com/embed/".concat(
          sliderVideo.current.value.substring(32)
        );
        //const videoUrl = sliderVideo.current.value.substring(32);
        let slider = {
          picture: videoUrl,
          picture_id: videoUrl,
          temporaryUrl: videoUrl,
          newPicture: false,
          //alt: sliderAlt.current.value,
          alt: SliderType,
          french_content: frenchSliderContent.current.value,
          english_content: englishSliderContent.current.value,
          //_id: title,
        };
        sliders.push(slider);
        setSliders(sliders);
        alert("slide ajouté : ");
        set(evt);
        SliderType = null;
        frenchSliderContent.current.value = "";
        englishSliderContent.current.value = "";
        sliderVideo.current.value = "";
      } else {
        alert("champs incomplets");
      }
    } else {
      if (
        //photo.files[0] &&
        //frenchSliderContent.current.value &&
        //englishSliderContent.current.value &&
        SliderType !== null
        //sliderAlt.current.value !== ""
      ) {
        let slider = {
          picture:
            "https://pierre-le-developpeur.com/assets/images/slide" +
            title +
            ".webp",
          //temporaryUrl: URL.createObjectURL(photo.files[0]),
          picture_id: title,
          newPicture: true,
          name: "slide" + title + ".webp",
          //alt: sliderAlt.current.value,
          alt: SliderType,
          french_content: frenchSliderContent.current.value,
          _id: title,
          english_content: englishSliderContent.current.value,
        };
        sliders.push(slider);
        setSliders(sliders);
        alert("slide ajouté : " + title);
        set(evt);
        SliderType = null;
        frenchSliderContent.current.value = "";
        englishSliderContent.current.value = "";
        //photo.value = "";
      } else {
        alert("champs incomplets");
      }
    }
    setNow(new Date());
  }
  function set(evt) {
    evt.preventDefault();
    setTruc(truc + 1);
  }
  function ProjectLinksUpdate(evt) {
    evt.preventDefault();
    const projectLinks = document.querySelectorAll(".Link");
    let linkCategory = "";
    for (let projectLink of projectLinks) {
      if (projectLink.checked === true) {
        linkCategory = projectLink.value;
      }
    }
    if (linkUrl.current.value && linkCategory !== "") {
      let linkContent = {
        url: linkUrl.current.value,
        category: linkCategory,
      };

      links.push(linkContent);
      setLinks(links);
      set(evt);
      //console.log(links);
      //alert("lien ajouté : " + linkContent.url);

      linkUrl.current.value = "";
      //return links.map((li) => <p>{li.url}</p>);
      //<p>coucou</p>;
    } else {
      alert("champs incomplets");
    }
    set(evt);
  }

  function ProjectLinksDellete(evt, prlink) {
    evt.preventDefault();
    const found = links.find((li) => li === prlink);
    const index = links.findIndex((la) => la === found);
    links.splice(index, 1);
    setLinks(links);
    //console.log(links);
    set(evt);
  }

  function cancelProject(evt) {
    evt.preventDefault();
    //console.log(sliders);

    for (let slide of sliders) {
      if (slide.newPicture === true) {
        picsToDelete.push(slide);
      }
    }

    setPicToDelete(picsToDelete);
    if (picsToDelete !== null) {
      setClose(true);
    }
    setTimeout(() => {
      navigate("/User");
    }, 1000);
  }

  if (project === undefined) {
    project = null;
  }

  function SliderType(evt) {
    if (evt.target.value === "Video") {
      setVideo(true);
    } else {
      setVideo(false);
    }
  }

  function UpdateSlide(evt, projectSlide) {
    evt.preventDefault();

    let mySlide = sliders.find((slide) => slide._id === projectSlide._id);
    //console.log(sliders.indexOf(mySlide));
    let slideCopy = structuredClone(mySlide);
    slideCopy.french_content = document.querySelector(
      ".updatefr" + projectSlide._id
    ).value;
    slideCopy.english_content = document.querySelector(
      ".updateeng" + projectSlide._id
    ).value;
    sliders[sliders.indexOf(mySlide)] = slideCopy;
    //set(evt);

    alert("slide modifié");
  }

  function toTheLeftSlide(evt, projectSlide) {
    evt.preventDefault();
    //console.log(sliders);
    let mySliders = structuredClone(sliders);
    let mySlide = mySliders.find((slide) => slide._id === projectSlide._id);
    let index = mySliders.indexOf(mySlide);
    if (mySliders.indexOf(mySlide) > 0) {
      [mySliders[index - 1], mySliders[index]] = [
        mySliders[index],
        mySliders[index - 1],
      ];
      setSliders(mySliders);
    }
  }

  function toTheRightSlide(evt, projectSlide) {
    evt.preventDefault();
    let mySliders = structuredClone(sliders);
    let mySlide = mySliders.find((slide) => slide._id === projectSlide._id);
    let index = mySliders.indexOf(mySlide);
    if (mySliders.indexOf(mySlide) < mySliders.length - 1) {
      [mySliders[index], mySliders[index + 1]] = [
        mySliders[index + 1],
        mySliders[index],
      ];
      setSliders(mySliders);
    }
  }
  function defr(evt) {
    //evt.preventDefault();
    console.log(document.querySelector(".topProject").checked);
  }
  return (
    <div className="postProject">
      <fieldset>
        <input
          type="checkbox"
          name="topProject"
          className="topProject"
          onChange={(evt) => defr(evt)}
          defaultChecked={project.best === true ? true : false}
        ></input>
        <label for="topProject">⭐Top project ?</label>
        <form>
          <h1>Post new project</h1>
          <div>
            <p>title in french : </p>
            <textarea
              ref={frenchProjectTitle}
              type="text"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.french_title
              }
            />
          </div>
          <div>
            <p>title in english : </p>
            <textarea
              ref={englishProjectTitle}
              type="text"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.english_title
              }
            />
          </div>
          <div>
            <p>date : </p>
            <input
              ref={date}
              type="date"
              //onfocus={(date.type = "date")}
              //onblur="(this.type='text')"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.date
              }
            />
          </div>

          <div>
            <p>description in french : </p>
            <textarea
              ref={frenchDescription}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.french_description
              }
            />
          </div>
          <div>
            <p>description in english : </p>
            <textarea
              ref={englishDescription}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.english_description
              }
            />
          </div>
          <div>
            <p>resum in french : </p>
            <textarea
              ref={frenchResum}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.french_resum
              }
            />
          </div>
          <div>
            <p>resum in english : </p>
            <textarea
              ref={englishResum}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.english_resum
              }
            />
          </div>
          <fieldset>
            <legend>Links :</legend>
            {links.map((prlink) => (
              <fieldset key={prlink._id}>
                <p>link url : {prlink.url}</p>

                <p>category : {prlink.category}</p>
                <button onClick={(evt) => ProjectLinksDellete(evt, prlink)}>
                  remove this link :
                </button>
              </fieldset>
            ))}

            <div>
              <p>link url : </p>
              <input ref={linkUrl} type="text" />
            </div>
            <legend>category :</legend>
            {linkList.map((link) => (
              <div key={link._id}>
                <input
                  className="Link"
                  type="radio"
                  name="Link"
                  id={link.id}
                  value={link.name}
                />
                <label htmlFor="Link">{link.name}</label>
              </div>
            ))}
            <button onClick={(evt) => ProjectLinksUpdate(evt)}>
              add this link :
            </button>
          </fieldset>
          <fieldset className="sliderField">
            <legend>Slider :</legend>
            {sliders.map((projectSlide) => (
              <fieldset className="sliderContainer" key={projectSlide._id}>
                {projectSlide.alt === "Video" ? (
                  <iframe
                    class="video"
                    width="560"
                    height="315"
                    src={projectSlide.picture}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                ) : (
                  <img
                    src={projectSlide.picture}
                    alt={projectSlide.alt}
                    className="sliderPictureShow"
                  ></img>
                )}
                <h3>{projectSlide.alt} </h3>
                <textarea
                  defaultValue={projectSlide.french_content}
                  className={"updatefr" + projectSlide._id}
                ></textarea>
                <textarea
                  defaultValue={projectSlide.english_content}
                  className={"updateeng" + projectSlide._id}
                ></textarea>
                {sliders.indexOf(projectSlide) > 0 ? (
                  <button onClick={(evt) => toTheLeftSlide(evt, projectSlide)}>
                    move left :
                  </button>
                ) : (
                  ""
                )}
                {sliders.indexOf(projectSlide) < sliders.length - 1 ? (
                  <button onClick={(evt) => toTheRightSlide(evt, projectSlide)}>
                    move right :
                  </button>
                ) : (
                  ""
                )}
                <button onClick={(evt) => UpdateSlide(evt, projectSlide)}>
                  update this slide :
                </button>
                <button onClick={(evt) => RemoveSlide(evt, projectSlide)}>
                  remove this slide :
                </button>
              </fieldset>
            ))}
            <div className="sliderAdd">
              <div>
                <p>slider or Content or Video : </p>
                <form className="sliderType">
                  <input
                    type="radio"
                    id="Slider"
                    name="SliderType"
                    value="Slider"
                    className="Slider"
                    defaultChecked
                    onChange={(evt) => SliderType(evt)}
                  ></input>
                  <label for="Slider">Slider</label>
                  <input
                    type="radio"
                    id="TextPicture"
                    name="SliderType"
                    value="TextPicture"
                    className="TextPicture"
                    onChange={(evt) => SliderType(evt)}
                  ></input>
                  <label for="TextPicture">Text&picture</label>

                  <input
                    type="radio"
                    id="Video"
                    name="SliderType"
                    value="Video"
                    className="Video"
                    onChange={(evt) => SliderType(evt)}
                  ></input>
                  <label for="Video">Video</label>
                </form>
              </div>
              {video === true ? (
                <div>
                  <p>Video URL :</p>
                  <textarea ref={sliderVideo}></textarea>
                </div>
              ) : (
                <div>
                  <p>slider picture : </p>
                  <PicsUpload
                    props={{
                      name: "slide" + title + ".webp",
                      type: "image/webp",
                    }}
                  ></PicsUpload>
                </div>
              )}

              <div>
                <p>slider content in french : </p>
                <textarea ref={frenchSliderContent} type="text" />
              </div>
              <div>
                <p>slider content in english : </p>
                <textarea ref={englishSliderContent} type="text" />
              </div>
              <button onClick={(evt) => ProjectSliderUpdate(evt)}>
                {" "}
                add this slide :{" "}
              </button>
            </div>
          </fieldset>

          <div>
            <fieldset>
              <legend>category :</legend>
              {Category.map((categorie) => (
                <div key={categorie.id}>
                  <input
                    className="Categories"
                    type="radio"
                    name="category"
                    id={categorie.id}
                    value={categorie.name}
                    defaultChecked={
                      project === null ||
                      project === undefined ||
                      project === "newOne"
                        ? null
                        : categorie.name === project.category
                        ? "true"
                        : null
                    }
                  />
                  <label htmlFor="category">{categorie.name}</label>
                </div>
              ))}
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>skills :</legend>
              {Skills.map((skill) => (
                <div key={skill._id}>
                  {project === null ||
                  project.skills === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Skills"
                      type="checkbox"
                      name={skill.french_title}
                      id={skill._id}
                      value={skill._id}
                    />
                  ) : project.skills.find(
                      (sk) => sk.name === skill.french_title
                    ) !== undefined ? (
                    <input
                      className="Skills"
                      type="checkbox"
                      name={skill.french_title}
                      id={skill._id}
                      value={skill._id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Skills"
                      type="checkbox"
                      name={skill.french_title}
                      id={skill._id}
                      value={skill._id}
                    />
                  )}

                  <label htmlFor={skill.french_title}>
                    {skill.french_title}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>Design tools :</legend>
              {designTools.map((tool) => (
                <div key={tool._id}>
                  {project === null ||
                  project.tools === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  ) : project.tools.find((prt) => prt.name === tool.title) !==
                    undefined ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  )}

                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Front-end tools :</legend>
              {frontTools.map((tool) => (
                <div key={tool._id}>
                  {project === null ||
                  project.tools === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  ) : project.tools.find((prt) => prt.name === tool.title) !==
                    undefined ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  )}

                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Back-end tools :</legend>
              {backTools.map((tool) => (
                <div key={tool._id}>
                  {project === null ||
                  project.tools === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  ) : project.tools.find((prt) => prt.name === tool.title) !==
                    undefined ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  )}
                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
          </div>
          <button onClick={(evt) => saveProject(evt)}>Save</button>
          <button onClick={(evt) => cancelProject(evt)}>Cancel</button>
        </form>
      </fieldset>
      {picToDelete.map((pic) =>
        close === true ? (
          <iframe
            style={{ display: "none" }}
            width={0}
            height={0}
            frameBorder="0"
            src={
              "https://pierre-le-developpeur.com/justdelete.php?type=image/png&title=" +
              pic.name +
              "&password=" +
              password
            }
            title="delete picture"
          ></iframe>
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default PostProject;
