import React from "react";

function LikedSongsPage({ likedAlbums }) {
  return (
    <div>
      <h2>Liked Songs</h2>
      <ul>
        {likedAlbums && likedAlbums.length > 0 ? (
          likedAlbums.map((likedAlbum, i) => (
            <li key={i}>{likedAlbum.name}</li>
          ))
        ) : (
          <p>No liked songs yet.</p>
        )}
      </ul>
    </div>
  );
}


export default LikedSongsPage;

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



