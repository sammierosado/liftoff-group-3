import React, { useState, useEffect } from "react";
import "../css/collectionBoard.css";
import Navigation from "./Navigation";
import { useRoutes } from "react-router-dom";
const CollectionPage = ({ onAddSong }) => {
  const [collections, setCollections] = useState([]);
  const [userCollection, setUserCollection] = useState();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [userSongs, setUserSongs] = useState([]);
  // const [sortEnabled, setSortEnabled] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [sortType, setSortType] = useState("artist");
  const username = localStorage.getItem("username");
  const [imageSource, setImageSource] = useState(null);

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
    const getSongs = async () => {
      const response = await fetch("http://localhost:8080/api/song", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      const collectionData = await response.json();
      setUserSongs(collectionData);
      console.log(collectionData);
    };
    userCollection();
    getSongs();
  }, []);
  const sortSongsByArtist = () => {
    const sortedSongs = userSongs.slice().sort((a, b) => {
      const artistA = (a.artist || "").toLowerCase();
      const artistB = (b.artist || "").toLowerCase();
      const albumNameA = (a.albumName || "").toLowerCase();
      const albumNameB = (b.albumName || "").toLowerCase();
      return (
        artistA.localeCompare(artistB) || albumNameA.localeCompare(albumNameB)
      );
    });
    setUserSongs(sortedSongs);
  };
  const sortSongsByAlbum = () => {
    const sortedSongs = userSongs.slice().sort((a, b) => {
      const artistA = (a.artist || "").toLowerCase();
      const artistB = (b.artist || "").toLowerCase();
      const albumNameA = (a.albumName || "").toLowerCase();
      const albumNameB = (b.albumName || "").toLowerCase();
      return (
        albumNameA.localeCompare(albumNameB) || artistA.localeCompare(artistB)
      );
    });
    setUserSongs(sortedSongs);
  };
  const handleSortTypeChange = (newSortType) => {
    setSortType(newSortType);
    if (newSortType === "artist") {
      sortSongsByArtist();
    } else if (newSortType === "album") {
      sortSongsByAlbum();
    }
  };
  // useEffect(() => {
  //   if (sortEnabled) {
  //     if (sortType === 'artist') {
  //       sortSongsByArtist();
  //     } else if (sortType === 'album') {
  //       sortSongsByAlbum();
  //     }
  //   }
  // }, [sortEnabled, sortType, userSongs]);
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
      // Create timestamp after successful collection creation
      createTimestampWithDescription(
        "Created collection: " + collectionName,
        username
      );
    }
  };
  const createTimestampWithDescription = async (description, retUser) => {
    try {
      const response = await fetch("http://localhost:8080/stamps/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionDescription: description, // Include the description
          retUser: retUser, // Include retUser in the request body
          // Add other properties as needed
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create timestamp");
      }
      const successMessage = await response.text();
      console.log(successMessage);
      //fetchStamps(); // Refresh the list after successful creation
    } catch (error) {
      console.error("Error creating timestamp:", error);
      // Handle the error appropriately, e.g., display an error message to the user
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
  // handle song delete
  const handleSongDelete = async (id) => {
    console.log(id, "delete song");
    const response = await fetch(
      `http://localhost:8080/api/song/delete/${id}`,
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      window.location.reload(true);
    }
  };

  const loadProfileImage = async () => {
    const username = localStorage.getItem("username");
    const response = await fetch(
      `http://localhost:8080/profileImage/${username}`
    );
    if (!response.ok) {
      setImageSource(null);
    } else {
      console.log(response);
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageSource(imageObjectURL);
    }
  };

  useEffect(() => {
    loadProfileImage();
  }, []);

  return (
    <div>
      <Navigation />
      <br></br>
      <br></br>
      <br></br>
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
      <button onClick={() => handleSortTypeChange("artist")}>
        Sort by Artist
      </button>
      <button onClick={() => handleSortTypeChange("album")}>
        Sort by Song
      </button>
      <br></br>
      {userCollection &&
        userCollection.map((collection) => {
          return (
            <div className="card">
              {/* <img src="userCollection.avif" alt="User" className="img"></img> */}
              <img src={imageSource} alt="User" className="img"></img>
              <div className="container">
                <button
                  onClick={() => {
                    setSelectedCollection(collection.collectionName);
                  }}
                >
                  View Songs
                </button>
              </div>
              <p>{collection.collectionName}</p>
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
      <div className="songs">
        {userSongs.map((song) => {
          if (song.collectionName === selectedCollection) {
            return (
              <>
                <table>
                  <tr>
                    <th>Artist</th>
                    <th>Song</th>
                    <th>Delete</th>
                  </tr>
                  <tr>
                    <td>{song.artist}</td>
                    <td>{song.albumName}</td>
                    <td>
                      <button onClick={() => handleSongDelete(song.id)}>
                        Delete Me!
                      </button>
                    </td>
                  </tr>
                </table>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};
export default CollectionPage;

