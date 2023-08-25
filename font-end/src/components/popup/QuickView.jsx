import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import api from "../../Apis";
import { AiOutlineClose } from "react-icons/ai";

export default function QuickView({ Popular, onClose }) {
  const [loading, setLoading] = useState(true);
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

          // Set the iframe source to the YouTube trailer
          const iframe = iframeRef.current;
          if (iframe) {
            iframe.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`;
          }
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
        <div className="text-white capitalize">Loading...</div>
      ) : (
        // Show the iframe and content once data is loaded
        <div className="bg-white rounded-md text-black w-full max-w-[75%] h-[80%] overflow-y-auto scrollbar-dark">
          <div className="w-full flex justify-end">
            <div onClick={onClose} className="fixed p-4 bg-input_bg rounded-lg">
              <AiOutlineClose className="text-white" />
            </div>
          </div>
          {/* Add a fixed height (e.g., h-[70vh]) and make it scrollable with overflow-y-auto */}
          <iframe
            src=""
            ref={iframeRef}
            width="100%"
            height="400px"
            title="video"
            allow="autoplay"
          ></iframe>
          <div
            className="lg:h-[30rem] md:h-[25rem] sm:h-[20rem] w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${Popular.backdrop_path})`,
            }}
          >
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
                      80
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
              </div>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={toggleFullscreen}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Fullscreen
            </button>
            <h1 className="text-2xl font-semibold mb-2">
              {Popular.original_title}
            </h1>
            {/* Add more data fields you want to display in the popup */}
            <p>Release Year: {new Date(Popular.release_date).getFullYear()}</p>
            <p>{Popular.id}</p>
            {/* Add more data fields here */}
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Close
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
