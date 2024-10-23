//import "./cards.css";
import React from "react";

function PicsUpload({ props }) {
  let title = Date.now() + props.name;
  console.log(title);

  let password = localStorage.getItem("password");
  return (
    <div className="picsUpload">
      <iframe
        src={
          "https://pierre-le-developpeur.com/picture.html?type=" +
          props.type +
          "&title=" +
          title +
          "&password=" +
          password
        }
        width="fit-content"
        height="300"
        frameBorder="0"
        title="Upload"
        className="iframe"
      ></iframe>
    </div>
  );
}

export default PicsUpload;
