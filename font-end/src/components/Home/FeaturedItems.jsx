import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/FeaturedItems.scss";
import { Autoplay } from "swiper/modules";
import { usePopularMovies } from "../../context/PopularMoviesContext";
import { MdAdd } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

export default function FeaturedItems() {
  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };
  const { popularMovies, loading, randomNumbers } = usePopularMovies();
  const PickRandom1stSlider = Math.floor(Math.random() * popularMovies.length);

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
          {popularMovies.map((index, slideIndex) => (
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
                      {index.title}
                    </h1>
                    <p className="max-w-[40rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                      {index.overview}
                    </p>
                    <div className="flex capitalize space-x-default items-center">
                      <div className="flex space-x-1 text-[#1AC855] items-center font-semibold">
                        <p id="match sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                          {randomNumbers[slideIndex]}
                        </p>
                        <p>%</p>
                        <p>match</p>
                      </div>
                      <p className="sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                        {new Date(index.release_date).getFullYear()}
                      </p>
                      {/* <p>2 seasons</p> */}
                      <p className="border px-4 border-white/[.30] sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem] sm:hidden md:block lg:block">
                        4k ultra hd
                      </p>
                      <div
                        className="flex border px-4 border-white/[.30] space-x-1 hover:cursor-pointer sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]"
                        onClick={() =>
                          handleExternalLinkClick(
                            `https://www.imdb.com/title/${index.imdb_id}`
                          )
                        }
                      >
                        <p>IMDB</p>
                        <p>:</p>
                        <p>{index.imdb_vote}</p>
                      </div>
                    </div>
                    <div className="flex space-x-default">
                      <div
                        onClick={() =>
                          (window.location.href = `/player/${index.id}`)
                        }
                        className="flex items-center space-x-2 bg-white w-fit px-6 py-2 rounded-md text-black hover:bg-input_bg hover:text-white"
                      >
                        <FaPlay />
                        <button className="font-medium">Play</button>
                      </div>

                      <div className="flex items-center space-x-2 w-fit px-6 pl-4 py-2 rounded-md text-white border-default border-white/[.60] hover:bg-input_bg hover:border-transparent">
                        <MdAdd className="text-[1.5rem]" />
                        <button className="capitalize">my list</button>
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
