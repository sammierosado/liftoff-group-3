import React from "react";
import "../../css/searchPage.css";

const Track = ({ track }) => {
  return (
    <div className="wrapper" key={track.id}>
      {track.imageUrl && (
        <img src={track.imageUrl} alt="track" width="100" height="100" />
      )}

      {!track.imageUrl && <div className="noimage">No Image Found</div>}

      <div className="">
        <h4>{track.title}</h4>
      </div>
    </div>
  );
};

export default Track;
