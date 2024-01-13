import React, { useState, useEffect } from "react";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/liked-songs/" + username
      );
      const data = await response.json();
      setLikedSongs(data);
    } catch (error) {
      console.error("Error fetching liked songs:", error);
    }
  };

  return (
    <div>
      <h2>Liked Songs</h2>
      <ul>
        {likedSongs.map((song) => (
          <li key={song.id}>
            {/* Display information about the liked song */}
            {song.albumName} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedSongs;
