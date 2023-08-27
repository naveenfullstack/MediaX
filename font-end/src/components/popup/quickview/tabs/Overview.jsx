import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Overview({ Popular }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${Popular.id}/credits?api_key=922f2e7560f506fe1b6689418dd8260c&language=en-US`
      )
      .then((response) => {
        setCast(response.data.cast);
        // setLoading(false);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, [Popular.id]);

  return (
    <div>
      {loading ? (
        <div className="w-full">
          <div className="w-full space-y-default sm:hidden md:hidden lg:block">
            <h1 className="capitalize font-semibold lg:text-[1.5rem] px-item_lg_left">
              popular on MediaX
            </h1>
            <div className="w-full lg:pl-item_lg_left md:pl-item_md_left sm:px-item_sm_left grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="shadow-md animate-pulse">
                  <div className="bg-input_bg h-[13rem]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
