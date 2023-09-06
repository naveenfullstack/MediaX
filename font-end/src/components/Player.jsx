import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Player() {
    // Access the 'videoId' parameter from the route
    const { videoId } = useParams();

    return (
        <div className="flex justify-center items-center h-screen">
            <ReactPlayer
                //url={`https://mega.nz/file/Yzsi1L4a#Pp9DrK-XNj6JEPY42KnexKVf0CobfSJSrCiVgnsWm6U`}
                url={`https://static-api.naveenportfolio.site/${videoId}.mp4`}
                controls={true}
                width="100%"
                height="100%"
                playing={true} // Set playing to true to autoplay the video
            />
        </div>
    );
}
