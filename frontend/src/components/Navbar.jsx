import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black p-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="text-white text-3xl md:text-4xl font-bold tracking-wide">
          <a
            href="/"
            className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
            aria-label="Electricity Demand Management System"
          >
            VoltSync
          </a>
        </div>

        

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex space-x-6 text-lg">
          <a
            href="/"
            className="text-white px-4 py-2 rounded-full border border-white hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out"
            aria-label="Go to Home"
          >
            Home
          </a>
          <a
            href="/power-plants"
            className="text-white px-4 py-2 rounded-full border border-white hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out"
            aria-label="View Power Plants"
          >
            Power Plants
          </a>
          <a
            href="/shortage"
            className="text-white px-4 py-2 rounded-full border border-white hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out"
            aria-label="Shortage Prediction"
          >
            Shortage Prediction
          </a>
          <a
            href="/request-manager"
            className="text-white px-4 py-2 rounded-full border border-white hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out"
            aria-label="Request Manager"
          >
            Request Manager
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <svg
              className="w-8 h-8 transition-transform transform hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4 bg-black bg-opacity-90 py-4 rounded-lg shadow-inner">
            <a
              href="/"
              className="text-white block text-center hover:text-gray-300 transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
              aria-label="Go to Home"
            >
              Home
            </a>
            <a
              href="/power-plants"
              className="text-white block text-center hover:text-gray-300 transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
              aria-label="View Power Plants"
            >
              Power Plants
            </a>
            <a
              href="/shortage"
              className="text-white block text-center hover:text-gray-300 transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
              aria-label="Shortage Prediction"
            >
              Shortage Prediction
            </a>
            <a
            href="/request-manager"
            className="text-white block text-center hover:text-gray-300 transition duration-300 ease-in-out"
            aria-label="Request Manager"
          >
            Request Manager
          </a>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
