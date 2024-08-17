import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLikesThunk,
  deletePictureThunk,
  deleteProjectThunk,
} from "../../thunkActionsCreator";

function DeleteProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const projectId = id;
  const projects = useSelector((state) => state.data.projects);
  const project = projects.find((projects) => projects._id === projectId);
  const token = useSelector((state) => state.data.token);

  const translationId = project.translation;

  if (token === null) {
    return <Navigate to="/404/" replace={true} />;
  }

  function goBack() {
    navigate("/User");
  }

  function deleteProject() {
    /*for (let i = 0; i < project.links.length; i++) {
      const id = project.links[i].picture_id;
      const deletePicture = async () => {
        const deletePictureResult = await dispatch(
          deletePictureThunk(id, token)
        );
      };
      deletePicture();
    }*/
    const deleteLike = async () => {
      const likeId = project.likes_id;
      const deleteLikeResult = await dispatch(deleteLikesThunk(likeId, token));
    };
    deleteLike();
    const deleteSliderLike = async () => {
      const likeId = project.slider_likes_id;
      const deleteLikeResult = await dispatch(deleteLikesThunk(likeId, token));
    };
    deleteSliderLike();
    const deleteContentLike = async () => {
      const likeId = project.content_likes_id;
      const deleteLikeResult = await dispatch(deleteLikesThunk(likeId, token));
    };
    deleteContentLike();

    for (let i = 0; i < project.sliders.length; i++) {
      const id = project.sliders[i].picture_id;
      const deletePicture = async () => {
        const deletePictureResult = await dispatch(
          deletePictureThunk(id, token)
        );
      };
      deletePicture();
    }

    const projectId = project._id;
    const deleteProject = async () => {
      const deleteProjectResult = await dispatch(
        deleteProjectThunk(projectId, token)
      );
    };
    deleteProject();

    navigate("/User");
  }
  return (
    <div>
      <h1>Oh non !!!!!!</h1>
      <p>Confirmez vous la suppression de ce projet : {project.title} ?</p>
      <button onClick={deleteProject}>OUI</button>
      <button onClick={goBack}>NON</button>
    </div>
  );
}

export default DeleteProject;
