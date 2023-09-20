import React from "react";
import FeaturedItems from "./Home/FeaturedItems";
import { PopularMoviesProvider } from "../context/PopularMoviesContext";
import { MyListIdProvider } from "../context/MyListIdContext";
import Popular from "./Home/Popular";
import Action from "./Home/Action";
import Animation from "./Home/Animation";

export default function Dashboard() {
  return (
    <div>
      <MyListIdProvider>
        <PopularMoviesProvider>
          <FeaturedItems />
          <Popular />
          <Action />
          <Animation/>
        </PopularMoviesProvider>
      </MyListIdProvider>
    </div>
  );
}
