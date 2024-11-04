import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { putTranslationThunk } from "../../thunkActionsCreator";
import "./updateTranslation.css";

function UpdateInfo() {
  const french_placeholder_mail = useRef();
  const english_placeholder_mail = useRef();
  const french_skills = useRef();
  const english_skills = useRef();
  const french_contact = useRef();
  const english_contact = useRef();
  const french_button = useRef();
  const english_button = useRef();
  const french_error_mail = useRef();
  const english_error_mail = useRef();
  const french_error_content = useRef();
  const english_error_content = useRef();
  const french_succes = useRef();
  const english_succes = useRef();
  const french_recommendation = useRef();
  const english_recommendation = useRef();
  const french_author = useRef();
  const french_link = useRef();

  const token = useSelector((state) => state.data.token);
  const reduxTranslation = useSelector((state) => state.data.translations);

  const translations = Object.assign(reduxTranslation);

  const navigate = useNavigate();

  const [reco, setReco] = useState([]);
  const [truc, setTruc] = useState(0);

  useEffect(() => {
    setReco(reco.concat(reduxTranslation.recommendation));
  }, []);

  const title = "cv_aubree_pierre_fr.pdf";
  const titleEng = "cv_aubree_pierre_eng.pdf";
  const password = localStorage.getItem("password");

  function undo(evt) {
    evt.preventDefault();
    navigate("/User");
  }
  const dispatch = useDispatch();

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  //let reco = reduxTranslation.recommendation;

  function addReco(evt) {
    evt.preventDefault();
    let rec = {
      contentfr: french_recommendation.current.value,
      contenteng: english_recommendation.current.value,
      author: french_author.current.value,
      link: french_link.current.value,
    };
    reco.push(rec);
    setReco(reco);
    set(evt);
  }

  function deleteReco(evt, thisReco) {
    evt.preventDefault();
    const found = reco.find((sli) => sli === thisReco);
    const index = reco.findIndex((slideIndex) => slideIndex === found);
    reco.splice(index, 1);
    setReco(reco);
    set(evt);
  }

  function set(evt) {
    evt.preventDefault();
    setTruc(truc + 1);
  }

  function saveInfo(evt) {
    evt.preventDefault();

    const Submit = async () => {
      const putTranslationResult = dispatch(
        putTranslationThunk(translation, token)
      );
    };

    const translation = {
      english: {
        placeholder_mail: english_placeholder_mail.current.value,
        skills: english_skills.current.value,
        contact: english_contact.current.value,
        button: english_button.current.value,
        error_mail: english_error_mail.current.value,
        error_content: english_error_content.current.value,
        succes: english_succes.current.value,
        cv: "https://www.pierre-le-developpeur.com/assets/images/cv_aubree_pierre_eng.pdf",
      },
      french: {
        placeholder_mail: french_placeholder_mail.current.value,
        skills: french_skills.current.value,
        contact: french_contact.current.value,
        button: french_button.current.value,
        error_mail: french_error_mail.current.value,
        error_content: french_error_content.current.value,
        succes: french_succes.current.value,
        cv: "https://www.pierre-le-developpeur.com/assets/images/cv_aubree_pierre_fr.pdf",
      },
      recommendation: reco,
    };

    Submit();

    navigate("/User");
  }

  return (
    <main className="putContent">
      <div>
        <h1>Info</h1>
        <fieldset>
          <p>Skills in french :</p>
          <textarea
            type="text"
            defaultValue={translations.french.skills}
            ref={french_skills}
          ></textarea>
          <p>Skills in english :</p>
          <textarea
            type="text"
            defaultValue={translations.english.skills}
            ref={english_skills}
          ></textarea>
        </fieldset>
        <fieldset className="cv">
          <div>
            <p>CV in french :</p>
            <iframe
              src={
                "https://pierre-le-developpeur.com/displaypic.html?type=application/pdf&title=" +
                title +
                "&picture=https://pierre-le-developpeur.com/assets/images/" +
                title +
                "&password=" +
                password
              }
              width="600px"
              height="700px"
              frameBorder="0"
              title="Upload"
              className="iframe"
            ></iframe>
          </div>
          <div>
            <p>CV in english :</p>
            <iframe
              src={
                "https://pierre-le-developpeur.com/displaypic.html?type=application/pdf&title=" +
                titleEng +
                "&picture=https://pierre-le-developpeur.com/assets/images/" +
                titleEng +
                "&password=" +
                password
              }
              width="600px"
              height="700px"
              frameBorder="0"
              title="Upload"
              className="iframe"
            ></iframe>
          </div>
        </fieldset>
        <fieldset>
          <p>Contact in french :</p>
          <textarea
            type="text"
            defaultValue={translations.french.contact}
            ref={french_contact}
          ></textarea>
          <p>Contact in english :</p>
          <textarea
            type="text"
            defaultValue={translations.english.contact}
            ref={english_contact}
          ></textarea>
          <p>Placeholder for mail in french :</p>
          <textarea
            ref={french_placeholder_mail}
            defaultValue={translations.french.placeholder_mail}
          ></textarea>
          <p>Placeholder for mail in english :</p>
          <textarea
            ref={english_placeholder_mail}
            defaultValue={translations.english.placeholder_mail}
            type="text"
          ></textarea>

          <p>Button in french :</p>
          <textarea
            type="text"
            defaultValue={translations.french.button}
            ref={french_button}
          ></textarea>
          <p>Button in english :</p>
          <textarea
            type="text"
            defaultValue={translations.english.button}
            ref={english_button}
          ></textarea>
          <p>Mail error in french :</p>
          <textarea
            type="text"
            defaultValue={translations.french.error_mail}
            ref={french_error_mail}
          ></textarea>
          <p>Mail error in english :</p>
          <textarea
            type="text"
            defaultValue={translations.english.error_mail}
            ref={english_error_mail}
          ></textarea>
          <p>Content error in french :</p>
          <textarea
            type="text"
            defaultValue={translations.french.error_content}
            ref={french_error_content}
          ></textarea>
          <p>Content error in english :</p>
          <textarea
            type="text"
            defaultValue={translations.english.error_content}
            ref={english_error_content}
          ></textarea>
          <p>Succes in french :</p>
          <textarea
            type="text"
            defaultValue={translations.french.succes}
            ref={french_succes}
          ></textarea>
          <p>Succes in english :</p>
          <textarea
            type="text"
            defaultValue={translations.english.succes}
            ref={english_succes}
          ></textarea>
        </fieldset>
        <fieldset className="recoPlace">
          {reco.map((thisReco) => (
            <fieldset className="reco">
              <p>Recommendation in french :</p>
              <p>{thisReco.contentfr}</p>
              <p>Recommendation in english :</p>
              <p>{thisReco.contenteng}</p>
              <p>Author :</p>
              <p>{thisReco.author}</p>
              <p>Link :</p>
              <p>{thisReco.link}</p>
              <br></br>
              <button onClick={(evt) => deleteReco(evt, thisReco)}>
                Delete
              </button>
            </fieldset>
          ))}
          <fieldset className="reco">
            <p>Recommendation in french :</p>
            <textarea type="text" ref={french_recommendation}></textarea>
            <p>Recommendation in english :</p>
            <textarea type="text" ref={english_recommendation}></textarea>
            <p>Author :</p>
            <textarea type="text" ref={french_author}></textarea>
            <p>Link :</p>
            <textarea type="text" ref={french_link}></textarea>
            <br></br>
            <button onClick={(evt) => addReco(evt)}>Add</button>
          </fieldset>
        </fieldset>
        <p></p>
        <button onClick={(evt) => undo(evt)}>Cancel</button>
        <button onClick={(evt) => saveInfo(evt)}>Save</button>
      </div>
    </main>
  );
}

export default UpdateInfo;
