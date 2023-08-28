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
        <div className="flex w-full space-x-4">
          <div className="w-9/12 animate-pulse space-y-2">
            <div className="bg-input_bg h-[1rem] rounded-lg"></div>
            <div className="bg-input_bg h-[1rem] rounded-lg w-full max-w-[800px]"></div>
            <div className="bg-input_bg h-[1rem] rounded-lg w-full max-w-[700px]"></div>
          </div>
          <div className="w-3/12">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex animate-pulse w-full space-x-4">
                <div className="bg-input_bg h-[4rem] w-[4rem] rounded-full mb-2"></div>
                <div className="bg-input_bg h-[1rem] max-w-[15rem] w-full rounded-full"></div>
              </div>
            ))}
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
                  {index.profile_path ? (
                    <div
                      className="w-[4rem] h-[4rem] bg-cover rounded-full"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.profile_path})`,
                      }}
                    ></div>
                  ) : (
                    <div
                      className="w-[4rem] h-[4rem] bg-gray-300 bg-cover rounded-full"
                      style={{
                        backgroundImage: `url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.yandex.by%2Fimages%2Ftouch%2Fsearch%3Flr%3D21416%26nomisspell%3D1%26text%3D%25D1%2581%25D1%2582%25D0%25B0%25D0%25BD%25D0%25B4%25D0%25B0%25D1%2580%25D1%2582%25D0%25BD%25D1%258B%25D0%25B9%2520%25D0%25B0%25D0%25B2%25D0%25B0%25D1%2582%25D0%25B0%25D1%2580%2520%25D1%2581%2520%25D1%2584%25D0%25B8%25D0%25BB%25D1%258C%25D1%2582%25D1%2580%25D0%25B0%25D0%25BC%25D0%25B8%2520%25D0%25B8%25D0%25B8%25D0%25BC%25D0%25B0%25D0%25BE%25D1%2587%25D0%25BA%25D0%25B0%25D0%25BC%25D0%25B8%26source%3Drelated-query-serp&psig=AOvVaw2ACywNNWpMghEx6y6laRZl&ust=1693270334626000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLC629mR_oADFQAAAAAdAAAAABAY')`,
                      }}
                    ></div>
                  )}
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
