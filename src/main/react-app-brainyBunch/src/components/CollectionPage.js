import React, { useState } from "react";
import "../css/collectionBoard.css";

const CollectionPage = ({ onAddSong }) => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  const createCollection = () => {
    if (newCollectionName.trim() !== "") {
      setCollections([
        ...collections,
        { id: Date.now(), name: newCollectionName, songs: [] },
      ]);
      setNewCollectionName("");
    }
  };

  const addSongToCollection = (collectionId, song) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              songs: [...collection.songs, { id: Date.now(), name: song.name }],
            }
          : collection
      )
    );
  };

  return (
    <div>
      <h1>Your Collections</h1>
      <input
        type="text"
        placeholder="Enter collection name"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
      />
      <button onClick={createCollection}>Create Collection</button>
      <ul>
        {collections.map((collection) => (
          <>
            <li key={collection.id}>
              <strong>{collection.name}</strong>
              <ul>
                {collection.songs.map((song) => (
                  <li key={song.id}>{song.name}</li>
                ))}
              </ul>
              {/* Removed input for entering song name */}
              {/* Removed button for adding song */}
            </li>
          </>
        ))}
      </ul>
      {/* Defualt Collections */}
      <div
        className="card"
        onClick={() => {
          console.log("click");
        }}
      >
        <img src="rock-music.webp" alt="Rock" className="img"></img>
        <div className="container">
          <h4>
            <b>Rock</b>
          </h4>
          <p>Default Collection</p>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          console.log("click");
        }}
      >
        <img src="jazz.webp" alt="Jazz" className="img"></img>
        <div className="container">
          <h4>
            <b>Jazz</b>
          </h4>
          <p>Default Collection</p>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          console.log("click");
        }}
      >
        <img src="rap.jpeg" alt="Rap" className="img"></img>
        <div className="container">
          <h4>
            <b>Rap</b>
          </h4>
          <p>Default Collection</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
