// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Pokémon Battle</Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-blue-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/selected-cards"
            className="text-white hover:text-blue-300 transition duration-200"
          >
            Selected Cards
          </Link>
          <Link
            to="/battle-selection"
            className="text-white hover:text-blue-300 transition duration-200"
          >
            Battle Selection
          </Link>
          <Link
            to="/battle-results"
            className="text-white hover:text-blue-300 transition duration-200"
          >
            Battle Results
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
