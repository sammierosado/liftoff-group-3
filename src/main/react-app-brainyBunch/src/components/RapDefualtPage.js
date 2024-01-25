import React, { useEffect, useState } from "react";
import "../css/defaultPage.css";

const CLIENT_ID = "2c8d20f72c914fe79dfd499fb8f9644e";
const CLIENT_SECRET = "9ba9d68e457a43aea82a41d0114e9aa8";

function RapDefaultPage() {
  const [accessToken, setAccessToken] = useState("");
  const [genreAlbums, setGenreAlbums] = useState([]);

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

  async function searchGenre() {
    var newAlbumsGenre = await fetch(
      'https://api.spotify.com/v1/search?type=track&q=genre:"rap"&limit=50',
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setGenreAlbums(data.tracks.items));
  }

  return (
    <div className="RandomMusicPage">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <button className="RandomButton" type="button" onClick={searchGenre}>
          Display Rap Songs!
        </button>
      </div>
      <div>
        {genreAlbums.map((track, i) => {
          return (
            <div className="RandomCard" key={i}>
              <img
                src={track.album.images[0].url}
                alt="alt text"
                className="RandomImg"
              />
              <div className="Container">
                <h4>
                  <b>{track.name}</b>
                </h4>
                <p>{track.artists[0].name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RapDefaultPage;
