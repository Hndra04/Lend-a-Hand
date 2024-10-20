import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ActionInstance from "../components/ActionInstance";
import SearchBar from "../components/SearchBar";
import { db } from "../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Activities = () => {
  // Accept user credential
  const location = useLocation();
  const { userData } = location.state || {};

  // Use to filter actions
  const [filter, setFilter] = useState("All");

  // Add a state for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Setup action variable & GET function
  const [actionList, setActionList] = useState([]);
  const actionCollection = collection(db, "actions");

  const [organizerList, setOrganizer] = useState([]);
  const organizersCollection = collection(db, "organizers");

  useEffect(() => {
    const getActionList = async () => {
      try {
        const data = await getDocs(actionCollection);
        const processedData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setActionList(processedData);
      } catch (err) {
        console.error(err);
      }
    };

    getActionList();
  }, []);

  useEffect(() => {
    const getOrganizerList = async () => {
      try {
        const data = await getDocs(organizersCollection);
        const processedData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrganizer(processedData);
      } catch (err) {
        console.error(err);
      }
    };

    getOrganizerList();
  }, []);

  const findOrganizer = (id) => {
    const organizer = organizerList.find((element) => element.id === id);
    return organizer ? organizer.name : "Unknown";
  };

  // Filter activities based on type and search query
  let filteredContent = actionList
    .filter((activity) => {
      const matchesFilter = filter === "All" || activity.type === filter;
      const matchesSearch = activity.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .map((activity) => (
      <ActionInstance
        key={activity.id}
        width="w-2/6"
        description={activity["description"]}
        by={findOrganizer(activity["by"])}
      />
    ));

  return (
    <div>
      <Header login={userData["id"]} />

      <div className="pb-10 raleway">
        <section
          className="bg-blue-100 py-10 px-10 overflow-x-hidden"
          style={{ backgroundColor: "#EEF7FF" }}
        >
          <h2 className="text-3xl font-bold mb-5 text-left ">
            Featured <span>✨</span>
          </h2>

          <div
            className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {actionList.map((activity) => (
              <ActionInstance
                key={activity.id}
                width="w-2/6"
                description={activity["description"]}
                by={findOrganizer(activity["by"])}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="mb-10">
        <SearchBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="flex flex-wrap px-10 gap-10 justify-center pb-20">
        {filteredContent}
      </div>

      <Footer />
    </div>
  );
};

export default Activities;
