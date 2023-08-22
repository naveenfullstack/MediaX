import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../Apis";

const PopularMoviesContext = createContext();

export const PopularMoviesProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const generateRandomNumber = () => {
    const min = 80;
    const max = 100;
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    axios
      .get(api.Popular, {
        headers: {
          api_key: api.key,
          authantication: api.authantication,
        },
      })
      .then((response) => {
        setPopularMovies(response.data.results);
        setRandomNumbers(
          response.data.results.map(() => generateRandomNumber())
        );
        setLoading(false);
        console.log(response)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);

  return (
    <PopularMoviesContext.Provider
      value={{ popularMovies, loading, randomNumbers }}
    >
      {children}
    </PopularMoviesContext.Provider>
  );
};

export const usePopularMovies = () => {
  return useContext(PopularMoviesContext);
};
