import { useSelector } from "react-redux";
import "./loader.css";
import Contact from "../../components/Contact";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Loader() {
  /*on recupere les valeurs du store redux pour le header*/
  const projects = useSelector((state) => state.data.projects);
  //const language = useSelector((state) => state.data.language);
  const contact = useSelector((state) => state.data.translations);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);
  const likes = useSelector((state) => state.data.likes);

  const navigate = useNavigate();
  //const { ref } = useParams();
  //console.log(projects.length);
  /*on verifie que les valeurs sont bien dans le store, dans le cas contraire on fait un refresh*/
  let { ref } = useParams();
  //console.log(ref);
  useEffect(() => {
    if (
      projects.length > 0 &&
      contact !== null &&
      translations !== null &&
      discuss !== null &&
      likes !== null
    ) {
      document.querySelector(".fadeOut").classList.add("faded");
      setTimeout(() => {
        if (ref === "Sign-in") {
          navigate("/" + ref);
        } else if (ref === "Home") {
          navigate("/");
        } else {
          navigate("/Project/" + ref);
        }
      }, 1000);
    } else {
    }
  }, [projects, translations, contact, likes, discuss]);

  return (
    <div className="loader">
      <div className="fadeOut"></div>
      <div className="loading">
        <span>Loading </span>
        {contact !== null && <span>.</span>}
        {translations !== null && <span>.</span>}
        {likes !== null && <span>.</span>}
      </div>
      <div className="content__loader">
        <div className="loaderPlace">
          <div className="loader__1"></div>
          <div className="loader__2"></div>
          <div className="loader__3"></div>
          <div className="loader__4"></div>
          <div className="loader__5"></div>
          <div className="loader__6"></div>
          <div className="loader__7"></div>
          <div className="loader__8"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
