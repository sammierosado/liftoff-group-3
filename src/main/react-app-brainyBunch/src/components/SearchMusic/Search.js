import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../../css/searchPage.css";
import Artist from "./Artist";
import Album from "./Album";
import Track from "./Track";

const Search = () => {
  const [enteredQuery, setEnteredQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchData, setSearchData] = useState();
  const [albumsData, setAlbumsData] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [tracksData, setTracksData] = useState([]);
  const [collectionValues, setCollectionValues] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");

  const searchTypeJson = {
    "": "Select Type",
    album: "Album",
    artist: "Artist",
    track: "Track",
  };
  const username = localStorage.getItem("username");
  const searchTypeOptions = Object.keys(searchTypeJson).map((key) => {
    return (
      <option key={key} value={searchTypeJson[key]}>
        {searchTypeJson[key]}
      </option>
    );
  });

  const albums = albumsData.map((album) => <Album album={album} />);

  const artists = artistsData.map((artist) => <Artist artist={artist} />);

  const tracks = tracksData.map((track) => <Track track={track} />);

  const search = async () => {
    setIsSubmitting(true);

    const username = localStorage.getItem("user");

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get(
        `http://localhost:8080/spotify/search?query=${enteredQuery}&type=${selectedType}`,
        { headers }
      )
      .then((res) => {
        setSearchData(res.data);
        setAlbumsData(res.data.albums);
        setArtistsData(res.data.artists);
        setTracksData(res.data.tracks);
        setErrorMessage("");
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setSearchData({});
        setErrorMessage(err.response.data.message);
        setIsSubmitting(false);
      });
  };

  const queryChangeHandler = (event) => {
    setEnteredQuery(event.target.value);

    setFormIsValid(event.target.value.trim().length > 2);
  };

  const typeChangeHandler = (event) => {
    setSelectedType(event.target.value);

    setFormIsValid(enteredQuery.trim().length > 2);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    search();
    setFormIsValid(false);
  };

  useEffect(() => {
    const collectionValues = async () => {
      const response = await fetch(
        "http://localhost:8080/collections/" + username,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const collectionData = await response.json();
      setCollectionValues(collectionData);
      console.log(collectionData);
    };
    collectionValues();
  }, []);

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  const handleAddToCollection = async (selectedAlbum) => {
    const requestBody = {
      username: username,
      albumName: selectedAlbum.name,
      artist: selectedAlbum.artists[0].name,
      collectionName: selectedCollection || collectionValues[0].collectionName,
    };
    const response = await fetch("http://localhost:8080/api/song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
  };

  return (
    <div className="search">
      <div className="userProfile-nav">{/* <Navigation /> */}</div>
      {errorMessage && <p className="error,errorMessage"></p>}

      <form onSubmit={submitHandler}>
        <div className="control w70 floatLeft">
          <input
            type="text"
            id="search"
            placeholder="Search query here"
            value={enteredQuery}
            onChange={queryChangeHandler}
          />
        </div>
        <div className="control w25">
          <select
            name="type"
            id="type"
            onChange={typeChangeHandler}
            value={selectedType}
          >
            {searchTypeOptions}
          </select>
        </div>
        <div className="actions">
          <button type="submit" className="btn" disabled={!formIsValid}>
            {isSubmitting ? "Submitting..." : "Search"}
          </button>
          <Link to="/" className="cancel">
            Cancel
          </Link>
        </div>
      </form>

      {searchData && (
        <div className="marTop30 search-result">
          <hr />
          <div>
           {albums.map((album) => (
              //  {albums}
              // {artists}
              // {tracks}

              <form key={album.id}>
              {album}
                <label htmlFor="addtoCollection">Add to Collection: </label>
                <select
                  name="collections"
                  id="collections"
                  onChange={handleCollectionChange}
                >
                  {collectionValues.length > 0 &&
                    collectionValues.map((value) => (
                      <option key={value.id}>{value.collectionName}</option>
                    ))}
                  {collectionValues.length === 0 && (
                    <option>No collection found</option>
                  )}
                </select>
                <br />
                <input
                  type="button"
                  value="Submit"
                  onClick={() => handleAddToCollection(albums)}
                />
              </form>
            ))}
          </div>
          <br></br>
        </div>
      )}
    </div>
  );
};

export default Search;
