import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../Apis";

// Compornents

import Header from "./Header";

export default function SearchResults() {
  const { title } = useParams();
  const [loading, setLoading] = useState(false);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get(`${api.Domain}/shows/search?title=no`, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        setShows(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);

  //   const loadMoreCast = () => {
  //     setIsLoadingMore(true);
  //     setTimeout(() => {
  //       setVisibleCastCount(visibleCastCount + 16);
  //       setIsLoadingMore(false);
  //     }, 1000);
  //   };
  return (
    <div>
      <Header />
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
        <div className="text-white px-20">
          <div className="flex space-x-2 items-center text-title mt-4">
            <h1 className="capitalize">search results showing for</h1>
            <p>:</p>
            <p>{title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
