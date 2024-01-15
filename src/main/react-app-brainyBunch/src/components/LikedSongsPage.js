import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";

const LikedSongsPage = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [sortedLikedSongs, setSortedLikedSongs] = useState([]);
  const [sortType, setSortType] = useState('artist');
  const username = localStorage.getItem("username");

  useEffect(() => {
    sortLikedSongs(sortType);
  }, [likedSongs, sortType]);

  const sortLikedSongs = (newSortType) => {
    let sortedSongs = [...likedSongs];
    if (newSortType === 'artist') {
      sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (newSortType === 'album') {
      sortedSongs.sort((a, b) => a.albumName.localeCompare(b.albumName));
    }
    setSortedLikedSongs(sortedSongs);
    setSortType(newSortType);
  };

  useEffect(() => {
    const getLikedSongs = async () => {
      const response = await fetch(
        `http://localhost:8080/api/liked-songs/${username}`,
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

  return (
    <div>
      <Navigation />
      <br />
      <br />
      <br />
      <h1>Liked Songs</h1>
      <div>
        <button onClick={() => sortLikedSongs('artist')}>Sort by Artist</button>
        <button onClick={() => sortLikedSongs('album')}>Sort by Song</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Song</th>
          </tr>
        </thead>
        <tbody>
          {sortedLikedSongs.map((song) => (
            <tr key={song.id}>
              <td>{song.artist}</td>
              <td>{song.albumName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default LikedSongsPage;