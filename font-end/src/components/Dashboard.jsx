import React from "react";
import FeaturedItems from "./Home/FeaturedItems";
import { PopularMoviesProvider } from "../context/PopularMoviesContext";
import { MyListIdProvider } from "../context/MyListIdContext";
import Popular from "./Home/Popular";

export default function Dashboard() {
  return (
    <div>
      <MyListIdProvider>
        <PopularMoviesProvider>
          <FeaturedItems />
          <Popular />
          <Popular />
          <Popular />
          <Popular />
          <Popular />
        </PopularMoviesProvider>
      </MyListIdProvider>
    </div>
  );
}
