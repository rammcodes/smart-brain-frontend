import React from "react";
import "./rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div className="rank">
      <div className="white f2">{`${name} , number of Images you detected are...`}</div>
      <br />
      <div className="white f2">{entries}</div>
    </div>
  );
};

export default Rank;
