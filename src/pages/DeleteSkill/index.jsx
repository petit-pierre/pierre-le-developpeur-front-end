import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLikesThunk,
  deletePictureThunk,
  deleteSkillThunk,
} from "../../thunkActionsCreator";

function DeleteSkill() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { skillId } = useParams();

  const skills = useSelector((state) => state.data.skills);
  const skill = skills.find((skill) => skill._id === skillId);
  const token = useSelector((state) => state.data.token);

  //const translationId = project.translation;

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function goBack() {
    navigate("/User");
  }

  function deleteSkill() {
    const id = skill.picture_id;
    const deletePicture = async () => {
      const deletePictureResult = await dispatch(deletePictureThunk(id, token));
    };
    deletePicture();

    const deleteLike = async () => {
      const likeId = skill.likes_id;
      const deleteLikeResult = await dispatch(deleteLikesThunk(likeId, token));
    };
    deleteLike();

    /*const deleteTranslation = async () => {
      const deleteProjectTranslationResult = await dispatch(
        deleteProjectTranslationThunk(translationId, token)
      );
    };
    deleteTranslation();*/
    const skillId = skill._id;
    const deleteSkill = async () => {
      const deleteSkillResult = await dispatch(
        deleteSkillThunk(skillId, token)
      );
    };
    deleteSkill();

    navigate("/User");
  }
  return (
    <div style={{ "margin-top": "20dvh", textAlign: "center" }}>
      <h1>Oh non !!!!!!</h1>
      <p>Confirmez vous la suppression de ce skill : {skill.french_title} ?</p>
      <button onClick={deleteSkill}>OUI</button>
      <button onClick={goBack}>NON</button>
    </div>
  );
}

export default DeleteSkill;
