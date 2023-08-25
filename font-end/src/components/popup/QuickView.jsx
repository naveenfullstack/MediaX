import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import api from "../../Apis";
import { AiOutlineClose } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

export default function QuickView({ Popular, onClose }) {
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState(null);
  const [playing, setPlaying] = useState(true);
  const iframeRef = useRef(null);

  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    axios
      .get(`${api.Domain}/getmovies/videos/${Popular.id}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        const trailers = response.data.filter(
          (video) => video.type === "Trailer"
        );
        // Check if there are trailers available
        if (trailers.length > 0) {
          // Get the key of the first trailer
          const trailerKey = trailers[0].key;
          setVideoId(trailerKey); // Set the videoId state with the YouTube video key
        } else {
          console.log("No trailers available.");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, [Popular.id]);

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    const iframe = iframeRef.current;

    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else {
        // If fullscreen is not supported, set a default YouTube URL
        iframe.src =
          "https://www.youtube.com/embed/_inIyoPsx-g?si=pLT_E8fZU5pAsMZY";
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/[60%] w-full h-full">
      {loading ? (
        // Show preloader while loading
        <div className="text-white capitalize">
          <div className="w-full flex justify-end">
            <div
              onClick={onClose}
              className="fixed top-0 right-0 p-4 bg-input_bg rounded-lg"
            >
              <AiOutlineClose className="text-white" />
            </div>
          </div>
          Loading...
        </div>
      ) : (
        // Show the content with a background video once data is loaded
        <div className="relative bg-black text-white rounded-md text-black w-full max-w-[80%] h-[80%] overflow-y-auto scrollbar-dark">
          <div className="w-full flex justify-end">
            <div
              onClick={onClose}
              className="fixed p-4 py-0 bg-input_bg rounded-lg"
            >
              <AiOutlineClose className="text-white" />
            </div>
          </div>

          {/* Banner Background Video */}
          <div className="relative h-[600px] overflow-x-hidden">
            {videoId && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                playing={playing}
                width="100%"
                height="100%"
                onEnded={() => setPlaying(true)}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                    },
                  },
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 220,
                  width: "100%",
                  height: "100%",
                }}
              />
            )}

            {/* Banner Content */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full flex justify-end">
                <div
                  onClick={onClose}
                  className="fixed p-4 hover:cursor-pointer rounded-lg"
                >
                  <AiOutlineClose className="text-white" />
                </div>
              </div>
              <div className="w-full text-start lg:px-20 md:px-20 sm:px-6 bg-gradient-to-r from-black from-30% h-full flex items-center">
                <div className="space-y-default text-primary_text/[.60]">
                  <h1 className="text-start lg:text-[3.5rem] md:text-[2.5rem] sm:text-[1.5rem] text-primary_text font-title">
                    {Popular.original_title}
                  </h1>
                  <p className="max-w-[40rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                    {Popular.overview}
                  </p>
                  <div className="flex capitalize space-x-default items-center">
                    <div className="flex space-x-1 text-[#1AC855] items-center font-semibold">
                      <p id="match sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                        65
                      </p>
                      <p>%</p>
                      <p>match</p>
                    </div>
                    <p className="sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                      {new Date(Popular.release_date).getFullYear()}
                    </p>
                    {/* <p>2 seasons</p> */}
                    <p className="border px-4 border-white/[.30] sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem] sm:hidden md:block lg:block">
                      4k ultra hd
                    </p>
                    <div
                      className="flex border px-4 border-white/[.30] space-x-1 hover:cursor-pointer sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]"
                      onClick={() =>
                        handleExternalLinkClick(
                          `https://www.imdb.com/find/?q=${Popular.original_title}&ref_=nv_sr_sm`
                        )
                      }
                    >
                      <p>IMDB</p>
                      <p>:</p>
                      <p>{Popular.vote_average}</p>
                    </div>
                  </div>
                  <div className="flex space-x-default">
                    <div className="flex items-center space-x-2 bg-primary w-fit px-6 py-2 rounded-md text-white ">
                      <FaPlay />
                      <button>Play</button>
                    </div>

                    <div className="flex items-center space-x-2 w-fit px-6 pl-4 py-2 rounded-md text-white border-default border-white/[.60] hover:bg-input_bg hover:border-transparent">
                      <MdAdd className="text-[1.5rem]" />
                      <button className="capitalize">my list</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of your content */}
          <div className="p-4">
            <button
              onClick={toggleFullscreen}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Fullscreen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

QuickView.propTypes = {
  Popular: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
