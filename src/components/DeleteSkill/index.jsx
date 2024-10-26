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
            Modifie skill
          </button>
        </div>
      )}

      {edit === true ? (
        <div className="projects">
          {skills.map((skill) => (
            <div>
              <span>{skill.french_title} : </span>
              <button>
                <Link to={"Skills/" + skill._id} key={`${skill.id}`}>
                  Supprimez moi :
                </Link>
              </button>
              <span> </span>
              <button>
                <Link
                  to={"../PostSkills/" + skill._id}
                  key={`project${skill.id}`}
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
export default DeleteSkill;
