//import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/FeaturedItems.scss";
import { Autoplay } from "swiper/modules";
import clients from "../../DemoDeta/FeaturedShows.json";
import { FaPlay } from "react-icons/fa";

export default function FeaturedItems() {
  const featuredMovies = clients.filter((movie) => movie.is_featured === true);

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {featuredMovies.map((index) => (
          <SwiperSlide key={index.id}>
            <div
              className="h-[30rem] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${index.banner_img})`,
              }}
            >
              <div className="w-full text-start px-20 bg-gradient-to-r from-black from-30% h-full flex items-center">
                <div className="space-y-default">
                  <h1 className="text-start">{index.name}</h1>
                  <p className="max-w-[40rem] opacity-default">{index.description}</p>
                  <div className="flex items-center space-x-default">
                    <div className="flex items-center space-x-2 capitalize bg-white w-fit text-black p-2 px-6 rounded-lg font-semibold">
                      <FaPlay/>
                      <p>play</p>
                    </div>
                    <div className="flex items-center space-x-2 capitalize bg-white w-fit text-black p-2 px-6 rounded-lg font-semibold">
                      <FaPlay/>
                      <p>more info</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
