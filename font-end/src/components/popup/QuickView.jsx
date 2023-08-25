import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import api from "../../Apis";

export default function QuickView({ Popular, onClose }) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9001/getmovies/videos/${Popular.id}`, {
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
            iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
          }
        } else {
          // Handle the case when there are no trailers
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
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/[60%] w-full">
      <div className="bg-white p-4 rounded-md text-black w-full max-w-[50rem]">
        <iframe
          src=""
          ref={iframeRef}
          width="100%"
          height="400px"
          title="video"
        ></iframe>
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
  );
}

QuickView.propTypes = {
  Popular: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
