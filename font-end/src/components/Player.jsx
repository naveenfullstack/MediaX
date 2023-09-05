import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Player() {
    // Access the 'videoId' parameter from the route
    const { videoId } = useParams();

    return (
        <div className="flex justify-center items-center h-screen">
            <ReactPlayer
                //url={`http://127.0.0.1:5500/${videoId}.mp4`}
                url={`https://static-api.naveenportfolio.site/${videoId}.mp4`}
                controls={true}
                width="100%"
                height="100%"
                playing={true} // Set playing to true to autoplay the video
            />
        </div>
    );
}
