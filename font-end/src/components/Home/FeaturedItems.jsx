import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/FeaturedItems.scss";
import { Autoplay } from "swiper/modules";
//import clients from "../../DemoDeta/FeaturedShows.json";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

export default function FeaturedItems() {
  const [clients, setClients] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  //const featuredMovies = clients.filter((movie) => movie.is_featured === true);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjJmMmU3NTYwZjUwNmZlMWI2Njg5NDE4ZGQ4MjYwYyIsInN1YiI6IjY0ZGI5YzYyMDAxYmJkMDQxYzhmNWY1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BhwtgPLMHNQDlrcM1CmY-StCqJWjpbexvxtx9zXzaRo";
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const initialSlideIndex = Math.floor(Math.random() * clients.length);

  const generateRandomNumber = () => {
    const min = 80;
    const max = 100;
    return Math.floor(Math.random() * (max - min) + min);
  };

  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  //const featuredMovies = clients.filter((movie) => movie.is_featured === true);

  return (
    <div>
      {loading ? ( 
        <div className="w-full">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="p-6 h-[30rem] bg-input_bg shadow-md animate-pulse"
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
          initialSlide={initialSlideIndex}
          className="mySwiper"
        >
          {clients.map((index, slideIndex) => (
            <SwiperSlide key={index.id}>
              <div
                className="h-[30rem] w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.backdrop_path})`,
                }}
              >
                <div className="w-full text-start px-20 bg-gradient-to-r from-black from-30% h-full flex items-center">
                  <div className="space-y-default text-primary_text/[.60]">
                    <h1 className="text-start text-[3.5rem] text-primary_text font-title">
                      {index.original_title}
                    </h1>
                    <p className="max-w-[40rem]">{index.overview}</p>
                    <div className="flex capitalize space-x-default items-center">
                      <div className="flex space-x-1 text-[#1AC855] items-center font-semibold">
                        <p id="match">{randomNumbers[slideIndex]}</p>
                        <p>%</p>
                        <p>match</p>
                      </div>
                      <p>{index.release_date}</p>
                      <p>2 seasons</p>
                      <p className="border px-4 border-white/[.30]">
                        4k ultra hd
                      </p>
                      <div
                        className="flex border px-4 border-white/[.30] space-x-1 hover:cursor-pointer"
                        onClick={() => handleExternalLinkClick(index.imdb_url)}
                      >
                        <p>IMDB</p>
                        <p>:</p>
                        <p>{index.vote_average}</p>
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
      )}
    </div>
  );
}
