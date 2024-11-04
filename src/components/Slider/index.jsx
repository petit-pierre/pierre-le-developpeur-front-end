import { useEffect, useRef, useState } from "react";
import "./slider.css";
import LikeButton from "../LikeButton";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";

function Slider({ sliders, mini, likeId }) {
  const language = useSelector((state) => state.data.language);
  //const [, updateState] = useState();
  //const forceUpdate = useCallback(() => updateState({}), []);
  //au cas ou il n'y ai que deux items dans le slider
  //(pour que le slider puisse tourner de maniere fluide dans les 2 sens)

  let sortedSlider = structuredClone(sliders);
  if (sortedSlider.length === 2) {
    let sortedSliderClone = structuredClone(sortedSlider);
    sortedSlider = sortedSlider.concat(sortedSliderClone);
  }
  let sortedSliderClone = structuredClone(sortedSlider);
  for (let i = 0; i < sortedSliderClone.length; i++) {
    sortedSliderClone[i].index = i;
  }
  sortedSlider = sortedSliderClone;

  // declaration des variables

  const [stselected, setSelected] = useState(0);
  const [stprevious, setPrevious] = useState(sortedSlider.length - 1);
  const [stnext, setNext] = useState(1);
  let selected = stselected;
  let previous = stprevious;
  let next = stnext;

  //let nextway = true;
  //const [truc, setTruc] = useState(0);

  let cooldown = false;
  //const [count, setCount] = useState(0);
  /*useEffect(() => {
    setTruc(truc + 1);
  }, [selected]);*/

  function forceUpdate() {
    //setTruc(truc + 1);
    //console.log(selected.current.value);
  }

  //swipe tactile//

  /*let touchstartX = 0;
  let touchendX = 0;

  if (mini === false) {
    function checkDirection() {
      if (touchendX < touchstartX)
        document.querySelector(".arrowRight").click();
      if (touchendX > touchstartX) document.querySelector(".arrowLeft").click();
    }
    setTimeout(() => {
      document
        .querySelector(".sliderField")
        .addEventListener("touchstart", (e) => {
          touchstartX = e.changedTouches[0].screenX;
        });

      document
        .querySelector(".sliderField")
        .addEventListener("touchend", (e) => {
          touchendX = e.changedTouches[0].screenX;
          checkDirection();
        });
    }, 500);
  }*/

  // fonction useintervall adapté pour react

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // clique automatique sur next picture toute les 6 secondes

  useInterval(() => {
    if (mini === true && sortedSlider.length > 1) {
      nextPicture();
    }
  }, 6000);

  const handlers = useSwipeable({
    onSwipedLeft: () => (mini !== true ? nextPicture() : ""),
    onSwipedRight: () => (mini !== true ? previousPicture() : ""),
    //onSwipedDown: () => console.log("coucou"),
    swipeDuration: Infinity,
    preventScrollOnSwipe: true,
    //trackMouse: true,
    //onSwiped: (eventData) => console.log("User Swiped!", eventData),
    //onSwiping: () => console.log("swiping"),
    //onSwipedUp: () => console.log("up"),
    //touchEventOptions: { passive: true },
  });

  //changement d'index//

  const previousPicture = () => {
    if (cooldown === false) {
      cooldown = true;

      document.querySelector(".arrowLeft").classList.add("cooldown");

      setSelected(stselected - 1);
      setPrevious(stprevious - 1);
      setNext(stnext - 1);
      selected--;
      previous--;
      next--;
      if (stselected < 1) {
        setSelected(sortedSlider.length - 1);
      }
      if (stprevious < 1) {
        setPrevious(sortedSlider.length - 1);
      }
      if (stnext < 1) {
        setNext(sortedSlider.length - 1);
      }
      if (selected < 0) {
        selected = sortedSlider.length - 1;
      }
      if (previous < 0) {
        previous = sortedSlider.length - 1;
      }
      if (next < 0) {
        next = sortedSlider.length - 1;
      }
      forceUpdate();
      document.querySelector(".dotSelected").classList.remove("dotSelected");
      if (sortedSlider.length === 2) {
        if (selected < 2) {
          document.querySelector(".d" + selected).classList.add("dotSelected");
        }
        if (selected === 2) {
          document.querySelector(".d0").classList.add("dotSelected");
        }
        if (selected === 3) {
          document.querySelector(".d1").classList.add("dotSelected");
        }
      } else {
        document.querySelector(".d" + selected).classList.add("dotSelected");
      }

      for (let i = 0; i < sortedSlider.length; i++) {
        document.querySelector(".b" + i + likeId).style.zIndex = "0";
        document.querySelector(".b" + i + likeId).style.opacity = "0";
        document.querySelector(".b" + i + likeId).classList.remove("selected");
        document.querySelector(".b" + i + likeId).classList.remove("next");
        document.querySelector(".b" + i + likeId).classList.remove("previous");
        document.querySelector(".b" + i + likeId).classList.remove("start");
        document
          .querySelector(".b" + i + likeId)
          .classList.remove("beforStart");
      }
      document.querySelector(".b" + next + likeId).classList.add("next");
      document.querySelector(".b" + next + likeId).style.opacity = "1";
      document.querySelector(".b" + next + likeId).style.zIndex = "2";
      document
        .querySelector(".b" + previous + likeId)
        .classList.add("previous");
      document.querySelector(".b" + previous + likeId).style.opacity = "1";
      document.querySelector(".b" + previous + likeId).style.zIndex = "0";
      document
        .querySelector(".b" + selected + likeId)
        .classList.add("selected");
      document.querySelector(".b" + selected + likeId).style.zIndex = "2";
      document.querySelector(".b" + selected + likeId).style.opacity = "1";
      setTimeout(() => {
        cooldown = false;
        document.querySelector(".arrowLeft").classList.remove("cooldown");
      }, 1000);
    }
  };

  const nextPicture = () => {
    if (cooldown === false) {
      cooldown = true;
      if (document.querySelector(".arrowRight") !== null) {
        document.querySelector(".arrowRight").classList.add("cooldown");
      }
      setSelected(stselected + 1);
      setPrevious(stprevious + 1);
      setNext(stnext + 1);
      selected++;
      previous++;
      next++;
      if (stselected > sortedSlider.length - 2) {
        setSelected(0);
      }
      if (stprevious > sortedSlider.length - 2) {
        setPrevious(0);
      }
      if (stnext > sortedSlider.length - 2) {
        setNext(0);
      }

      if (selected > sortedSlider.length - 1) {
        selected = 0;
      }
      if (previous > sortedSlider.length - 1) {
        previous = 0;
      }
      if (next > sortedSlider.length - 1) {
        next = 0;
      }
      forceUpdate();
      if (document.querySelector(".dotSelected") !== null) {
        document.querySelector(".dotSelected").classList.remove("dotSelected");
        if (sortedSlider.length === 2) {
          if (selected < 2) {
            document
              .querySelector(".d" + selected)
              .classList.add("dotSelected");
          }
          if (selected === 2) {
            document.querySelector(".d0").classList.add("dotSelected");
          }
          if (selected === 3) {
            document.querySelector(".d1").classList.add("dotSelected");
          }
        } else {
          document.querySelector(".d" + selected).classList.add("dotSelected");
        }
      }

      for (let i = 0; i < sortedSlider.length; i++) {
        document.querySelector(".b" + i + likeId).style.zIndex = "0";
        document.querySelector(".b" + i + likeId).style.opacity = "0";
        document.querySelector(".b" + i + likeId).classList.remove("selected");
        document.querySelector(".b" + i + likeId).classList.remove("next");
        document.querySelector(".b" + i + likeId).classList.remove("previous");
        document.querySelector(".b" + i + likeId).classList.remove("start");
        document
          .querySelector(".b" + i + likeId)
          .classList.remove("beforStart");
      }

      document
        .querySelector(".b" + previous + likeId)
        .classList.add("previous");
      document.querySelector(".b" + previous + likeId).style.opacity = "1";
      document.querySelector(".b" + previous + likeId).style.zIndex = "2";
      document.querySelector(".b" + next + likeId).classList.add("next");
      document.querySelector(".b" + next + likeId).style.opacity = "1";
      document.querySelector(".b" + next + likeId).style.zIndex = "0";
      document
        .querySelector(".b" + selected + likeId)
        .classList.add("selected");
      document.querySelector(".b" + selected + likeId).style.zIndex = "2";
      document.querySelector(".b" + selected + likeId).style.opacity = "1";
      setTimeout(() => {
        cooldown = false;
        if (document.querySelector(".arrowRight") !== null) {
          document.querySelector(".arrowRight").classList.remove("cooldown");
        }
      }, 1000);
    }
  };
  return (
    <div className="sliderField sliderContainer">
      {mini === true ? (
        ""
      ) : (
        <div className="like">
          <LikeButton
            propsLike={{
              id: likeId,
              color: "black",
            }}
          ></LikeButton>
        </div>
      )}
      <div className="inner" {...handlers}>
        {sortedSlider.map((slide) => {
          return (
            <div
              className={
                mini === true
                  ? slide.index === 0
                    ? "sl b" + slide.index + likeId
                    : "sl start b" + slide.index + likeId
                  : slide.index === 0
                  ? "slMax sl b" + slide.index + likeId
                  : slide.index === sortedSlider.length - 1
                  ? "slMax beforStart sl b" + slide.index + likeId
                  : "slMax start sl b" + slide.index + likeId
              }
              key={slide.index}
            >
              <img
                className={mini === true ? "carousel-img-mini" : "carousel-img"}
                src={slide.picture}
                alt={slide.alt}
                style={{
                  zIndex: 2,
                }}
              />
              {mini === false && slide.french_content !== "nothing" ? (
                language === "FR" ? (
                  <div className="sliderTextDiv">
                    <p className="sliderContent">{slide.french_content}</p>
                  </div>
                ) : (
                  <div className="sliderTextDiv">
                    <p className="sliderContent">{slide.english_content}</p>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      {sortedSlider.length > 1 && mini === false ? (
        <div className="arrowAndCounter">
          <button
            tabIndex={0}
            className="buttonArrow arrowLeft"
            onClick={previousPicture}
          >
            <img
              className="leftArrow"
              src="http://pierre-le-developpeur.com/assets/arrow_left.png"
              alt="fleche vers la gauche"
            ></img>
          </button>
          <button
            tabIndex={0}
            className="buttonArrow arrowRight"
            onClick={nextPicture}
          >
            <img
              className="rightArrow"
              src="http://pierre-le-developpeur.com/assets/arrow_right.png"
              alt="fleche vers la droite"
            ></img>
          </button>
          {sliders.length === 2 ? (
            <div className="counter">
              <div className="dot dotSelected d0 d2"></div>
              <div className="dot d1 d3"></div>
            </div>
          ) : (
            <div className="counter">
              {sortedSlider.map((dot) => {
                return (
                  <div
                    key={dot.index}
                    className={
                      dot.index === 0
                        ? "dot dotSelected d" + dot.index
                        : "dot d" + dot.index
                    }
                  ></div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Slider;
