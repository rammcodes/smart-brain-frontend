import React from "react";
import "./face_recognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  const { topRow, bottomRow, rightCol, leftCol } = box;
  return (
    <div className="center ma">
      <div className="absolute mt3">
        <img
          id="inputImage"
          className="img"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: topRow,
            bottom: bottomRow,
            right: rightCol,
            left: leftCol
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
