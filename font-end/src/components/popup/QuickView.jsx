import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function QuickView({ Popular, onClose }) {
  const [popularTrailer, setPopularTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/1070514/videos?query=Jack+Reacher&api_key=f5baf8c74c7d5f00a242c165979d0913`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain",
          },
        }
      )
      .then((response) => {
        setPopularTrailer(response.data.results);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/[60%] w-full">
      <div className="bg-white p-4 rounded-md text-black w-full max-w-[50rem]">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${Popular.key}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
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
