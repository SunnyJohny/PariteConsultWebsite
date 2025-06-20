import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search icon
import equipmentData from "../data/equipmentData"; // Import your equipment data

const Equipment = () => {
  const [query, setQuery] = useState("");
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // Utility function to capitalize initials of each word
  const capitalizeWords = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredEquipment(equipmentData);
    } else {
      const results = equipmentData.filter((equipment) =>
        equipment.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEquipment(results);
    }

    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleImageClick = (equipment) => {
    setSelectedEquipment(equipment);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setSelectedEquipment(null);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div id="Equipment" className="p-4 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Products Gallery
      </h1>


      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for equipment..."
            className="w-full p-3 pl-10 pr-4 border rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEquipment.slice(0, visibleCount).length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-500">
            No equipment found.
          </p>
        ) : (
          filteredEquipment.slice(0, visibleCount).map((equipment) => (
            <div
              key={equipment.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => handleImageClick(equipment)}
            >
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 truncate">
                {capitalizeWords(equipment.name)}
              </h3>
            </div>
          ))
        )}
      </div>



      {/* Load More Button */}
      {visibleCount < filteredEquipment.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 border-2 border-green-400 text-green-400 bg-transparent rounded-full hover:bg-green-400 hover:text-white hover:scale-105 transition-transform duration-300 shadow-md"

          >
            Load More
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full relative max-h-[90vh]">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Scrollable Content */}
            <div className="overflow-auto max-h-[85vh]">
              {/* Image */}
              <img
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                className="w-full cursor-pointer"
                onClick={closeModal}
              />

              {/* Equipment Details */}
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {capitalizeWords(selectedEquipment.name)}
                </h2>
                <p className="text-gray-600">
                  {/* Detailed information about the selected equipment can go here. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
