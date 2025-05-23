import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import "./textArea.css";
import LikeButton from "../LikeButton";
import Cofee from "../Cofee/index.jsx";

function AreaForText({ props, content }) {
  const language = useSelector((state) => state.data.language);
  /*const linkRegExp = new RegExp(
    "\\[+[a-z0A-Z-9\\/ :._-]+\\]+\\(+[a-zA-Z0-9\\/ :._-]+\\)"
  );*/
  //const strongRegExp = new RegExp("\\*+\\*+[a-z0A-Z-9\\/:._-]+\\*+\\*");
  //const strongRegExp = new RegExp("\\*+\\*");
  let french = props.french.split(`\n`);

  let english = props.english.split(`\n`);

  return (
    <div className="textareafield">
      <div className={props.style}>
        <div className="title">
          {language === "FR" ? (
            <span>{props.frenchTitle}</span>
          ) : (
            <span>{props.englishTitle}</span>
          )}
        </div>
        <form id={props.id + "myForm"} className="mise-en-page textArea">
          <div className="fullResum">
            {language === "FR"
              ? french.map((content, index) => (
                  <ReactMarkdown children={content}>{content}</ReactMarkdown>
                ))
              : english.map((content, index) => (
                  <ReactMarkdown children={content}>{content}</ReactMarkdown>
                ))}{" "}
          </div>
          <br></br>

          {props.links != null ? (
            <div className="textareaLinks">
              {" "}
              <h1> {language === "FR" ? "Liens :" : "Links :"} </h1>
              {props.links.map((link) => (
                <div key={link._id}>
                  <a
                    href={link.url}
                    target={link.category === "pierre le dev" ? "" : "_blank"}
                    className="projectLink"
                    rel="noopener noreferrer"
                  >
                    {link.url}
                  </a>
                  <br />
                  <br />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {props.likes != null ? (
            <div className="likePlace">
              <LikeButton
                propsLike={
                  props.style === "windows" && props.edit === false
                    ? { id: props.likes, color: "withe" }
                    : { id: props.likes, color: "black" }
                }
              ></LikeButton>
            </div>
          ) : (
            ""
          )}
          {props.cofee === true ? (
            <div className="cofeeComponent">
              <Cofee></Cofee>
            </div>
          ) : (
            ""
          )}
          <div className="softSkills">{content}</div>
          {props.cofee === true && props.edit === false ? (
            <div className="spacedTextArea"></div>
          ) : (
            ""
          )}
          {props.sign === true ? (
            <a href={props.authorLink} target="blank">
              <p className={language === "FR" ? "sign" : "sign"}>
                {props.author}
              </p>
            </a>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

export default AreaForText;
