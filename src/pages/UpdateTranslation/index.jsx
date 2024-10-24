import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  deletePictureThunk,
  putTranslationThunk,
  setProjectPictureThunk,
} from "../../thunkActionsCreator";

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
  const english_author = useRef();
  const french_link = useRef();
  const english_link = useRef();

  const token = useSelector((state) => state.data.token);
  const reduxTranslation = useSelector((state) => state.data.translations);

  const translations = Object.assign(reduxTranslation);

  const navigate = useNavigate();

  function undo(evt) {
    evt.preventDefault();
    navigate("/User");
  }
  const dispatch = useDispatch();

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function saveInfo(evt) {
    evt.preventDefault();

    const Submit = async () => {
      const putTranslationResult = dispatch(
        putTranslationThunk(translation, token)
      );
    };

    let englishCv = document.querySelector(".englishCv");
    let frenchCv = document.querySelector(".frenchCv");

    const translation = {
      english: {
        placeholder_mail: english_placeholder_mail.current.value,
        skills: english_skills.current.value,
        contact: english_contact.current.value,
        button: english_button.current.value,
        error_mail: english_error_mail.current.value,
        error_content: english_error_content.current.value,
        succes: english_succes.current.value,
        recommendation: [
          {
            content: english_recommendation.current.value,
            author: english_author.current.value,
            link: english_link.current.value,
          },
        ],
        cv: translations.english.cv,
        cv_id: translations.english.cv_id,
      },
      french: {
        placeholder_mail: french_placeholder_mail.current.value,
        skills: french_skills.current.value,
        contact: french_contact.current.value,
        button: french_button.current.value,
        error_mail: french_error_mail.current.value,
        error_content: french_error_content.current.value,
        succes: french_succes.current.value,
        recommendation: [
          {
            content: french_recommendation.current.value,
            author: french_author.current.value,
            link: french_link.current.value,
          },
        ],
        cv: translations.french.cv,
        cv_id: translations.french.cv_id,
      },
    };

    const englishCvSubmit = async () => {
      const formData = new FormData();
      formData.append("imageUrl", "");
      formData.append("image", englishCv.files[0]);
      const setProjectPictureResult = await dispatch(
        setProjectPictureThunk(formData, token)
      );
      translation.english.cv = await setProjectPictureResult.imageUrl;
      translation.english.cv_id = await setProjectPictureResult._id;
      await Submit();
    };

    const frenchCvSubmit = async () => {
      const formData = new FormData();
      formData.append("imageUrl", "");
      formData.append("image", frenchCv.files[0]);
      const setProjectPictureResult = await dispatch(
        setProjectPictureThunk(formData, token)
      );
      translation.french.cv = await setProjectPictureResult.imageUrl;
      translation.french.cv_id = await setProjectPictureResult._id;
      await Submit();
    };
    if (frenchCv.files[0] != null) {
      const deletePicture = async () => {
        const id = translations.french.cv_id;
        const deletePictureResult = await dispatch(
          deletePictureThunk(id, token)
        );
      };
      frenchCvSubmit();
      deletePicture();
    } else {
      Submit();
    }
    if (englishCv.files[0] != null) {
      const deletePicture = async () => {
        const id = translations.english.cv_id;
        const deletePictureResult = await dispatch(
          deletePictureThunk(id, token)
        );
      };
      englishCvSubmit();
      deletePicture();
    } else {
      Submit();
    }

    navigate("/User");
  }

  return (
    <main style={{ "margin-top": "20dvh" }}>
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
        <fieldset>
          <p>CV in french :</p>
          <embed
            src={translations.french.cv}
            width="30%"
            height="550"
            type="application/pdf"
          />
          <input
            type="file"
            accept="application/pdf"
            className="frenchCv"
          ></input>

          <p>CV in english :</p>
          <embed
            src={translations.english.cv}
            width="30%"
            height="550"
            type="application/pdf"
          />
          <input
            type="file"
            accept="application/pdf"
            className="englishCv"
          ></input>
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
        <fieldset>
          <p>Recommendation in french :</p>
          <textarea
            type="text"
            defaultValue={translations.french.recommendation[0].content}
            ref={french_recommendation}
          ></textarea>
          <p>Author :</p>
          <textarea
            type="text"
            defaultValue={translations.french.recommendation[0].author}
            ref={french_author}
          ></textarea>
          <p>Link :</p>
          <textarea
            type="text"
            defaultValue={translations.french.recommendation[0].link}
            ref={french_link}
          ></textarea>
          <p>Recommendation in english :</p>
          <textarea
            type="text"
            defaultValue={translations.english.recommendation[0].content}
            ref={english_recommendation}
          ></textarea>
          <p>Author :</p>
          <textarea
            type="text"
            defaultValue={translations.english.recommendation[0].author}
            ref={english_author}
          ></textarea>
          <p>Link :</p>
          <textarea
            type="text"
            defaultValue={translations.english.recommendation[0].link}
            ref={english_link}
          ></textarea>
        </fieldset>
        <p></p>
        <button onClick={(evt) => undo(evt)}>Cancel</button>
        <button onClick={(evt) => saveInfo(evt)}>Save</button>
      </div>
    </main>
  );
}

export default UpdateInfo;
