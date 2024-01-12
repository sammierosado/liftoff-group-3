import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LikedSongsPage from "./LikedSongsPage";
import CollectionPage from "./CollectionPage";
import "../css/randomPage.css";
import "../css/gridLayout.css";

const CLIENT_ID = "2c8d20f72c914fe79dfd499fb8f9644e";
const CLIENT_SECRET = "9ba9d68e457a43aea82a41d0114e9aa8";

function RandomMusicPage() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [styleSelected, setStyleSelected] = useState("column");

  const username = localStorage.getItem("username");
  const [collectionValues, setCollectionValues] = useState([]);
  const [isDisable, setIsDisable] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [isLikedSongsVisible, setLikedSongsVisible] = useState(false);

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));

    const collectionValues = async () => {
      const response = await fetch(
        "http://localhost:8080/collections/" + username,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const collectionData = await response.json();
      setCollectionValues(collectionData);
    };
    collectionValues();
  }, []);

  async function search() {
    var newAlbums = await fetch(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setAlbums(
          data.albums.items.map((album) => ({ ...album, liked: false }))
        )
      );
  }

  const handleAddToLikedSongs = async (selectedAlbum) => {
    const requestBody = {
      username: username,
      albumName: selectedAlbum.name,
      artists: selectedAlbum.artists.map((artist) => artist.name),
      // collectionName: selectedCollection || collectionValues[0].collectionName,
    };
    const response = await fetch("http://localhost:8080/api/song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // Add the selected album to the user's collection
    console.log("Added to Liked Songs:", selectedAlbum);
    setSelectedAlbum(null);
  };

  // const handleLikedSongsChange = (e) => {
  //   setSelectedAlbum(e.target.value);
  // };


  const handleAddToCollection = async (selectedAlbum) => {
    const requestBody = {
      username: username,
      albumName: selectedAlbum.name,
      artists: selectedAlbum.artists[0].name,
      collectionName: selectedCollection || collectionValues[0].collectionName,
    };
    const response = await fetch("http://localhost:8080/api/song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // Add the selected album to the user's collection
    console.log("Added to collection:", selectedAlbum);
    setSelectedAlbum(null);
  };

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  return (
    <div className="RandomMusicPage">
      <form>
        <label htmlFor="style">Choose a style:</label>
        <select
          id="style"
          name="style"
          onChange={(event) => setStyleSelected(event.target.value)}
        >
          <option value="column">Column</option>
          <option value="grid">Grid</option>
        </select>
      </form>
      <div>
        <button className="RandomButton" type="button" onClick={search}>
          Search for popular new albums!
        </button>
      </div>

      {/* Liked Songs Section */}
      <div>
          <ul>
            {likedAlbums.map((album) => (
              <li key={album.id}>
                {album.name} by {album.artists[0].name}
              </li>
            ))}
          </ul>
      </div>

      {/* Display Albums */}
      {styleSelected === "column" ? (
        <div>
          {albums.map((album, i) => (
            <div className="RandomCard" key={i}>
              <img
                src={album.images[0].url}
                alt="alt text"
                className="randomImg"
              />
              <div>
                <h4>
                  <b>{album.name}</b>
                </h4>
                <p>{album.artists[0].name}</p>
                <button onClick={() => handleAddToLikedSongs(album)}>
                  {album.liked ? "Unlike" : "Like"}
                </button>
                <form>
                  <label htmlFor="userCollections">Choose a collection:</label>
                  <select
                    name="collections"
                    id="collections"
                    onChange={handleCollectionChange}
                  >
                    {collectionValues.length > 0 &&
                      collectionValues.map((value) => (
                        <option key={value.id}>{value.collectionName}</option>
                      ))}
                    {!collectionValues.length === 0 && (
                      <option>No collection found</option>
                    )}
                  </select>
                  <br />
                  <input
                    type="button"
                    value="Submit"
                    onClick={() => handleAddToCollection(album)}
                  />
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="GridContainer">
          {albums.map((album, i) => (
            <div className="GridRandomCard" key={i}>
              <div className="row">
                <img
                  src={album.images[0].url}
                  alt="alt text"
                  className="GridRandomImg"
                />
                <div>
                  <h4>
                    <b>{album.name}</b>
                  </h4>
                  <p>{album.artists[0].name}</p>
                  <button onClick={() => handleAddToLikedSongs(album)}>
                    {album.liked ? "Unlike" : "Like"}
                  </button>
                  <form>
                    <label htmlFor="userCollections">Choose a collection:</label>
                    <select
                      name="collections"
                      id="collections"
                      onChange={handleCollectionChange}
                    >
                      {collectionValues.length > 0 &&
                        collectionValues.map((value) => (
                          <option key={value.id}>{value.collectionName}</option>
                        ))}
                      {!collectionValues.length === 0 && (
                        <option>No collection found</option>
                      )}
                    </select>
                    <br />
                    <input
                      type="button"
                      value="Submit"
                      onClick={() => handleAddToCollection(album)}
                    />
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        {/* Uncomment this link when you have a LikedSongsPage component */}
        {/* <Link to="/likedsongs">Go to Liked Songs</Link> */}
      </div>
      <Routes>
        <Route
          path="/likedsongs"
          element={<LikedSongsPage likedAlbums={likedAlbums} />}
        />
        {/* Pass onAddSong callback to CollectionPage */}
        <Route
          path="/collections"
          element={<CollectionPage onAddSong={handleAddToCollection} />}
        />
      </Routes>
    </div>
  );
}

export default RandomMusicPage;
