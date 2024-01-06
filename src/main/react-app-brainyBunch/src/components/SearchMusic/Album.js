import React from "react";
import "../../css/searchPage.css";
const Album = ({ album }) => {
  return (
    <div className="wrapper" key={album.id}>
      {album.imageUrl && (
        <img src={album.imageUrl} alt="album" width="100" height="100" />
      )}

      {!album.imageUrl && <div className="noimage">No Image Found</div>}

      <div className="">
        <h4>{album.name}</h4>
      </div>
    </div>
  );
};

export default Album;
