import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DeleteTool() {
  const tools = useSelector((state) => state.data.tools);
  const [edit, setEdit] = useState(false);
  function projectChange() {
    setEdit(!edit);
  }

  return (
    <div>
      {edit === true ? (
        <p></p>
      ) : (
        <div>
          <button className="edit-button" onClick={projectChange}>
            Delete tool
          </button>
        </div>
      )}

      {edit === true ? (
        <div className="projects">
          {tools.map((tool) => (
            <div>
              <Link to={"Tools/" + tool._id} key={`${tool._id}`}>
                "Supprimez moi : {tool.title}
              </Link>
              <p> </p>
            </div>
          ))}
          <button onClick={projectChange}>Cancel</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default DeleteTool;
