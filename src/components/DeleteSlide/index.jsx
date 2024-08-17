import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DeleteSlide() {
  const sliders = useSelector((state) => state.data.sliders);
  const [edit, setEdit] = useState(false);
  function projectChange() {
    setEdit(!edit);
  }

  return (
    <div>
      {edit === true ? (
        <p></p>
      ) : (
        <div>
          <button className="edit-button" onClick={projectChange}>
            Delete slide
          </button>
        </div>
      )}

      {edit === true ? (
        <div>
          {sliders.map((slide) => (
            <div>
              <Link to={"Slide/" + slide._id} key={`${slide.id}`}>
                "Supprimez moi : {slide.french_content}
              </Link>
              <p> </p>
            </div>
          ))}
          <button onClick={projectChange}>Cancel</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default DeleteSlide;
