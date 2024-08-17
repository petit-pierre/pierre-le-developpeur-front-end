import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DeleteProject() {
  const projects = useSelector((state) => state.data.projects);
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
            Modifie project
          </button>
        </div>
      )}

      {edit === true ? (
        <div className="projects">
          {projects.map((project) => (
            <div key={`projectId${project._id}`}>
              <p>{project.french_title}</p>
              <button>
                <Link to={"Project/" + project._id} key={`${project.id}`}>
                  "Supprimez moi :
                </Link>
              </button>
              <button>
                <Link
                  to={"../PostProject/" + project._id}
                  key={`project${project.id}`}
                >
                  "Modifiez moi :
                </Link>
              </button>
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
export default DeleteProject;
