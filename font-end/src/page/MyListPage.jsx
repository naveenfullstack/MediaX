import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import api from "../Apis";
import { MdDelete } from "react-icons/md";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./css/MyListPage.css";

export default function MyListPage() {
  const [myList, setMyList] = useState([]);
  const [Ids, setIds] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("_userData");

    const headers = {
      api_key: api.key,
      authantication: api.authantication,
    };

    if (userDataString && !hasFetchedData) {
      try {
        const userData = JSON.parse(userDataString);
        const { email } = userData;
        setUserEmail(email);

        axios
          .get(`${api.Domain}/mediax/auth/userdetails/${email}`, {
            headers,
          })
          .then((response) => {
            setMyList(response.data.results[0].mylist);

            // Create the request body in the expected format
            const requestBody = {
              getshows: myList,
            };

            // Send a POST request with the requestBody
            axios
              .post(`${api.Domain}/mediax/auth/getmylist/`, requestBody, {
                headers,
              })
              .then((response) => {
                setIds(response.data.results);
                setHasFetchedData(true);
                setLoading(false);
                console.log(response);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
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
  }, [myList, hasFetchedData]); // Include myList as a dependency to ensure the POST request runs when it changes

  const handleDeleteMyListItem = (index) => {
    if (userEmail) {
      axios
        .delete(`${api.Domain}/mediax/auth/delete-from-mylist`, {
          data: {
            email: userEmail,
            itemToDelete: [index.id.toString()],
          },
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
        })
        .then((response) => {
          setIds((prevIds) => prevIds.filter((item) => item.id !== index.id));
          console.log(response);
        })
        .catch((error) => {
          console.error("Error deleting from my list:", error);
        });
    }
  };

  return (
    <div className="text-white">
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
          <TransitionGroup className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxxl:grid-cols-5 xxl:grid-cols-5 xl:grid-cols-5 gap-4 ">
            {Ids.map((index) => (
              <CSSTransition
                key={index.id}
                timeout={500}
                className="xxxl:h-item_xxxl xxl:h-item_xxl xl:h-item_xl lg:h-item_lg md:h-item_md sm:h-item_sm w-full bg-cover bg-bottom"
                classNames="item"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${index.poster_path})`,
                }}
              >
                <div
                  //onClick={() => openPopup(index)}
                  className="w-full h-full cursor-pointer text-start pl-item_sm_left pr-2 h-full flex items-center hover:bg-black/[.75] transition hover:delay-75 duration-100 ease-in-out"
                >
                  <div className="block w-full h-full opacity-0 hover:opacity-100 transition hover:delay-100 duration-100 ease-in-out bg-black/[.75]">
                    <div className="h-3/6 flex justify-end">
                      {/* <h1 className="w-full">{index.original_title}</h1> */}
                      <MdDelete
                        onClick={() => handleDeleteMyListItem(index)}
                        title="Delete from List"
                        className="pt-2 text-[2rem] text-primary_text/[.80] hover:cursor-pointer"
                      />
                    </div>
                    <div className="h-3/6 flex items-end px-4 pb-2">
                      <div>
                        <h1 className="w-full">{index.title}</h1>
                        <div className="flex capitalize space-x-default items-center">
                          <p className="sm:text-[0.8rem] md:text-[1rem] lg:text-[1rem]">
                            {new Date(index.release_date).getFullYear()}
                          </p>
                          <p>{index.is_movie ? "movie" : "TV series"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      )}
    </div>
  );
}
