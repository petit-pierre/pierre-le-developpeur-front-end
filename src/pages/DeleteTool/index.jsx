import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLikesThunk, deleteToolThunk } from "../../thunkActionsCreator";
import { useState } from "react";

function DeleteTool() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { toolId } = useParams();
  const tools = useSelector((state) => state.data.tools);
  const tool = tools.find((tool) => tool._id === toolId);
  const token = useSelector((state) => state.data.token);
  const [close, setClose] = useState(false);

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }
  let password = localStorage.getItem("password");

  function goBack() {
    navigate("/User");
  }

  function deleteTool() {
    setClose(true);

    const deleteLike = async () => {
      const likeId = tool.likes_id;
      const deleteLikeResult = await dispatch(deleteLikesThunk(likeId, token));
    };
    deleteLike();

    const toolId = tool._id;
    const deleteTool = async () => {
      const deleteToolResult = await dispatch(deleteToolThunk(toolId, token));
    };

    setTimeout(() => {
      deleteTool();
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
            tool.picture_url.substring(48) +
            "&password=" +
            password
          }
          title="delete picture"
        ></iframe>
      ) : (
        <div>
          <h1>Oh non !!!!!!</h1>
          <p>Confirmez vous la suppression de ce tool : {tool.title} ?</p>
          <button onClick={deleteTool}>OUI</button>
          <button onClick={goBack}>NON</button>
        </div>
      )}
    </div>
  );
}

export default DeleteTool;
