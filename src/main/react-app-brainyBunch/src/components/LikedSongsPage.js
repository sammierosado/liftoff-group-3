import React, { useState, useEffect } from "react";
// import "../css/collectionBoard.css";
import Navigation from "./Navigation";
import { useRoutes } from "react-router-dom";

const LikedSongsPage = ({ onAddLikedSong }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [sortType, setSortType] = useState('artist');
  const username = localStorage.getItem("username");
  const [imageSource, setImageSource] = useState(null);
  const [userSongs, setUserSongs] = useState([]);

  

  useEffect(() => {
    const getLikedSongs = async () => {
      const response = await fetch(
        "http://localhost:8080/api/liked-songs/" + username,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );
      const likedSongsData = await response.json();
      setLikedSongs(likedSongsData);
      console.log(likedSongsData);
    };

    getLikedSongs();
  }, []);

  const getSongs = async () => {
    const response = await fetch("http://localhost:8080/api/liked-songs/", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const likedSongsData  = await response.json();
    setUserSongs(likedSongsData);
    console.log(likedSongsData);
  };
  
const sortSongsByArtist = () => {
  const sortedSongs = userSongs
    .slice()
    .sort((a, b) => {
      const artistA = (a.artist || "").toLowerCase();
      const artistB = (b.artist || "").toLowerCase();
      const albumNameA = (a.albumName || "").toLowerCase();
      const albumNameB = (b.albumName || "").toLowerCase();
      return artistA.localeCompare(artistB) || albumNameA.localeCompare(albumNameB);
    });
  setUserSongs(sortedSongs);
};
const sortSongsByAlbum = () => {
  const sortedSongs = userSongs
    .slice()
    .sort((a, b) => {
      const artistA = (a.artist || "").toLowerCase();
      const artistB = (b.artist || "").toLowerCase();
      const albumNameA = (a.albumName || "").toLowerCase();
      const albumNameB = (b.albumName || "").toLowerCase();
      return albumNameA.localeCompare(albumNameB) || artistA.localeCompare(artistB);
    });
  setUserSongs(sortedSongs);
};
const sortSongsByTimestamp = () => {
  const sortedSongs = userSongs
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp);
  setUserSongs(sortedSongs);
};

const handleSortTypeChange = (newSortType) => {
  setSortType(newSortType);
  if (newSortType === 'artist') {
    sortSongsByArtist();
  } else if (newSortType === 'album') {
    sortSongsByAlbum();
  } else if (newSortType === 'timestamp') {
    sortSongsByTimestamp();
  }
};

  const loadProfileImage = async () => {
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
      <h1>Your Liked Songs</h1>
      {/* Implement your UI for displaying liked songs here */}
      <button onClick={() => handleSortTypeChange('artist')}>Sort by Artist</button>
      {/* Add buttons for sorting by album and timestamp if needed */}
      <br></br>
      {likedSongs &&
        likedSongs.map((song) => {
          return (
            <div className="card" key={song.id}>
              <img src={imageSource} alt="User" className="img"></img>
              <div className="container">
                {/* Add any other details you want to display */}
                <p>{song.artist}</p>
                <p>{song.albumName}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LikedSongsPage;



// import React, { useState, useEffect } from "react";

// const LikedSongs = () => {
//   const [likedSongs, setLikedSongs] = useState([]);
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     fetchLikedSongs();
//   }, []);

//   const fetchLikedSongs = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/liked-songs/" + username
//       );
//       const data = await response.json();
//       setLikedSongs(data);
//     } catch (error) {
//       console.error("Error fetching liked songs:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Liked Songs</h2>
//       <ul>
//         {likedSongs.map((song) => (
//           <li key={song.id}>
//             {/* Display information about the liked song */}
//             {song.albumName} by {song.artist}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LikedSongs;
