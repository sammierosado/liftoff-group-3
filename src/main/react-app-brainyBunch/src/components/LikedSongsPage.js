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



// import React, { useState, useEffect } from "react";
// import "../css/collectionBoard.css";
// import Navigation from "./Navigation";
// import { useRoutes } from "react-router-dom";

// const LikedSongsPage = ({ onAddLikedSong }) => {
//   const [likedSongs, setLikedSongs] = useState([]);
//   const [sortType, setSortType] = useState('artist');
//   const username = localStorage.getItem("username");
//   const [imageSource, setImageSource] = useState(null);
//   const [userSongs, setUserSongs] = useState([]);

//   useEffect(() => {
//     sortLikedSongs(sortType);
//   }, [likedAlbums, sortType]);

//   const sortLikedSongs = (newSortType) => {
//     let sortedSongs = [...likedAlbums];
//     if (newSortType === 'artist') {
//       sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist));
//     } else if (newSortType === 'album') {
//       sortedSongs.sort((a, b) => a.albumName.localeCompare(b.albumName));
//     } else if (newSortType === 'timestamp') {
//       sortedSongs.sort((a, b) => b.timestamp - a.timestamp);
//     }
//     setSortedLikedAlbums(sortedSongs);
//     setSortType(newSortType);
//   };

//   useEffect(() => {
//     const getLikedSongs = async () => {
//       const response = await fetch(
//         "http://localhost:8080/api/liked-songs/" + username,
//         {
//           method: "get",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const likedSongsData = await response.json();
//       setLikedSongs(likedSongsData);
//       console.log(likedSongsData);
//     };

//     getLikedSongs();
//   }, []);

//   const getSongs = async () => {
//     const response = await fetch("http://localhost:8080/api/liked-songs/", {
//       method: "get",
//       headers: { "Content-Type": "application/json" },
//     });
//     const likedSongsData  = await response.json();
//     setUserSongs(likedSongsData);
//     console.log(likedSongsData);
//   };
  
// // const sortSongsByArtist = () => {
// //   const sortedSongs = userSongs
// //     .slice()
// //     .sort((a, b) => {
// //       const artistA = (a.artist || "").toLowerCase();
// //       const artistB = (b.artist || "").toLowerCase();
// //       const album_nameA = (a.album_name || "").toLowerCase();
// //       const album_nameB = (b.album_name || "").toLowerCase();
// //       return album_nameA.localeCompare(album_nameB) || artistA.localeCompare(artistB);
// //     });
// //   setUserSongs(sortedSongs);
// // };
// // const sortSongsByAlbum = () => {
// //   const sortedSongs = userSongs
// //     .slice()
// //     .sort((a, b) => {
// //       const artistA = (a.artist || "").toLowerCase();
// //       const artistB = (b.artist || "").toLowerCase();
// //       const album_nameA = (a.album_name || "").toLowerCase();
// //       const album_nameB = (b.album_name || "").toLowerCase();
// //       return album_nameA.localeCompare(album_nameB) || artistA.localeCompare(artistB);
// //     });
// //   setUserSongs(sortedSongs);
// // };
// // // const sortSongsByTimestamp = () => {
// // //   const sortedSongs = userSongs
// // //     .slice()
// // //     .sort((a, b) => b.timestamp - a.timestamp);
// // //   setUserSongs(sortedSongs);
// // // };

// // const handleSortTypeChange = (newSortType) => {
// //   setSortType(newSortType);
// //   if (newSortType === 'artist') {
// //     sortSongsByArtist();
// //   } else if (newSortType === 'album') {
// //     sortSongsByAlbum();
// //   // } else if (newSortType === 'timestamp') {
// //   //   sortSongsByTimestamp();
// //   }
// // };

//   // const loadProfileImage = async () => {
//   //   const response = await fetch(
//   //     `http://localhost:8080/profileImage/${username}`
//   //   );
//   //   if (!response.ok) {
//   //     setImageSource(null);
//   //   } else {
//   //     console.log(response);
//   //     const imageBlob = await response.blob();
//   //     const imageObjectURL = URL.createObjectURL(imageBlob);
//   //     setImageSource(imageObjectURL);
//   //   }
//   // };

//   // useEffect(() => {
//   //   loadProfileImage();
//   // }, []);

// return (
//   <div>
//     <Navigation />
//     <br></br>
//     <br></br>
//     <br></br>
//     <h1> Liked Songs</h1>
//     <div>
//       <button onClick={() => handleSortTypeChange('artist')}>Sort by Artist</button>
//       <button onClick={() => handleSortTypeChange('album')}>Sort by Album</button>
//     </div>
//     <table>
//       <thead>
//         <tr>
//           <th>Artist</th>
//           <th>Album Name</th>
//         </tr>
//       </thead>
//       <tbody>
//         {likedSongs &&
//           likedSongs.map((song) => (
//             <tr key={song.id}>
//               <td>{song.artist}</td>
//               <td>{song.albumName}</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//     <br></br>
//   </div>
// );
// };


// export default LikedSongsPage;



// // import React, { useState, useEffect } from "react";

// // const LikedSongs = () => {
// //   const [likedSongs, setLikedSongs] = useState([]);
// //   const username = localStorage.getItem("username");

// //   useEffect(() => {
// //     fetchLikedSongs();
// //   }, []);

// //   const fetchLikedSongs = async () => {
// //     try {
// //       const response = await fetch(
// //         "http://localhost:8080/api/liked-songs/" + username
// //       );
// //       const data = await response.json();
// //       setLikedSongs(data);
// //     } catch (error) {
// //       console.error("Error fetching liked songs:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Liked Songs</h2>
// //       <ul>
// //         {likedSongs.map((song) => (
// //           <li key={song.id}>
// //             {/* Display information about the liked song */}
// //             {song.albumName} by {song.artist}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default LikedSongs;
