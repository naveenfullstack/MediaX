import React, {useState} from "react";
import ReactPlayer from "react-player";

export default function Player() {

    const [playing, setPlaying] = useState(true);

  return (
    <div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=j2iL9JBSCo4`}
        width="100%"
        height="100%"
        playing={playing}
        onEnded={() => setPlaying(true)}
        config={{
            youtube: {
              playerVars: {
                controls: 1, // Show player controls
                modestbranding: 1, // Show minimal branding
                fs: 1, // Enable fullscreen button
              },
            },
          }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
