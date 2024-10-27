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
            Modifie tool
          </button>
        </div>
      )}

      {edit === true ? (
        <div className="tools">
          {tools.map((tool) => (
            <div>
              <span>{tool.title} : </span>
              <button>
                <Link to={"Tools/" + tool._id} key={`${tool._id}`}>
                  "Supprimez moi :
                </Link>
              </button>
              <span> </span>
              <button>
                <Link
                  to={"../PostTools/" + tool._id}
                  key={`project${tool._id}`}
                >
                  Modifiez moi :
                </Link>
              </button>
              <br></br>
              <br></br>
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
