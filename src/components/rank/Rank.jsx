import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <>
      <div className="white f3 ">{`${name},your submitted image(s) total is ...`}</div>
      <div className="white f3 ">{`${entries}`}</div>
    </>
  );
};

export default Rank;
