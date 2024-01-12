import React, { useState, useEffect } from 'react';
const LikedSongsPage = () => {
  const [likedSongsPage, setLikedSongsPage] = useState([]);
  useEffect(() => {
    fetchLikedSongsPage();
  }, []);
  const fetchLikedSongsPage = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/liked_songs');
      const data = await response.json();
      setLikedSongsPage(data);
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    }
  };
  return (
    <div>
      <h2>Liked Songs</h2>
      <ul>
        {likedSongsPage.map((song) => (
          <li key={song.id}>
            {/* Display information about the liked song */}
            {song.name} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LikedSongsPage;








