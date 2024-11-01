import { useSelector } from "react-redux";
import LikeButton from "../LikeButton";
import Slider from "../Slider";
import "./cards.css";
import React from "react";
import { HashLink } from "react-router-hash-link";

function Cards({ project }) {
  const language = useSelector((state) => state.data.language);

  /*on creer un tableau pour tier les slides*/

  let sSlider = [];
  let sliders = project.sliders;
  for (let slide of sliders) {
    if (slide.alt !== "Video" && slide.alt !== "TextPicture") {
      sSlider.push(slide);
    }
  }

  return (
    <div className="cardField">
      <HashLink to={"/Project/" + project.french_title + "#project"}>
        <div>
          <div className="like miniLike likeSlide">
            <LikeButton
              propsLike={{
                id: project.slider_likes_id,
                color: "withe",
              }}
            ></LikeButton>
          </div>
          <div className="cardSlide">
            <Slider
              sliders={sSlider}
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
