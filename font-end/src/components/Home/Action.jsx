import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "../Css/FeaturedItems.scss";
import { Autoplay, FreeMode } from "swiper/modules";
import { MdKeyboardArrowRight } from "react-icons/md";
import { usePopularMovies } from "../../context/PopularMoviesContext";
import QuickView from "../popup/quickview/QuickView";
import MyListIcon from "../popup/quickview/elements/MyListIcon";
import { useNavigate } from "react-router-dom";

export default function Action() {
  const { popularMovies, loading, randomNumbers } = usePopularMovies();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const openPopup = (movie) => {
    // Find the movie you want to display in the popup from popularMovies array.
    const selectedMovie = popularMovies.find((item) => item.id === movie.id);
    setPopupData(selectedMovie);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupData(null);
    setPopupVisible(false);
  };

  const breakpoints = {
    mobile: 320,
    tablet: 640,
    desktop: 1024,
  };

  const slidesPerView = {
    mobile: 2,
    tablet: 4,
    desktop: 5,
  };

  const currentBreakpoint = Object.keys(breakpoints).find(
    (breakpoint) => window.innerWidth <= breakpoints[breakpoint]
  );

  const currentSlidesPerView =
    slidesPerView[currentBreakpoint] || slidesPerView.desktop;

  const test = () => {
    window.location.href = "/signin";
  };

  const handleShowClick = (showId) => {
    navigate(`/shows/${showId}`);
  };

  // Filter movies with the "Action" tag
  const actionMovies = popularMovies.filter((movie) =>
    movie.tags.includes("Action")
  );

  return (
    <div>
      {loading ? (
        <div className="w-full">
          <div className="w-full space-y-default sm:hidden md:hidden lg:block">
            <h1 className="capitalize font-semibold lg:text-[1.5rem] px-item_lg_left">
              Action Movies
            </h1>
            <div className="w-full lg:pl-item_lg_left md:pl-item_md_left sm:px-item_sm_left grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="shadow-md animate-pulse">
                  <div className="bg-input_bg h-[13rem]"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full space-y-default sm:block md:block lg:hidden">
            <h1 className="capitalize font-semibold md:text-[1.5rem] sm:text-[1.3rem] lg:px-item_lg_left sm:px-item_sm_left sm:pt-item_sm_left">
              Action Movies
            </h1>
            <div className="w-full lg:pl-item_lg_left md:pl-item_md_left sm:pl-item_sm_left md:pl-item_lg_left sm:px-item_sm_left grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="shadow-md animate-pulse">
                  <div className="bg-input_bg h-[13rem]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="lg:pl-item_lg_left md:pl-item_md_left sm:pl-item_sm_left space-y-default sm:pt-2 sm:hidden md:hidden lg:hidden xl:block xxl:block xxxl:block">
            <h1 className="capitalize font-semibold lg:text-[1.5rem] md:text-[1.5rem] sm:text-[1.3rem]">
              Action Movies
            </h1>
            <div className=" flex">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={10}
                slidesPerView={currentSlidesPerView}
                centeredSlides={true}
                freeMode={true}
                loop={true}
                modules={[Autoplay, FreeMode]}
                className="mySwiper"
                breakpoints={{
                  [breakpoints.mobile]: {
                    slidesPerView: slidesPerView.mobile,
                  },
                  [breakpoints.tablet]: {
                    slidesPerView: slidesPerView.tablet,
                  },
                  [breakpoints.desktop]: {
                    slidesPerView: slidesPerView.desktop,
                  },
                }}
              >
                {actionMovies.map((index, slideIndex) => (
                  <SwiperSlide key={index.id}>
                    <div
                      className="xxxl:h-item_xxxl xxl:h-item_xxl xl:h-item_xl lg:h-item_lg md:h-item_md sm:h-item_sm w-full bg-cover bg-bottom"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.poster_path})`,
                      }}
                    >
                      <div className="w-full h-full cursor-pointer text-start pl-item_sm_left pr-2 h-full flex items-center hover:bg-black/[.75] transition hover:delay-75 duration-100 ease-in-out">
                        <div className="block w-full h-full opacity-0 hover:opacity-100 transition hover:delay-100 duration-100 ease-in-out">
                          <div className="h-1/6 flex justify-end">
                            <MyListIcon Popular={index} />
                          </div>
                          <div
                            // onClick={() => openPopup(index)}
                            onClick={() => {
                              if (currentBreakpoint === "mobile") {
                                test();
                              } else if (currentBreakpoint === "tablet") {
                                test();
                              } else {
                                // Handle desktop click here
                                openPopup(index);
                              }
                            }}
                            className="h-5/6 flex items-end"
                          >
                            <div>
                              <h1 className="w-full">{index.title}</h1>
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
                                <p className="sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                                  {index.is_movie ? "movie" : "TV series"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                onClick={() => swiperRef.current?.slideNext()}
                className="xxxl:flex xxl:flex xl:flex lg:flex hidden items-center bg-black/[.60] px-2 absolute right-0 z-10 xxxl:h-item_xxxl xxl:h-item_xxl xl:h-item_xl lg:h-item_lg md:h-item_md sm:h-item_sm "
              >
                <MdKeyboardArrowRight
                  className="text-[3rem] "
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            {popupVisible && (
              <div className="fixed flex items-center justify-center z-50 bg-black/[60%] w-full h-full">
                {popupData && (
                  <QuickView Popular={popupData} onClose={closePopup} />
                )}
              </div>
            )}
          </div>

          <div className="lg:pl-item_lg_left md:pl-item_md_left sm:pl-item_sm_left space-y-default sm:pt-2 sm:block md:block lg:block xl:hidden xxl:hidden xxxl:hidden">
            <h1 className="capitalize font-semibold lg:text-[1.5rem] md:text-[1.5rem] sm:text-[1.3rem]">
              popular on MediaX
            </h1>
            <div className=" flex">
              <Swiper
                spaceBetween={10}
                slidesPerView={currentSlidesPerView}
                centeredSlides={true}
                freeMode={true}
                loop={true}
                modules={[Autoplay, FreeMode]}
                className="mySwiper"
                breakpoints={{
                  [breakpoints.mobile]: {
                    slidesPerView: slidesPerView.mobile,
                  },
                  [breakpoints.tablet]: {
                    slidesPerView: slidesPerView.tablet,
                  },
                  [breakpoints.desktop]: {
                    slidesPerView: slidesPerView.desktop,
                  },
                }}
              >
                {popularMovies.map((index) => (
                  <SwiperSlide key={index.id}>
                    <div
                      // onClick={() =>
                      //   (window.location.href = `/show/${index.id}`)
                      // }
                      onClick={() => handleShowClick(index.id)}
                      className="lg:h-item_lg md:h-item_md sm:h-item_sm w-full bg-cover bg-bottom"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.poster_path})`,
                      }}
                    >
                      <div className="w-full h-full text-start pl-item_sm_left pr-2 h-full flex items-center"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
