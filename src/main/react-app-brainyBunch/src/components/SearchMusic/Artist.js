import React from "react";
import "../../css/searchPage.css";

const Artist = ({ artist }) => {
  return (
    <div className="wrapper" key={artist.id}>
      {artist.imageUrl && (
        <img src={artist.imageUrl} alt="artist" width="100" height="100" />
      )}

      {!artist.imageUrl && <div className="noimage">No Image Found</div>}

      <div className="">
        <h4>{artist.name}</h4>
      </div>
    </div>
  );
};

export default Artist;
