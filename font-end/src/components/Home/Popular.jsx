import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/FeaturedItems.scss";
import { Autoplay } from "swiper/modules";
import api from "../../Apis";

export default function Popular() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
//  const PickRandom1stSlider = Math.floor(Math.random() * clients.length);

  useEffect(() => {
    axios
      .get(api.Popular, {
        headers: {
          Authorization: `Bearer ${api.Bearer}`,
        },
      })
      .then((response) => {
        setClients(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-full space-y-default">
          <h1 className="capitalize font-semibold lg:text-[1.5rem] px-20">
            popular on MediaX
          </h1>
          <div className="w-full lg:pl-20 sm:px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="shadow-md animate-pulse">
                <div className="bg-input_bg h-[13rem]"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="pl-20 space-y-default">
          <h1 className="capitalize font-semibold lg:text-[1.5rem]">
            popular on MediaX
          </h1>
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {clients.map((index) => (
              <SwiperSlide key={index.id}>
                <div
                  className="lg:h-[13rem] md:h-[25rem] sm:h-[20rem] w-full bg-cover bg-bottom"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.poster_path})`,
                  }}
                >
                  <div className="w-full text-start lg:px-20 md:px-20 sm:px-6 h-full flex items-center"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
