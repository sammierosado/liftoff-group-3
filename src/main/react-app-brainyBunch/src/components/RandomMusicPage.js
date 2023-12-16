// RandomMusicPage.js
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import LikedSongsPage from "./LikedSongsPage";
import "../css/randomPage.css";

const CLIENT_ID = "2c8d20f72c914fe79dfd499fb8f9644e";
const CLIENT_SECRET = "9ba9d68e457a43aea82a41d0114e9aa8";

function RandomMusicPage() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);

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

  const handleLike = (index) => {
    const updatedAlbums = [...albums];
    updatedAlbums[index].liked = !updatedAlbums[index].liked;
    setAlbums(updatedAlbums);

    if (updatedAlbums[index].liked) {
      setLikedAlbums([...likedAlbums, updatedAlbums[index]]);
    } else {
      const filteredLikedAlbums = likedAlbums.filter(
        (album) => album.id !== updatedAlbums[index].id
      );
      setLikedAlbums(filteredLikedAlbums);
    }
  };

  return (
    <div className="RandomMusicPage">
      <div>
        <button className="RandomButton" type="button" onClick={search}>
          Search for popular new albums!
        </button>
      </div>
      <div>
        {albums.map((album, i) => (
          <div className="RandomCard" key={i}>
            <img src={album.images[0].url} alt="alt text" />
            <div className="container">
              <h4>
                <b>{album.name}</b>
              </h4>
              <p>{album.artists[0].name}</p>
              <button onClick={() => handleLike(i)}>
                {album.liked ? "Unlike" : "Like"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* <Link to="/likedsongs">Go to Liked Songs</Link> */}
      </div>
      <Routes>
        <Route
          path="/likedsongs"
          element={<LikedSongsPage likedAlbums={likedAlbums} />}
        />
      </Routes>
    </div>
  );
}

export default RandomMusicPage;



// import { useEffect, useState } from "react";
// import "../css/randomPage.css";

// const CLIENT_ID = "2c8d20f72c914fe79dfd499fb8f9644e";
// const CLIENT_SECRET = "9ba9d68e457a43aea82a41d0114e9aa8";

// function RandomMusicPage() {
//   const [accessToken, setAcessToken] = useState("");
//   const [albums, setAlbums] = useState([]);

//   useEffect(() => {
//     // API Acess Token
//     var authParameters = {
//       method: "POST",
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//       },
//       body:
//         "grant_type=client_credentials&client_id=" +
//         CLIENT_ID +
//         "&client_secret=" +
//         CLIENT_SECRET,
//     };
//     fetch("https://accounts.spotify.com/api/token", authParameters)
//       .then((result) => result.json())
//       .then((data) => setAcessToken(data.access_token));
//   }, []);

//   async function search() {
//     var newAlbums = await fetch(
//       "https://api.spotify.com/v1/browse/new-releases",
//       {
//         headers: {
//           Authorization: "Bearer " + accessToken,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => setAlbums(data.albums.items));
//   }

//   return (
//     <div className="RandomMusicPage">
//       <div>
//         <button className="RandomButton" type="button" onClick={search}>
//           Search for popular new albums!
//         </button>
//       </div>
//       <div>
//         {albums.map((album, i) => {
//           return (
//             <div className="RandomCard" key={i}>
//               <img src={album.images[0].url} alt="alt text" />
//               <div className="container">
//                 <h4>
//                   <b>{album.name}</b>
//                 </h4>
//                 <p>{album.artists[0].name}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RandomMusicPage;
