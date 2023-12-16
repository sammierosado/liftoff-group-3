import React from "react";
import { useEffect, useState } from "react";
import "../css/randomPage.css";

const CLIENT_ID = "2c8d20f72c914fe79dfd499fb8f9644e";
const CLIENT_SECRET = "9ba9d68e457a43aea82a41d0114e9aa8";

function RandomMusicPage() {
  const [accessToken, setAcessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // API Acess Token
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
      .then((data) => setAcessToken(data.access_token));
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
      .then((data) => setAlbums(data.albums.items));
  }

  return (
    <div className="RandomMusicPage">
      <div>
        <button className="RandomButton" type="button" onClick={search}>
          Search for popular new albums!
        </button>
      </div>
      <div>
        {albums.map((album, i) => {
          return (
            <div className="RandomCard" key={i}>
              <img src={album.images[0].url} alt="alt text" />
              <div className="container">
                <h4>
                  <b>{album.name}</b>
                </h4>
                <p>{album.artists[0].name}</p>
                <button
                  className="CollectionButton"
                  type="button"
                  onClick={() => console.log("clicked!")}
                >
                  Add to collection
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RandomMusicPage;
