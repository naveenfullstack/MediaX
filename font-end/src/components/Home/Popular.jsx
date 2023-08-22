import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Css/FeaturedItems.scss";
import { Autoplay } from "swiper/modules";
import { MdOutlineAddCircle } from "react-icons/md";
import { usePopularMovies } from "../../context/PopularMoviesContext";

export default function Popular() {
  const { popularMovies, loading, randomNumbers } = usePopularMovies();

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

  return (
    <div>
      {loading ? (
        <div className="w-full">
          <div className="w-full space-y-default sm:hidden md:hidden lg:block">
            <h1 className="capitalize font-semibold lg:text-[1.5rem] px-item_lg_left">
              popular on MediaX
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
              popular on MediaX
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
        <div className="lg:pl-item_lg_left md:pl-item_md_left sm:pl-item_sm_left space-y-default sm:pt-2">
          <h1 className="capitalize font-semibold lg:text-[1.5rem] md:text-[1.5rem] sm:text-[1.3rem]">
            popular on MediaX
          </h1>
          <Swiper
            spaceBetween={10}
            slidesPerView={currentSlidesPerView}
            centeredSlides={true}
            loop={true}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            // }}
            modules={[Autoplay]}
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
            {popularMovies.map((index, slideIndex) => (
              <SwiperSlide key={index.id}>
                <div
                  className="xl:h-item_xl lg:h-item_lg md:h-item_md sm:h-item_sm w-full bg-cover bg-bottom"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.poster_path})`,
                  }}
                >
                  <div className="w-full h-full text-start pl-item_sm_left pr-2 h-full flex items-center hover:bg-black/[.75] transition hover:delay-75 duration-100 ease-in-out">
                    <div className="block w-full h-full opacity-0 hover:opacity-100 transition hover:delay-100 duration-100 ease-in-out">
                      <div className="h-3/6 flex justify-end">
                        {/* <h1 className="w-full">{index.original_title}</h1> */}
                        <MdOutlineAddCircle
                          title="Add To List"
                          className="pt-2 text-[2rem] text-primary_text/[.80] hover:cursor-pointer"
                        />
                      </div>
                      <div className="h-3/6 flex items-end">
                        <div>
                          <h1 className="w-full">{index.original_title}</h1>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
