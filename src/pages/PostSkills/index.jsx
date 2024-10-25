import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PicsUpload from "../../components/PicsUpload";
import { useDispatch, useSelector } from "react-redux";
import { setLikeThunk, setSkillThunk } from "../../thunkActionsCreator";

function PostSkills() {
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
  function saveSkill(evt) {
    evt.preventDefault();
    if (frenchTitle.current.value && englishTitle.current.value) {
      const skill = {
        french_title: frenchTitle.current.value,
        english_title: englishTitle.current.value,
        picture_url: "https://pierre-le-developpeur.com/assets/images/" + title,
        picture_id: title,
        link: link.current.value,
      };
      const likeSubmit = async () => {
        const likes = {
          title: skill.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        skill.likes_id = setLikesResult._id;
      };
      likeSubmit();

      const finalSubmit = async () => {
        await setTimeout(() => {
          const setSkillResult = dispatch(setSkillThunk(skill, token));
        }, 500);
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
      <input type="text" ref={frenchTitle}></input>
      <p>title in english :</p>
      <input type="text" ref={englishTitle}></input>
      <p>link to certificate (optional) :</p>
      <input type="text" ref={link} defaultValue={"none"}></input>
      <p>picture :</p>

      <p></p>

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
      <div>
        <button onClick={(evt) => saveSkill(evt)}>Save</button>
        <button onClick={(evt) => cancelSkill(evt)}>Cancel</button>
      </div>
    </div>
  );
}
export default PostSkills;
