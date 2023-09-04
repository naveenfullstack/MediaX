import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";

export default function Trailers({ Popular, allvideos }) {
  const [videosToShow, setVideosToShow] = useState(9);
  const [loading, setLoading] = useState(true);

  // Simulate loading delay for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, [videosToShow]);

  // Function to load more videos
  const loadMoreVideos = () => {
    setVideosToShow((prevCount) => prevCount + 9);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allvideos.slice(0, videosToShow).map((index) => (
          <div key={index.id} className="bg-black">
            {loading ? (
              <div className="animate-pulse bg-gray-300 rounded">
                <div className="h-[15rem] w-full"></div>{" "}
                {/* Adjust the height */}
              </div>
            ) : (
              <div className="md:h-[6rem] lg:h-[10rem] xxxl:h-[15rem] xxl:h-[15rem] xl:h-[15rem] lg:h-[15rem]">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${index.key}`}
                  width="100%"
                  height="100%"
                  config={{
                    youtube: {
                      playerVars: {
                        controls: 1, // Show player controls
                        modestbranding: 1, // Show minimal branding
                        fs: 1, // Enable fullscreen button
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {videosToShow < allvideos.length && (
          <div className="text-center mt-4">
            <div className="flex w-full justify-center pb-8">
              <div
                onClick={loadMoreVideos}
                className="flex items-center space-x-2 bg-white w-fit px-6 py-2 rounded-md text-black hover:bg-input_bg hover:text-white"
              >
                <FaPlay />
                <button className="font-medium">Load More</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
