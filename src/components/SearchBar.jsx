import React from "react";

const SearchBar = ({ filter, setFilter, searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full px-[10%] raleway">
      <div
        className="flex space-x-4 py-2 px-2 w-1/2"
        style={{ backgroundColor: "#D9D9D9", borderRadius: "35px" }}
      >
        <button
          onClick={() => setFilter("All")}
          className={`font-bold py-2 px-4 rounded-full w-1/4 ${
            filter === "All" ? "bg-blue text-white" : "bg-none"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Activity")}
          className={`font-bold py-2 px-4 rounded-full w-1/4 ${
            filter === "Activity" ? "bg-blue text-white" : "bg-none"
          }`}
        >
          Activity
        </button>
        <button
          onClick={() => setFilter("Donation")}
          className={`font-bold py-2 px-4 rounded-full w-1/4 ${
            filter === "Donation" ? "bg-blue text-white" : "bg-none"
          }`}
        >
          Donation
        </button>
        <button
          onClick={() => setFilter("Campaign")}
          className={`font-bold flex items-center justify-center py-2 px-4 rounded-full w-1/4 ${
            filter === "Campaign" ? "bg-blue text-white" : "bg-none"
          }`}
        >
          Campaign
        </button>
      </div>

      <div className="flex w-1/2 gap-3">
        <div className="flex items-center justify-between border-[3px] rounded-full w-3/4">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-3 rounded-full bg-transparent w-full focus:outline-none"
            value={searchQuery} // Bind searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
          />
          <button className="py-2 px-4 rounded">
            <img className="w-4" src="./assets/Icons/Search.png" alt="" />
          </button>
        </div>

        <button className="bg-gray-200 py-2 px-4 rounded-full font-semibold">
          Filter ⏷
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
