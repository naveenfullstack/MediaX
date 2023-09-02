import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../css/overview.css";
import { Navigation } from "swiper/modules";
import ReactPlayer from "react-player";
import CastOverview from "./CastOverview";

export default function Overview({ Popular, allvideos, loading }) {
  const swiperRef = useRef(null);

  return (
    <div>
      {loading ? (
        <div className="flex w-full space-x-4">
          <div className="w-9/12 animate-pulse space-y-2">
            <div className="bg-input_bg h-[1rem] rounded-lg"></div>
            <div className="bg-input_bg h-[1rem] rounded-lg w-full max-w-[800px]"></div>
            <div className="bg-input_bg h-[1rem] rounded-lg w-full max-w-[700px]"></div>
          </div>
          <div className="w-3/12">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex animate-pulse w-full space-x-4">
                <div className="bg-input_bg h-[4rem] w-[4rem] rounded-full mb-2"></div>
                <div className="bg-input_bg h-[1rem] max-w-[15rem] w-full rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-black">
          <div>
            <CastOverview Popular={Popular}/>
          </div>

          <div className="bg-black space-y-default">
            <h1 className="text-title capitalize font-medium">
              {" "}
              videos & Trailers
            </h1>
            <Swiper
              ref={swiperRef}
              slidesPerView={3}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {allvideos.slice(0, 5).map((index) => (
                <SwiperSlide key={index.key} className="bg-black">
                  <div className="bg-black ">
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${index.key}`}
                      className="bg-black"
                      width={440}
                      height={250}
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <h1>{Popular.title}</h1>
        </div>
      )}
    </div>
  );
}
