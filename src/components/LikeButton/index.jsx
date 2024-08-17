import io from "socket.io-client";
import "./like.css";
import { useSelector } from "react-redux";

function LikeButton({ propsLike }) {
  const likes = useSelector((state) => state.data.likes);

  const sendLike = (evt, propsLike) => {
    evt.preventDefault();
    const socket = io.connect("https://api.petitpierre.net");
    let message = propsLike.id;
    socket.emit("send_message", { message });
    getOldLikes(propsLike);
    let target = evt.currentTarget;
    target.classList.add("checked");
    setTimeout(() => {
      target.classList.remove("checked");
    }, 1200);
    document.querySelector(".maGanache").src =
      "https://pierre-le-developpeur.com/assets/thanks.png";
    setTimeout(() => {
      document.querySelector(".maGanache").src =
        "https://pierre-le-developpeur.com/assets/pierre.png";
    }, 1000);
  };

  async function getOldLikes(propsLike) {
    const get = await fetch("https://api.petitpierre.net/api/likes", {
      method: "GET",
    });
    const newlikes = await get.json();
    const found = newlikes.find((like) => like._id === propsLike.id);
    const newValue = found.likes + 1;
    const like = {
      likes: newValue,
    };

    async function putOldLikes(propsLike, like) {
      const put = await fetch(
        "https://api.petitpierre.net/api/likes/" + propsLike.id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(like),
        }
      );
    }
    putOldLikes(propsLike, like);
  }

  const found = likes.find((like) => like._id === propsLike.id);

  return (
    <div className="like">
      <div className={"like likeColor" + propsLike.color}>
        <p id={propsLike.id}>
          {" "}
          {Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(found.likes)}{" "}
        </p>
        <button
          name={propsLike.id}
          onClick={(evt) => sendLike(evt, propsLike)}
          className={
            propsLike.color === "withe"
              ? "buttonLike button withLike " + propsLike.id
              : "buttonLike button " + propsLike.id
          }
          tabIndex={-1}
        >
          <div className="pocContain">
            <div className="poc poc1">.</div>
            <div className="poc poc2">.</div>
            <div className="poc poc3">.</div>
            <div className="poc poc4">.</div>
            <div className="poc poc5">.</div>
            <img
              src="https://pierre-le-developpeur.com/assets/logo like.png"
              alt="logo like"
              className="logoLike"
            ></img>
          </div>
        </button>
      </div>
    </div>
  );
}

export default LikeButton;
