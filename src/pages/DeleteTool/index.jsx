import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLikesThunk,
  deletePictureThunk,
  deleteToolThunk,
} from "../../thunkActionsCreator";

function DeleteTool() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { toolId } = useParams();

  console.log(toolId);
  const tools = useSelector((state) => state.data.tools);
  const tool = tools.find((tool) => tool._id === toolId);
  const token = useSelector((state) => state.data.token);

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function goBack() {
    navigate("/User");
  }

  function deleteTool() {
    const id = tool.picture_id;
    const deletePicture = async () => {
      const deletePictureResult = await dispatch(deletePictureThunk(id, token));
    };
    deletePicture();
    const deleteLike = async () => {
      const likeId = tool.likes_id;
      const deleteLikeResult = await dispatch(deleteLikesThunk(likeId, token));
    };
    deleteLike();

    const toolId = tool._id;
    const deleteTool = async () => {
      const deleteToolResult = await dispatch(deleteToolThunk(toolId, token));
    };
    deleteTool();

    navigate("/User");
  }
  return (
    <div style={{ "margin-top": "20dvh", textAlign: "center" }}>
      <h1>Oh non !!!!!!</h1>
      <p>Confirmez vous la suppression de ce tool : {tool.title} ?</p>
      <button onClick={deleteTool}>OUI</button>
      <button onClick={goBack}>NON</button>
    </div>
  );
}

export default DeleteTool;
