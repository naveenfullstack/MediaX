import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../Apis";
import QuickView from "../components/popup/quickview/QuickView";
import { MyListIdProvider } from "../context/MyListIdContext";
import MyListIcon from "../components/popup/quickview/elements/MyListIcon";

// Compornents

import Header from "../components/Header";

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    axios
      .get(`${api.Domain}/shows/get-all-shows`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        setShows(response.data.shows); // Update to setShows with the shows data
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);

  const openPopup = (movie) => {
    // Find the movie you want to display in the popup from shows array.
    const selectedMovie = shows.find((item) => item.id === movie.id);
    setPopupData(selectedMovie);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupData(null);
    setPopupVisible(false);
  };

  //   const loadMoreCast = () => {
  //     setIsLoadingMore(true);
  //     setTimeout(() => {
  //       setVisibleCastCount(visibleCastCount + 16);
  //       setIsLoadingMore(false);
  //     }, 1000);
  //   };

  return (
    <div>
      <MyListIdProvider>
        <Header />
        {loading ? (
          <div className="w-full pr-20">
            <div className="w-full space-y-default sm:hidden md:hidden lg:block">
              <h1 className="capitalize font-semibold lg:text-[1.5rem] px-item_lg_left">
                popular on MediaX
              </h1>
              <div className="w-full lg:pl-item_lg_left md:pl-item_md_left sm:px-item_sm_left grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 15 }).map((_, index) => (
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
          <div className="text-white px-20">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxxl:grid-cols-5 xxl:grid-cols-5 xl:grid-cols-5 gap-4 ">
              {shows.map((index) => (
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
                        onClick={() => openPopup(index)}
                        className="h-5/6 flex items-end"
                      >
                        <div>
                          <h1 className="w-full">{index.title}</h1>
                          <div className="flex capitalize space-x-default items-center">
                            <div className="flex space-x-1 text-[#1AC855] items-center font-semibold">
                              <p id="match sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                                {/* {randomNumbers[slideIndex]} */}89
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
              ))}
              {popupVisible && (
                <div className="fixed flex items-center justify-center z-50 bg-black/[60%] w-full h-full">
                  {popupData && (
                    <QuickView Popular={popupData} onClose={closePopup} />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </MyListIdProvider>
    </div>
  );
}
