import React from "react";
import { useReducer, useEffect, useState } from "react";
import loadingIcon from "../../Icons/loading.gif";
import "./Home.css";
import axios from "axios";
import Search from "../../Icons/search.svg";

const initialState = {
  songs: [],
  isFetching: false,
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SONGS":
      return {
        ...state,
        isFetching: true,
        isError: false,
      };
    case "FETCH_SONGS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isError: false,
        songs: action.payload,
      };
    case "FETCH_SONGS_FAIL":
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    default:
      return state;
  }
};

const Home = () => {
  const [imageList, setImageList] = useState([]);

  let userToken;

  const [state, dispatch] = useReducer(reducer, initialState);

  const [search, setSearch] = useState("");

  const searchItem = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };
  const userSearch = state.songs.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.artist.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleApiCall = async() => {
    let image = await axios.get("https://picsum.photos/v2/list");
    setImageList(image.data);
    await axios
      .get("https://hookedbe.herokuapp.com/api/songs", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "FETCH_SONGS_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_SONGS_FAIL",
        });
      });
  }

  useEffect(() => {
    userToken = localStorage.getItem("token");
    userToken = JSON.parse(userToken);

    dispatch({
      type: "FETCH_SONGS",
    });

    handleApiCall()

  }, []);

  return (
    <div>
      <div className="search-wrapper">
        <input
          className="search-input"
          type="search"
          placeholder="Search Item"
          value={search}
          onChange={searchItem}
        />
        <img src={Search} alt="search" />
      </div>

      {state.isFetching ? (
        <img className="loading-icon" src={loadingIcon} alt="loading" />
      ) : (
        <div className="home-wrapper">
          {userSearch.map((song, id) => {
            return (
              <div className="image-wrapper" key={song.id}>
                <img
                  className="song-cover"
                  src={imageList[id].download_url}
                  alt="song-cover"
                />
                <h5 className="song-artist">
                  Artist: <span className="artist">{song.artist}</span>
                </h5>
                <p className="song-artist">
                  Album Name: <span className="artist">{song.name}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}
      {state.isError ? (
        <p className="error">Error occured while displaying songs</p>
      ) : null}
    </div>
  );
};

export default Home;
