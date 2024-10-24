import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLikeThunk, setToolThunk } from "../../thunkActionsCreator";
import PicsUpload from "../../components/PicsUpload";

function PostTools() {
  const Title = useRef();
  const categories = [
    { name: "Design" },
    { name: "Front-end" },
    { name: "Back-end" },
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const now = useRef(new Date());
  const link = useRef();

  const [close, setClose] = useState(false);

  const token = useSelector((state) => state.data.token);

  const titl = now.current + "";
  const titlee = titl
    .split(" ")
    .join("")
    .substring(6, 20)
    .split(":")
    .join("")
    .toLowerCase();
  const title = titlee + "tool.png";
  let password = localStorage.getItem("password");

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
      picture_url: "https://pierre-le-developpeur.com/assets/images/" + title,
      picture_id: title,
      link: link.current.value,
    };

    if (Title.current.value && selectedCategory !== "") {
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

      finalSubmit();

      navigate("/User");
    } else {
      alert("champs incomplets");
    }
  }

  function cancelSkill() {
    setClose(true);
    setTimeout(() => {
      navigate("/User");
    }, 1000);
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
      <p>link to certificate (optional) :</p>
      <input type="text" ref={link} defaultValue={"none"}></input>
      <p>picture :</p>

      <p></p>
      <PicsUpload props={{ name: title, type: "image/png" }}></PicsUpload>
      {close === true ? (
        <iframe
          style={{ display: "none" }}
          width={0}
          height={0}
          frameBorder="0"
          src={
            "https://pierre-le-developpeur.com/justdelete.php?type=image/png&title=" +
            title +
            "&password=" +
            password
          }
          title="delete picture"
        ></iframe>
      ) : (
        ""
      )}
      <div>
        <button onClick={(evt) => saveSkill(evt)}>Save</button>
        <button onClick={(evt) => cancelSkill(evt)}>Cancel</button>
      </div>
    </div>
  );
}
export default PostTools;
