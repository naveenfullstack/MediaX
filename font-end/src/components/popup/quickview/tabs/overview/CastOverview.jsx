import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../css/overview.css";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import api from "../../../../../Apis";

export default function CastOverview({ Popular }) {
  const swiperRef = useRef(null);

  const [cast, setCast] = useState([]);
  const [castloading, setCastloading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api.Domain}/cast/${Popular.id}`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        setCast(response.data.results);
        // setLoading(false);
        console.log(response);
        setCastloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCastloading(true);
      });
  }, [Popular.id]);

  return (
    <div>
      {castloading ? (
        <div className="w-full space-x-4 space-y-default">
          <h1 className="text-title capitalize font-medium">Top Billed Cast</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse w-full space-x-4">
                <div className="bg-input_bg h-[14rem] w-[10rem] mb-2 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-black">
          <div className="space-y-default">
            <h1 className="text-title capitalize font-medium">
              Top Billed Cast
            </h1>
            <div>
              <Swiper
                ref={swiperRef}
                slidesPerView={8}
                spaceBetween={12}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
              >
                {cast.filter((index) => index.profile_path) // Filter out cast with no image
                  .slice(0, 30)
                  .map((index) => (
                    <SwiperSlide key={index.key}>
                      <div className="flex flex-col rounded-lg pb-2">
                        <img
                          className="rounded-lg"
                          src={`https://image.tmdb.org/t/p/original/${index.profile_path}`}
                          alt=""
                        />
                        <h1 className="text-left px-2 pt-2 text-paragraph">
                          {index.name}
                        </h1>
                        <h1 className="text-left px-2 text-paragraph text-white/[.60]">
                          {index.character}
                        </h1>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div>
                    123
                  </div>
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
