import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../Apis";
import { useMyListIdContext } from "../../../../context/MyListIdContext";
import { MdOutlineAddCircle } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";

export default function MyListIcon({ Popular }) {
  const { myList } = useMyListIdContext();
  const [isInMyList, setIsInMyList] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("_userData");

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        const { email } = userData;
        setUserEmail(email);

        if (myList.includes(Popular.id.toString())) {
          setIsInMyList(true);
        } else {
          setIsInMyList(false);
        }
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    } else {
      console.warn("No user data found in local storage");
    }
  }, [Popular.id, myList]);

  const handleAddToMyList = () => {
    if (userEmail) {
      axios
        .post(
          `${api.Domain}/mediax/auth/add-to-mylist`,
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
        .delete(`${api.Domain}/mediax/auth/delete-from-mylist`, {
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
        <div onClick={handleDeleteMyListItem}>
          <AiFillCheckCircle
            title="Remove From The List"
            className="pt-2 text-[2rem] text-primary_text/[.80] hover:cursor-pointer"
          />
        </div>
      ) : (
        <div onClick={handleAddToMyList}>
          <MdOutlineAddCircle
            title="Add To The List"
            className="pt-2 text-[2rem] text-primary_text/[.80] hover:cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
