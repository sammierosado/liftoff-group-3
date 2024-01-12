import React, { useState, useEffect } from "react";
import "../css/collectionBoard.css";
import Navigation from "./Navigation";
import { useRoutes } from "react-router-dom";

const CollectionPage = ({ onAddSong }) => {
  const [collections, setCollections] = useState([]);
  const [userCollection, setUserCollection] = useState();
  const [newCollectionName, setNewCollectionName] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    console.log(username);

    const userCollection = async () => {
      const response = await fetch(
        "http://localhost:8080/collections/" + username,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const collectionData = await response.json();
      setUserCollection(collectionData);
      console.log(collectionData);
    };
    userCollection();
  }, []);

  const saveCollection = async (collectionName) => {
    const requestBody = {
      username: username,
      collectionName: collectionName,
    };
    const response = await fetch("http://localhost:8080/collections", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const resdata = await response.json();
    console.log(resdata.errorMessage);
    if (response.ok) {
      setUserCollection(resdata);
    }
  };

  const createCollection = () => {
    if (newCollectionName.trim() !== "") {
      setCollections([
        ...collections,
        { id: Date.now(), name: newCollectionName, songs: [] },
      ]);
      setNewCollectionName("");
      saveCollection(newCollectionName.trim());
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
      <Navigation />
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
      <h2>User Collections</h2>
      {userCollection &&
        userCollection.map((collection) => {
          return (
            <div
              className="card"
              onClick={() => {
                console.log("click");
              }}
            >
              <img src="userCollection.avif" alt="User" className="img"></img>
              <div className="container">
                <a href="/rockpage" id="special">
                  {collection.collectionName}
                </a>
              </div>
              <p>User Collection</p>
            </div>
          );
        })}

      {/* Defualt Collections */}
      <div
        className="card"
        onClick={() => {
          console.log("click");
        }}
      >
        <img src="rock-music.webp" alt="Rock" className="img"></img>
        <div className="container">
          <a href="/rockpage" id="special">
            Rock
          </a>
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
          <a href="/jazzpage" id="special">
            Jazz
          </a>
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
          <a href="/rappage" id="special">
            Rap
          </a>
          <p>Default Collection</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
