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
  useEffect(() => {
    if (
      projects.length > 0 &&
      translations !== null &&
      contact !== null &&
      discuss !== null &&
      likes !== null
    ) {
      navigate("/");
    } else {
    }
  }, [projects, translations, contact, likes, discuss]);

  return <div className="loader">Loading ...</div>;
}

export default Loader;
