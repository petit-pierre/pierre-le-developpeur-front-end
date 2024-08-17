import "./button.css";

function Button({ props }) {
  return (
    <div className="buttonDiv">
      <div className={props.send === true ? "send" : "cantSend"}>
        <div className={props.style + " buttonAndBackground"}>
          <button
            className={props.send === true ? "button visible" : "button"}
            tabIndex={-1}
          >
            {props.picture === true ? (
              <img src={props.title} alt="button"></img>
            ) : (
              props.title
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Button;
