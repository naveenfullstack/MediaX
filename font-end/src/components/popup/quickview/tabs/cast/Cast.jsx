import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../../Apis";

export default function CastOverview({ Popular }) {
  const [cast, setCast] = useState([]);
  const [castloading, setCastLoading] = useState(true);
  const [visibleCastCount, setVisibleCastCount] = useState(16); // Number of cast members initially visible
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    axios
      .get(`${api.Domain}/cast/${Popular.id}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        setCast(response.data.results);
        setCastLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCastLoading(true);
      });
  }, [Popular.id]);

  const loadMoreCast = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCastCount(visibleCastCount + 16);
      setIsLoadingMore(false);
    }, 1000); 
  };

  return (
    <div>
      {castloading ? (
        <div className="w-full space-x-4 space-y-default">
          <h1 className="text-title capitalize font-medium">Top Billed Cast</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse w-full space-x-4">
                <div className="bg-input_bg h-[14rem] w-[10rem] mb-2 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-black">
          <div className="space-y-default">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxxl:grid-cols-8 xxl:grid-cols-6 xl:grid-cols-6 gap-4">
              {cast
                .filter((index) => index.profile_path) // Filter out cast with no image
                .slice(0, visibleCastCount) // Display only the first 'visibleCastCount' cast members
                .map((index) => (
                  <div key={index.key}>
                    <div className="flex flex-col rounded-lg pb-2">
                      <img
                        className="rounded-lg"
                        src={`https://image.tmdb.org/t/p/original/${index.profile_path}`}
                        alt=""
                      />
                      <h1 className="text-left px-2 pt-2 text-paragraph">
                        {index.name}
                      </h1>
                      <h1 className="text-left px-2 text-paragraph text-white/[.60]">
                        {index.character}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
            {visibleCastCount < cast.length && (
              <div className="text-center pb-8">
                <button
                  onClick={loadMoreCast}
                  className="bg-white w-fit px-6 py-2 rounded-md text-black font-medium hover:bg-input_bg hover:text-white"
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
