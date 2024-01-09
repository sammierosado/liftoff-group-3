import React, { useState } from "react";
import axios from "axios";

function LikedSongsPage({ likedAlbums, onLikeButtonClick }) {
  const [newLikedSong, setNewLikedSong] = useState({
    likedSongs: "",
    artistName: "",
    albumName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLikedSong({
      ...newLikedSong,
      [name]: value,
    });
  };

  const handleLikeButtonClick = async () => {
    try {
      // Send a request to the backend to add the liked song
      await axios.post("/api/liked-songs", newLikedSong);

      // Notify the parent component that the liked song has been added
      onLikeButtonClick(newLikedSong);

      // Clear the input fields after liking a song
      setNewLikedSong({
        likedSongs: "",
        artistName: "",
        albumName: "",
      });
    } catch (error) {
      console.error("Error adding liked song", error);
    }
  };

  return (
    <div>
      <h2>Liked Songs</h2>
      <ul>
        {likedAlbums && likedAlbums.length > 0 ? (
          likedAlbums.map((likedAlbum, i) => <li key={i}>{likedAlbum.name}</li>)
        ) : (
          <p>No liked songs yet.</p>
        )}
      </ul>

      <h3>Add Liked Song</h3>
      <div>
        <label>Song Name:</label>
        <input
          type="text"
          name="likedSongs"
          value={newLikedSong.likedSongs}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Artist Name:</label>
        <input
          type="text"
          name="artistName"
          value={newLikedSong.artistName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Album Name:</label>
        <input
          type="text"
          name="albumName"
          value={newLikedSong.albumName}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleLikeButtonClick}>Like Song</button>
    </div>
  );
}

export default LikedSongsPage;

// function LikedSongsPage({ likedAlbums }) {
//   return (
//     <div>
//       <h2>Liked Songs</h2>
//       <ul>
//         {likedAlbums && likedAlbums.length > 0 ? (
//           likedAlbums.map((likedAlbum, i) => (
//             <li key={i}>{likedAlbum.name}</li>
//           ))
//         ) : (
//           <p>No liked songs yet.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default LikedSongsPage;

// import React from "react";

// function LikedSongs() {
//   return (
//     <div>
//       <h1>Here are the liked songs.</h1>
//       <p>You can look at songs you liked from Spotify.</p>
//     </div>
//   );
// }

// export default LikedSongs;
