import { useSelector } from "react-redux";
import LikeButton from "../LikeButton";
import Slider from "../Slider";
import "./cards.css";
import React from "react";
import { HashLink } from "react-router-hash-link";

function Cards({ project }) {
  const language = useSelector((state) => state.data.language);

  return (
    <div className="cardField">
      <HashLink to={"/Project/" + project.french_title + "#project"}>
        <div className="logoCards">
          {project.best === true && (
            <img
              src="https://pierre-le-developpeur.com/assets/star.png"
              className="topProj"
              alt="star icon"
              title={language === "FR" ? "top projet" : "top project"}
            ></img>
          )}
          {project.studie === true && (
            <img
              src="https://pierre-le-developpeur.com/assets/studies.png"
              className="studies"
              alt="studies icon"
              title={language === "FR" ? "projet d'étude" : "study project"}
            ></img>
          )}
        </div>
        <div>
          <div className="cardSlide">
            <Slider
              sliders={project.sliders}
              mini={true}
              likeId={project.slider_likes_id}
            ></Slider>
          </div>
          <div className="cardResum">
            {language === "FR" ? (
              <p className="texte"> {project.french_resum} </p>
            ) : (
              <p className="texte"> {project.english_resum} </p>
            )}
            {language === "FR" ? (
              <p className="more">en savoir plus ...</p>
            ) : (
              <p className="more">click to see more ...</p>
            )}

            <div className="likeCard">
              <LikeButton
                propsLike={{ id: project.content_likes_id, color: "black" }}
              ></LikeButton>
            </div>
          </div>
        </div>
      </HashLink>
    </div>
  );
}

export default Cards;
