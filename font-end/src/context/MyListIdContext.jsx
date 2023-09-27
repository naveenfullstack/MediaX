import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../Apis";

const MyListIdContext = createContext();

export const MyListIdProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const userDataString = localStorage.getItem("_userData");

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        const { email } = userData;

        axios
          .get(`${api.Domain}/mediax/auth/userdetails/${email}`, {
            headers: {
              api_key: api.key,
              authantication: api.authantication,
            },
          })
          .then((response) => {
            setMyList(response.data.results[0].mylist);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    } else {
      console.warn("No user data found in local storage");
    }
  }, []);

  console.log("My List in MyListIdProvider:", myList);

  return (
    <MyListIdContext.Provider value={{ myList }}>
      {children}
    </MyListIdContext.Provider>
  );
};

export const useMyListIdContext = () => {
  return useContext(MyListIdContext);
};
