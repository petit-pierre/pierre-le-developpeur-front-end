import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLikesThunk,
  deletePictureThunk,
  deleteProjectThunk,
} from "../../thunkActionsCreator";
import { useState } from "react";

function DeleteProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [close, setClose] = useState(false);
  const projectId = id;
  const projects = useSelector((state) => state.data.projects);
  const project = projects.find((projects) => projects._id === projectId);
  const token = useSelector((state) => state.data.token);
  let password = localStorage.getItem("password");
  //const translationId = project.translation;

  if (token === null) {
    return <Navigate to="/404/" replace={true} />;
  }

  function goBack() {
    navigate("/User");
  }
  let picsToDellette = [];
  for (let slid of project.sliders) {
    if (
      slid.picture.includes("https://pierre-le-developpeur.com/assets/images/")
    ) {
      picsToDellette.push(slid);
    }
  }
  function deleteProject() {
    setClose(true);

    setTimeout(() => {
      const deleteLike = async () => {
        const likeId = project.likes_id;
        const deleteLikeResult = await dispatch(
          deleteLikesThunk(likeId, token)
        );
      };
      deleteLike();
      const deleteSliderLike = async () => {
        const likeId = project.slider_likes_id;
        const deleteLikeResult = await dispatch(
          deleteLikesThunk(likeId, token)
        );
      };
      deleteSliderLike();
      const deleteContentLike = async () => {
        const likeId = project.content_likes_id;
        const deleteLikeResult = await dispatch(
          deleteLikesThunk(likeId, token)
        );
      };
      deleteContentLike();

      const projectId = project._id;
      const deleteProject = async () => {
        const deleteProjectResult = await dispatch(
          deleteProjectThunk(projectId, token)
        );
      };
      deleteProject();
      navigate("/User");
    }, 1000);
  }
  return (
    <div>
      <h1>Oh non !!!!!!</h1>
      <p>Confirmez vous la suppression de ce projet : {project.title} ?</p>
      <button onClick={deleteProject}>OUI</button>
      <button onClick={goBack}>NON</button>
      {picsToDellette.map((pic) =>
        close === true ? (
          <iframe
            style={{ display: "none" }}
            width={0}
            height={0}
            frameBorder="0"
            src={
              "https://pierre-le-developpeur.com/justdelete.php?type=image/png&title=" +
              pic.picture.substring(48) +
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

export default DeleteProject;
