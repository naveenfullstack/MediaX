import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import axios from "axios";
import api from "../../../../Apis";

export default function MyList({ Popular }) {
  const [isInMyList, setIsInMyList] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("_userData");

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        const { email } = userData;
        setUserEmail(email);

        axios
          .get(`${api.Domain}/auth/userdetails/${email}`, {
            headers: {
              api_key: api.key,
              authantication: api.authantication,
            },
          })
          .then((response) => {
            console.log(response);
            const mylist = response.data.results[0].mylist;
            const stringPopularId = Popular.id.toString(); // Convert to string
            if (mylist.includes(stringPopularId)) {
              setIsInMyList(true);
            } else {
              setIsInMyList(false);
            }
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
  }, [Popular.id]);

  const handleAddToMyList = () => {
    if (userEmail) {
      axios
        .post(
          `${api.Domain}/auth/add-to-mylist`,
          {
            email: userEmail, // Use the userEmail from state
            idsToAdd: [Popular.id.toString()],
          },
          {
            headers: {
              api_key: api.key,
              authantication: api.authantication,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setIsInMyList(true);
        })
        .catch((error) => {
          console.error("Error adding to my list:", error);
        });
    }
  };

  const handleDeleteMyListItem = () => {
    if (userEmail) {
      axios
        .delete(`${api.Domain}/auth/delete-from-mylist`, {
          data: {
            email: userEmail,
            itemToDelete: [Popular.id.toString()],
          },
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
        })
        .then((response) => {
          console.log(response);
          setIsInMyList(false);
        })
        .catch((error) => {
          console.error("Error deleting from my list:", error);
        });
    }
  };
  

  return (
    <div>
      {isInMyList ? (
        <div
        onClick={handleDeleteMyListItem}
          className={`flex items-center space-x-2 w-fit px-6 pl-4 py-2 rounded-md text-white border-default border-white/[.60] hover:bg-input_bg hover:border-transparent`}
        >
          <BiCheck className="text-[1.5rem]" />
          <button className="capitalize">Added</button>
        </div>
      ) : (
        <div
          onClick={handleAddToMyList}
          className={`flex items-center space-x-2 w-fit px-6 pl-4 py-2 rounded-md text-white border-default border-white/[.60] hover:bg-input_bg hover:border-transparent`}
        >
          <MdAdd className="text-[1.5rem]" />
          <button className="capitalize">My List</button>
        </div>
      )}
    </div>
  );
}
