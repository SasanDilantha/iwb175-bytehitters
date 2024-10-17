import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo or Brand Name */}
                <div className="text-white text-2xl font-bold">
                    <a href="/">Electricity Demand Management System</a>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
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

                {/* Navigation Links for Desktop */}
                <div className="hidden md:flex space-x-6">
                    <a href="/" className="text-white hover:text-gray-300">
                        Home
                    </a>
                    <a href="/power-plants" className="text-white hover:text-gray-300">
                        Power Plants
                    </a>
                    <a href="/shortage" className="text-white hover:text-gray-300">
                        Shortage Prediction
                    </a>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col space-y-4 mt-2">
                        <a
                            href="/"
                            className="text-white block text-center hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </a>
                        <a
                            href="/power-plants"
                            className="text-white block text-center hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Power Plants
                        </a>
                        <a
                            href="/shortage"
                            className="text-white block text-center hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Shortage Prediction
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;