import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass up to Layout
  };

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-gray-800 text-white shadow-lg">
      <div className="text-2xl font-bold bg-gray-800">StoryVerse</div>

      <div className="flex items-center space-x-6 ml-auto bg-gray-800">
        <button
          onClick={() => navigate('/discover')}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
        >
          Discover
        </button>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <Search className="absolute left-3 bg-gray-700 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
          onClick={() => navigate("/login")}
        />
      </div>
    </nav>
  );
}

export default Navbar;
