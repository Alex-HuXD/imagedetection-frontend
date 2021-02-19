import React from "react";
import "./imagelinkform.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <>
      <p className="f3">
        {"This Magic Brain will detect faces in your picture"}
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 form">
          <input
            type="text"
            className="f4 pa2 w-70 center br3"
            onChange={onInputChange}
          />
          <button
            className="w-25 grow f4 link ph3 pv2 dib white br3"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageLinkForm;
