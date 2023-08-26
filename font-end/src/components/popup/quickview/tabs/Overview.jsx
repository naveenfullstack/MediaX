import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Overview({ Popular }) {
  const [overviewdata, setOverviewData] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${Popular.id}/credits?api_key=922f2e7560f506fe1b6689418dd8260c&language=en-US`
      )
      .then((response) => {
        setOverviewData(response.data);
        setCast(response.data.cast);
        // setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        //setLoading(true);
      });
  }, [Popular.id]);

  return (
    <div className="flex w-full">
      <div className="w-9/12">
        <h1>{Popular.overview}</h1>
      </div>
      <div className="w-3/12">
        {cast.map((index) => (
          <div key={index.id}>
            <div>
              <img src={`https://image.tmdb.org/t/p/original/${index.profile_path}`}></img>
              <img src={`https://image.tmdb.org/t/p/original/${index.profile_path}`}></img>
            </div>
            <h1>{index.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
