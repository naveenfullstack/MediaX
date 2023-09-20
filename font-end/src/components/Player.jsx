import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Header from "./Header";

export default function Player() {
  // Access the 'videoId' parameter from the route
  const { videoId } = useParams();

  return (
    <div>
      <div className="fixed bg-black w-full">
        <Header />
      </div>
      <div className="flex justify-center items-center h-screen">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls={true}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
              },
            },
          }}
          playing={true}
        />
      </div>
    </div>
  );
}
