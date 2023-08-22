import React from "react";
import FeaturedItems from "./Home/FeaturedItems";
import { PopularMoviesProvider } from "../context/PopularMoviesContext";
import Popular from "./Home/Popular";

export default function Dashboard() {
  return (
    <div>
      <PopularMoviesProvider>
        <FeaturedItems />
        <Popular/>
      </PopularMoviesProvider>
    </div>
  );
}
