import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/FeaturedItems.scss";
import { Autoplay } from "swiper/modules";
import api from "../../Apis";
// import { FaPlay } from "react-icons/fa";
// import { BsInfoCircle } from "react-icons/bs";

export default function FeaturedItems() {

  const [clients, setClients] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleExternalLinkClick = (url) => {window.open(url, "_blank");};
  const PickRandom1stSlider = Math.floor(Math.random() * clients.length);
  const generateRandomNumber = () => {
    const min = 80;
    const max = 100;
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    axios
      .get(api.Popular, {
        // headers: {
        //   Authorization: `Bearer ${api.Bearer}`,
        // },
      })
      .then((response) => {
        setClients(response.data.results);
        setRandomNumbers(
          response.data.results.map(() => generateRandomNumber())
        );
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
        <div className="w-full">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="p-6 lg:h-[30rem] md:h-[25rem] sm:h-[20rem] bg-input_bg shadow-md animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 50000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          initialSlide={PickRandom1stSlider}
          className="mySwiper"
        >
          {clients.map((index, slideIndex) => (
            <SwiperSlide key={index.id}>
              <div
                className="lg:h-[30rem] md:h-[25rem] sm:h-[20rem] w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.backdrop_path})`,
                }}
              >
                <div className="w-full text-start lg:px-20 md:px-20 sm:px-6 bg-gradient-to-r from-black from-30% h-full flex items-center">
                  <div className="space-y-default text-primary_text/[.60]">
                    <h1 className="text-start lg:text-[3.5rem] md:text-[2.5rem] sm:text-[1.5rem] text-primary_text font-title">
                      {index.original_title}
                    </h1>
                    <p className="max-w-[40rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">{index.overview}</p>
                    <div className="flex capitalize space-x-default items-center">
                      <div className="flex space-x-1 text-[#1AC855] items-center font-semibold">
                        <p id="match sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">{randomNumbers[slideIndex]}</p>
                        <p>%</p>
                        <p>match</p>
                      </div>
                      <p className="sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">{new Date(index.release_date).getFullYear()}</p>
                      {/* <p>2 seasons</p> */}
                      <p className="border px-4 border-white/[.30] sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem] sm:hidden md:block lg:block">
                        4k ultra hd
                      </p>
                      <div
                        className="flex border px-4 border-white/[.30] space-x-1 hover:cursor-pointer sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]"
                        onClick={() => handleExternalLinkClick(index.imdb_url)}
                      >
                        <p>IMDB</p>
                        <p>:</p>
                        <p>{index.vote_average}</p>
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-default">
                      <div className="flex items-center space-x-2 capitalize bg-white w-fit text-black p-2 px-6 rounded-lg font-semibold">
                        <FaPlay />
                        <p>play</p>
                      </div>
                      <div className="flex items-center space-x-2 capitalize bg-white w-fit text-black p-2 px-6 rounded-lg font-semibold">
                        <BsInfoCircle />
                        <p>more info</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
