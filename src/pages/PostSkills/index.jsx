import { useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PicsUpload from "../../components/PicsUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  setLikeThunk,
  setSkillThunk,
  putSkillThunk,
} from "../../thunkActionsCreator";

function PostSkills() {
  let currentSkill = "newOne";
  let { skillId } = useParams();
  const skills = useSelector((state) => state.data.skills);
  if (skillId !== "newOne") {
    currentSkill = skills.find((sk) => sk._id === skillId);
  }
  const frenchTitle = useRef();
  const englishTitle = useRef();
  const link = useRef();
  const now = useRef(new Date());

  const [close, setClose] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => state.data.token);

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }
  function saveSkill(evt, skill) {
    let pic;
    if (currentSkill === "newOne") {
      pic = "https://pierre-le-developpeur.com/assets/images/" + title;
    } else {
      pic = currentSkill.picture_url;
    }
    evt.preventDefault();
    if (frenchTitle.current.value && englishTitle.current.value) {
      const skill = {
        french_title: frenchTitle.current.value,
        english_title: englishTitle.current.value,
        picture_url: pic,
        picture_id: title,
        links: link.current.value,
      };
      const likeSubmit = async () => {
        const likes = {
          title: skill.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        skill.likes_id = setLikesResult._id;
      };

      const finalSubmit = async () => {
        if (currentSkill === "newOne") {
          likeSubmit();
          await setTimeout(() => {
            const setSkillResult = dispatch(setSkillThunk(skill, token));
          }, 500);
        } else {
          await setTimeout(() => {
            const setSkillResult = dispatch(
              putSkillThunk(skill, token, skillId)
            );
          }, 500);
        }
      };

      finalSubmit();

      navigate("/User");
    } else {
      alert("champs incomplets");
    }
  }
  const titl = now.current + "";
  const titlee = titl
    .split(" ")
    .join("")
    .substring(0, 20)
    .split(":")
    .join("")
    .toLowerCase();
  const title = titlee + "skill.png";
  let password = localStorage.getItem("password");
  function cancelSkill() {
    setClose(true);
    setTimeout(() => {
      navigate("/User");
    }, 1000);
  }

  return (
    <div style={{ marginTop: "20dvh" }} className="postSkills">
      <p>title in french :</p>
      <input
        type="text"
        ref={frenchTitle}
        defaultValue={
          currentSkill === null ||
          currentSkill === undefined ||
          currentSkill === "newOne"
            ? null
            : currentSkill.french_title
        }
      ></input>
      <p>title in english :</p>
      <input
        type="text"
        ref={englishTitle}
        defaultValue={
          currentSkill === null ||
          currentSkill === undefined ||
          currentSkill === "newOne"
            ? null
            : currentSkill.english_title
        }
      ></input>
      <p>link to certificate (optional) :</p>
      <input
        type="text"
        ref={link}
        defaultValue={
          currentSkill === null ||
          currentSkill === undefined ||
          currentSkill === "newOne"
            ? "none"
            : currentSkill.links
        }
      ></input>
      <p>picture :</p>

      <p></p>
      {currentSkill === null ||
      currentSkill === undefined ||
      currentSkill === "newOne" ? (
        <div>
          <PicsUpload props={{ name: title, type: "image/png" }}></PicsUpload>
          {close === true ? (
            <iframe
              style={{ display: "none" }}
              width={0}
              height={0}
              frameBorder="0"
              src={
                "https://pierre-le-developpeur.com/justdelete.php?type=image/png&title=" +
                title +
                "&password=" +
                password
              }
              title="delete picture"
            ></iframe>
          ) : (
            ""
          )}
        </div>
      ) : (
        <img src={currentSkill.picture_url} alt="logo"></img>
      )}

      <div>
        <button onClick={(evt) => saveSkill(evt, currentSkill)}>Save</button>
        <button onClick={(evt) => cancelSkill(evt)}>Cancel</button>
      </div>
    </div>
  );
}
export default PostSkills;
