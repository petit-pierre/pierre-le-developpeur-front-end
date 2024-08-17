import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjectPictureThunk,
  setSlideThunk,
} from "../../thunkActionsCreator";

function PostSliders() {
  const french_content = useRef();
  const english_content = useRef();
  const alt = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => state.data.token);
  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function saveSlide(evt) {
    evt.preventDefault();
    const slide = {
      alt: alt.current.value,
      french_content: french_content.current.value,
      english_content: english_content.current.value,
    };
    let photo = document.querySelector(".Picture");
    if (
      alt.current.value &&
      french_content.current.value &&
      english_content.current.value &&
      photo.files[0] !== ""
    ) {
      const formData = new FormData();
      formData.append("imageUrl", "");
      formData.append("image", photo.files[0]);

      const pictureSubmit = async () => {
        const setPictureResult = await dispatch(
          setProjectPictureThunk(formData, token)
        );
        slide.picture = setPictureResult.imageUrl;
        slide.picture_id = setPictureResult._id;

        const finalSubmit = async () => {
          await setTimeout(() => {
            const setToolResult = dispatch(setSlideThunk(slide, token));
          }, 500);
        };

        await finalSubmit();
      };

      pictureSubmit();
      navigate("/User");
    } else {
      alert("champs incomplets");
    }
  }

  function cancelSlide() {
    navigate("/User");
  }
  return (
    <div style={{ "margin-top": "20dvh" }}>
      <p>french content :</p>
      <textarea ref={french_content} />
      <p>english content :</p>
      <textarea ref={english_content} />
      <p>alt :</p>
      <textarea ref={alt} />

      <p>picture :</p>
      <input
        type="file"
        className="Picture"
        name="Picture"
        accept="image/png, image/jpeg,image/webp"
      ></input>
      <p></p>
      <div>
        <button onClick={(evt) => saveSlide(evt)}>Save</button>
        <button onClick={(evt) => cancelSlide(evt)}>Cancel</button>
      </div>
    </div>
  );
}
export default PostSliders;
