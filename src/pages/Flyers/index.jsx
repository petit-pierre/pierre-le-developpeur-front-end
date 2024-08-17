import { useSelector } from "react-redux";
import "./Flyers.css";
import Contact from "../../components/Contact";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Masonry from "react-masonry-css";

function Flyers() {
  /*on recupere les valeurs du store redux pour le header*/

  const language = useSelector((state) => state.data.language);
  const contact = useSelector((state) => state.data.translations);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);
  const likes = useSelector((state) => state.data.likes);

  const navigate = useNavigate();

  /*les donnees (images des flyers) sont (pour l'heure) fixe donc on les declare en dur ci-dessous*/

  const images = [
    "https://pierre-le-developpeur.com/assets/flyers/fly00.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly01.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly02.gif",
    "https://pierre-le-developpeur.com/assets/flyers/fly03.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly04.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly05.gif",
    "https://pierre-le-developpeur.com/assets/flyers/fly06.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly07.gif",
    "https://pierre-le-developpeur.com/assets/flyers/fly09.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly10.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly11.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly12.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly13.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly14.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly15.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly16.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly17.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly18.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly19.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly20.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly21.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly22.jpg",
    "https://pierre-le-developpeur.com/assets/flyers/fly23.jpg",
  ];

  /* on declare le flyer a afficher dans la modale au clique sur une image*/

  const [fly, setFly] = useState(
    "https://pierre-le-developpeur.com/assets/flyers/fly01.jpg"
  );

  /* nombre de collones selon la resolution pour masonery*/

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  /*on verifie que les valeurs sont bien dans le store, dans le cas contraire on fait un refresh*/

  if (
    language !== null &&
    contact !== null &&
    discuss !== null &&
    translations !== null &&
    likes !== null
  ) {
    function startModal(image, evt) {
      evt.preventDefault();
      setFly(image);
      document.querySelector(".modalContainer").classList.remove("hiddenModal");
    }
    function closeModal(evt) {
      evt.preventDefault();
      document.querySelector(".modalContainer").classList.add("hiddenModal");
    }
    return (
      <div className="flyers">
        <div className="modalContainer hiddenModal">
          <div className="flyModal">
            <img
              src="https://pierre-le-developpeur.com/assets/cross.png"
              alt="logo close"
              className="cross"
              onClick={(evt) => closeModal(evt)}
            ></img>{" "}
            <div className="flyContainer">
              <img src={fly} alt="full screen flyer" className="fullPic"></img>
            </div>
          </div>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image, i) => (
            <img
              key={"fly" + i}
              src={image}
              className="flyer"
              alt="flyer"
              onClick={(evt) => startModal(image, evt)}
            />
          ))}
        </Masonry>

        <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/Flyers");
    }, 500);
  }
}

export default Flyers;
