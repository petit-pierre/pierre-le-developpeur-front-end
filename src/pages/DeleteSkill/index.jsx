import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLikesThunk,
  deletePictureThunk,
  deleteSkillThunk,
} from "../../thunkActionsCreator";
import { useState } from "react";

function DeleteSkill() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { skillId } = useParams();

  const skills = useSelector((state) => state.data.skills);
  const skill = skills.find((skill) => skill._id === skillId);
  const token = useSelector((state) => state.data.token);

  //const translationId = project.translation;

  const [close, setClose] = useState(false);

  //const title = skill.picture_url.substring(48);
  let password = localStorage.getItem("password");

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function goBack() {
    navigate("/User");
  }

  function deleteSkill() {
    setClose(true);
    const deleteLike = async () => {
      const likeId = skill.likes_id;
      const deleteLikeResult = await dispatch(deleteLikesThunk(likeId, token));
    };
    deleteLike();

    const skillId = skill._id;
    const deleteSkill = async () => {
      const deleteSkillResult = await dispatch(
        deleteSkillThunk(skillId, token)
      );
    };
    setTimeout(() => {
      deleteSkill();
      navigate("/User");
    }, 1000);
  }
  return (
    <div style={{ "margin-top": "20dvh", textAlign: "center" }}>
      {close === true ? (
        <iframe
          style={{ display: "none" }}
          width={0}
          height={0}
          frameBorder="0"
          src={
            "https://pierre-le-developpeur.com/justdelete.php?type=image/png&title=" +
            skill.picture_url.substring(48) +
            "&password=" +
            password
          }
          title="delete picture"
        ></iframe>
      ) : (
        <div>
          <h1>Oh non !!!!!!</h1>
          <p>
            Confirmez vous la suppression de ce skill : {skill.french_title} ?
          </p>
          <button onClick={deleteSkill}>OUI</button>
          <button onClick={goBack}>NON</button>
        </div>
      )}
    </div>
  );
}

export default DeleteSkill;
