import { useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLikeThunk,
  setToolThunk,
  putToolThunk,
} from "../../thunkActionsCreator";
import PicsUpload from "../../components/PicsUpload";

function PostTools() {
  let currentTool = "newOne";
  let { ToolId } = useParams();
  const tools = useSelector((state) => state.data.tools);
  if (ToolId !== "newOne") {
    currentTool = tools.find((sk) => sk._id === ToolId);
  }
  const token = useSelector((state) => state.data.token);
  const dispatch = useDispatch();

  const Title = useRef();
  const link = useRef();
  const categories = [
    { name: "Design" },
    { name: "Front-end" },
    { name: "Back-end" },
  ];

  const navigate = useNavigate();

  const now = useRef(new Date());

  const [close, setClose] = useState(false);

  const titl = now.current + "";
  const titlee = titl
    .split(" ")
    .join("")
    .substring(0, 20)
    .split(":")
    .join("")
    .toLowerCase();
  const title = titlee + "tool.png";
  let password = localStorage.getItem("password");

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  let pic;
  if (currentTool === "newOne") {
    pic = "https://pierre-le-developpeur.com/assets/images/" + title;
  } else {
    pic = currentTool.picture_url;
  }

  function saveTool(evt) {
    evt.preventDefault();
    const Categories = document.querySelectorAll(".categorie");
    let selectedCategory = "";
    for (let cat of Categories) {
      if (cat.checked === true) {
        selectedCategory = cat.value;
      }
    }

    if (Title.current.value && selectedCategory !== "") {
      const tool = {
        title: Title.current.value,
        categorie: selectedCategory,
        picture_url: pic,
        picture_id: title,
        links: link.current.value,
      };
      const likeSubmit = async () => {
        const likes = {
          title: tool.title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        tool.likes_id = setLikesResult._id;
      };

      const finalSubmit = async () => {
        if (currentTool === "newOne") {
          likeSubmit(tool);
          await setTimeout(() => {
            const setToolResult = dispatch(setToolThunk(tool, token));
          }, 500);
        } else {
          await setTimeout(() => {
            const setToolResult = dispatch(putToolThunk(tool, token, ToolId));
          }, 500);
        }
      };
      //console.log(currentTool);
      finalSubmit();

      navigate("/User");
    } else {
      alert("champs incomplets");
    }
  }

  function cancelTool() {
    setClose(true);
    setTimeout(() => {
      navigate("/User");
    }, 1000);
  }
  return (
    <div style={{ "margin-top": "20dvh" }}>
      <p>title :</p>
      <input type="text" ref={Title} defaultValue={currentTool.title}></input>
      <p>categorie :</p>
      {categories.map((cat) => (
        <div>
          <input
            className="categorie"
            type="radio"
            name="categorie"
            value={cat.name}
            defaultChecked={currentTool.categorie === cat.name ? "true" : null}
          />
          <label htmlFor="React">{cat.name}</label>
        </div>
      ))}
      <p>link to certificate (optional) :</p>
      <input
        type="text"
        ref={link}
        defaultValue={
          currentTool === null ||
          currentTool === undefined ||
          currentTool === "newOne"
            ? "none"
            : currentTool.links
        }
      ></input>
      <p>picture :</p>

      <p></p>
      {currentTool === null ||
      currentTool === undefined ||
      currentTool === "newOne" ? (
        <div>
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
        </div>
      ) : (
        <img src={currentTool.picture_url} alt="logo"></img>
      )}
      <div>
        <button onClick={(evt) => saveTool(evt, currentTool)}>Save</button>
        <button onClick={(evt) => cancelTool(evt)}>Cancel</button>
      </div>
    </div>
  );
}
export default PostTools;
