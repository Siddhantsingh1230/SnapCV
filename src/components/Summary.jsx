import React from "react";

const Summary = ({ data, toggle }) => {
  return (
    <>
      <div className="summary">
        <div className="title">
          <p className="filename">
            {data.name} - {(data.size / (1024 * 1024)).toFixed(3)} MB
          </p>
          <p className="sentiment">sentiment:{data.sentiment?(data.sentiment).toFixed(3):0}</p>
        </div>
        <p className="summarytitle">Summary:</p>
        <div className="summarybody">
            {data.summary}
        </div>
        <button className="toggle" onClick={() => toggle(false)}>
          New Summary
        </button>
      </div>
    </>
  );
};

export default Summary;
