import React from "react";
import Tilt from "react-tilt";
import brain from "./logo/brain.png";
import "./logo.css";

const Logo = () => {
  return (
    <div className="mt3 ma3 parent">
      <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }}>
        <div className="Tilt-inner pa3">
          <img className="img-class" alt="brain" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
