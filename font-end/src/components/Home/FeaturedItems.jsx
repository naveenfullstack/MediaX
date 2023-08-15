import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/FeaturedItems.scss";
import { Autoplay } from "swiper/modules";
import clients from "../../DemoDeta/FeaturedShows.json";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

export default function FeaturedItems() {
  const featuredMovies = clients.filter((movie) => movie.is_featured === true);
  const handleExternalLinkClick = (url) => {window.open(url, "_blank");};

  const generateRandomNumber = () => {
    const min = 80;
    const max = 100;
    return Math.floor(Math.random() * (max - min) + min);
  };
  const [randomNumbers] = useState(featuredMovies.map(() => generateRandomNumber()));

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
        {featuredMovies.map((index,slideIndex) => (
          <SwiperSlide key={index.id}>
            <div
              className="h-[30rem] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${index.banner_img})`,
              }}
            >
              <div className="w-full text-start px-20 bg-gradient-to-r from-black from-30% h-full flex items-center">
                <div className="space-y-default text-primary_text/[.60]">
                  <h1 className="text-start text-[3.5rem] text-primary_text font-title">
                    {index.name}
                  </h1>
                  <p className="max-w-[40rem]">{index.description}</p>
                  <div className="flex capitalize space-x-default items-center">
                    <div className="flex space-x-1 text-[#1AC855] items-center font-semibold">
                      <p id="match">{randomNumbers[slideIndex]}</p>
                      <p>%</p>
                      <p>match</p>
                    </div>
                    <p>{index.year}</p>
                    <p>2 seasons</p>
                    <p className="border px-4 border-white/[.30]">
                      4k ultra hd
                    </p>
                    <div className="flex border px-4 border-white/[.30] space-x-1 hover:cursor-pointer" onClick={() => handleExternalLinkClick(index.imdb_url)}>
                      <p>IMDB</p>
                      <p>:</p>
                      <p>{index.imdb}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-default">
                    <div className="flex items-center space-x-2 capitalize bg-white w-fit text-black p-2 px-6 rounded-lg font-semibold">
                      <FaPlay />
                      <p>play</p>
                    </div>
                    <div className="flex items-center space-x-2 capitalize bg-white w-fit text-black p-2 px-6 rounded-lg font-semibold">
                      <BsInfoCircle />
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
