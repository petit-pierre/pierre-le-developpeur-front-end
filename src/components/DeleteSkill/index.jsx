import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DeleteSkill() {
  const skills = useSelector((state) => state.data.skills);
  //const translations = useSelector((state) => state.data.translations);
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
            Delete skill
          </button>
        </div>
      )}

      {edit === true ? (
        <div className="projects">
          {skills.map((skill) => (
            <div>
              <Link to={"Skills/" + skill._id} key={`${skill.id}`}>
                "Supprimez moi : {skill.french_title}
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
export default DeleteSkill;
