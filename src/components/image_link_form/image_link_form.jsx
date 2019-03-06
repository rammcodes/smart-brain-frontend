import React from "react";
import "./image_link_form.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="intro f2">
        {"This Magic Brain will detect faces in your pictures!"}
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            placeholder="add image url here..."
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow but f4 link ph3 pv2 dib black bg-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
