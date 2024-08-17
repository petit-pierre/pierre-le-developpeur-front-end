import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  setLikeThunk,
  setProjectPictureThunk,
  setToolThunk,
} from "../../thunkActionsCreator";

function PostTools() {
  const Title = useRef();
  const categories = [
    { name: "Design" },
    { name: "Front-end" },
    { name: "Back-end" },
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => state.data.token);
  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function saveSkill(evt) {
    evt.preventDefault();
    const Categories = document.querySelectorAll(".categorie");
    let selectedCategory = "";
    for (let cat of Categories) {
      if (cat.checked === true) {
        selectedCategory = cat.value;
      }
    }
    const tool = {
      title: Title.current.value,
      categorie: selectedCategory,
    };
    let photo = document.querySelector(".Picture");
    if (Title.current.value && selectedCategory && photo.files[0] !== "") {
      const formData = new FormData();
      formData.append("imageUrl", "");
      formData.append("image", photo.files[0]);

      const pictureSubmit = async () => {
        const setPictureResult = await dispatch(
          setProjectPictureThunk(formData, token)
        );
        tool.picture_url = setPictureResult.imageUrl;
        tool.picture_id = setPictureResult._id;

        const likeSubmit = async () => {
          const likes = {
            title: tool.title,
            likes: 0,
          };
          const setLikesResult = await dispatch(setLikeThunk(likes, token));
          tool.likes_id = setLikesResult._id;
        };
        likeSubmit();

        const finalSubmit = async () => {
          await setTimeout(() => {
            const setToolResult = dispatch(setToolThunk(tool, token));
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

  function cancelSkill() {
    navigate("/User");
  }
  return (
    <div style={{ "margin-top": "20dvh" }}>
      <p>title :</p>
      <input type="text" ref={Title}></input>
      <p>categorie :</p>
      {categories.map((cat) => (
        <div>
          <input
            className="categorie"
            type="radio"
            name="categorie"
            value={cat.name}
          />
          <label htmlFor="React">{cat.name}</label>
        </div>
      ))}
      <p>picture :</p>
      <input
        type="file"
        className="Picture"
        name="Picture"
        accept="image/png"
      ></input>
      <p></p>
      <div>
        <button onClick={(evt) => saveSkill(evt)}>Save</button>
        <button onClick={(evt) => cancelSkill(evt)}>Cancel</button>
      </div>
    </div>
  );
}
export default PostTools;
