import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePictureThunk,
  deleteSlideThunk,
} from "../../thunkActionsCreator";

function DeleteSlide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { slideId } = useParams();

  const sliders = useSelector((state) => state.data.sliders);
  const slide = sliders.find((slide) => slide._id === slideId);
  const token = useSelector((state) => state.data.token);

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function goBack() {
    navigate("/User");
  }

  function deleteSlide() {
    const id = slide.picture_id;
    const deletePicture = async () => {
      const deletePictureResult = await dispatch(deletePictureThunk(id, token));
    };
    deletePicture();

    const slideId = slide._id;
    const deleteSlide = async () => {
      const deleteSlideResult = await dispatch(
        deleteSlideThunk(slideId, token)
      );
    };
    deleteSlide();

    navigate("/User");
  }
  return (
    <div style={{ "margin-top": "20dvh", textAlign: "center" }}>
      <h1>Oh non !!!!!!</h1>
      <p>
        Confirmez vous la suppression de ce slide : {slide.french_content} ?
      </p>
      <button onClick={deleteSlide}>OUI</button>
      <button onClick={goBack}>NON</button>
    </div>
  );
}

export default DeleteSlide;
