import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./user.css";
import DeleteProject from "../../components/DeleteProject";
import DeleteSkill from "../../components/DeleteSkill";
import DeleteTool from "../../components/DeleteTool";
import DeleteSlide from "../../components/DeleteSlide";

function User() {
  const token = useSelector((state) => state.data.token);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  return (
    <main className="mainDashboard">
      <h1 className="dashboard">Dashboard</h1>

      <fieldset>
        <h3>Projects</h3>
        <button>
          <Link to="/PostProject/newOne">Post new project</Link>
        </button>
        <DeleteProject />
      </fieldset>
      <fieldset>
        <Link to="/PostSkills">Post new skill</Link>
      </fieldset>
      <fieldset>
        <DeleteSkill />
      </fieldset>
      <fieldset>
        <Link to="/PostTools">Post new tool</Link>
      </fieldset>
      <fieldset>
        <DeleteTool />
      </fieldset>
      <fieldset>
        <Link to="/UpdateInfo">Update info</Link>
      </fieldset>
      <fieldset>
        <Link to="/PostSliders">Post new slide</Link>
      </fieldset>
      <fieldset>
        <DeleteSlide />
      </fieldset>
    </main>
  );
}

export default User;
