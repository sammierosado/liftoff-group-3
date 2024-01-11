
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
      console.error('Error fetching liked songs:', error);
    }
  };

  return (
    <div>
      <h2>Liked Songs</h2>
      <ul>

        {likedSongs.map((song) => (
          <li key={song.id}>
            {/* Display information about the liked song */}
            {song.name} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default LikedSongs;

