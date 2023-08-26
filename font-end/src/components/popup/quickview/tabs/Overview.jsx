import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Overview({ Popular }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${Popular.id}/credits?api_key=922f2e7560f506fe1b6689418dd8260c&language=en-US`
      )
      .then((response) => {
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
      <div className="w-3/12 overflow-auto h-[500px] scrollbar-">
        {cast.map((index) => (
          <div key={index.id}>
            <div className="flex mb-4 items-center space-x-2">
              <div
                className="w-[4rem] h-[4rem] bg-cover rounded-full"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.profile_path})`,
                }}
              ></div>
              <div>
                <h1 className="text-[1.2rem] font-mudium">{index.name}</h1>
                <p className="text-[#FFFFFF]/[.70]">{index.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
