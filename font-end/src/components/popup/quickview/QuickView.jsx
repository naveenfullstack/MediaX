import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import api from "../../../Apis";
import { AiOutlineClose } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { PiSpeakerSimpleSlash, PiSpeakerHigh } from "react-icons/pi";
import ReactPlayer from "react-player";
import Overview from "./tabs/Overview";

export default function QuickView({ Popular, onClose }) {
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [muted, setMuted] = useState(false);

  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  useEffect(() => {
    axios
      .get(`${api.Domain}/getmovies/videos/${Popular.id}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      // .get(
      //   `https://api.themoviedb.org/3/movie/${Popular.id}/videos?api_key=922f2e7560f506fe1b6689418dd8260c&language=en-US`,
      //   {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*", // Replace '*' with your API's actual allowed origin
      //       "Content-Type": "application/json",
      //     },
      //   }
      // )
      .then((response) => {
        console.log(response);
        const trailers = response.data.filter(
          (video) => video.type === "Trailer"
        );
        // Check if there are trailers available
        if (trailers.length > 0) {
          const trailerKey = trailers[0].key;
          setVideoId(trailerKey);
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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "episodes", label: "Episodes" },
    { id: "trailer", label: "Trailers & More" },
    { id: "Cast", label: "Cast" },
  ];

  const tabButtonClasses = "px-4 py-2 rounded-lg focus:outline-none";
  const activeTabButtonClasses =
    "text-white font-medium underline underline-offset-8 decoration-2 decoration-primary";
  const inactiveTabButtonClasses = "text-white hover:cursor-pointer";

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
          {/* Banner Background Video */}
          <div className="relative h-[600px] overflow-x-hidden">
            {videoId && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                playing={playing}
                muted={muted} // Muted prop based on state
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
                        87
                      </p>
                      <p>%</p>
                      <p>match</p>
                    </div>
                    <p className="sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                      {new Date(Popular.release_date).getFullYear()}
                    </p>
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
                    <div className="flex items-center space-x-2 bg-white w-fit px-6 py-2 rounded-md text-black hover:bg-input_bg hover:text-white">
                      <FaPlay />
                      <button className="font-medium">Play</button>
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

          <div
            className="absolute right-0 top-[75%] m-4 flex items-center space-x-2 cursor-pointer"
            onClick={toggleMute}
          >
            {muted ? (
              <div className="p-3 bg-input_bg rounded-full">
                <PiSpeakerHigh className="text-[1.3rem]" />
              </div>
            ) : (
              <div className="p-3 bg-input_bg rounded-full">
                <PiSpeakerSimpleSlash className="text-[1.3rem]" />
              </div>
            )}
          </div>

          <div className="flex justify-center w-full mt-4">
            <div className="w-full">
              <div className="flex space-x-4 justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${tabButtonClasses} ${
                      activeTab === tab.id
                        ? activeTabButtonClasses
                        : inactiveTabButtonClasses
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 px-20">
                {activeTab === "overview" && (
                  <div>
                    <Overview Popular={Popular} />
                  </div>
                )}
                {activeTab === "episodes" && (
                  <div>
                    <h2 className="text-xl font-semibold">Episodes</h2>
                    <p>This is the episodes content.</p>
                  </div>
                )}
                {activeTab === "details" && (
                  <div>
                    <h2 className="text-xl font-semibold">Details</h2>
                    <p>This is the details content.</p>
                  </div>
                )}
              </div>
            </div>
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
