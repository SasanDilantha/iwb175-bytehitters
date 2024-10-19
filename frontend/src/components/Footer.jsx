import React from "react";


const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="flex justify-between items-center flex-col md:flex-row">
          {/* Left Section - Links */}
          <div className="flex space-x-6 text-sm">
            <a
              href="/"
              className="hover:text-gray-300 transition duration-300 ease-in-out"
              aria-label="Home"
            >
              Home
            </a>
            <a
              href="/power-plants"
              className="hover:text-gray-300 transition duration-300 ease-in-out"
              aria-label="Power Plants"
            >
              Power Plants
            </a>
            <a
              href="/shortage"
              className="hover:text-gray-300 transition duration-300 ease-in-out"
              aria-label="Shortage Prediction"
            >
              Shortage Prediction
            </a>
            <a
              href="/request-manager"
              className="hover:text-gray-300 transition duration-300 ease-in-out"
              aria-label="Request Manager"
            >
              Request Manager
            </a>
          </div>

          {/* Right Section - Social Media Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition duration-300 ease-in-out"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.503 0-1.795.714-1.795 1.76v2.307h3.59l-.468 3.622h-3.122V24h6.116C23.407 24 24 23.407 24 22.675V1.326C24 .593 23.407 0 22.675 0z"
                />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition duration-300 ease-in-out"
              aria-label="Twitter"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557a9.917 9.917 0 01-2.827.775 4.94 4.94 0 002.163-2.724 9.864 9.864 0 01-3.127 1.195 4.92 4.92 0 00-8.388 4.482c-4.09-.205-7.72-2.165-10.148-5.144A4.93 4.93 0 001.64 6.575a4.902 4.902 0 002.188.605 4.921 4.921 0 01-2.222-4.097c0-.021 0-.042.001-.063A4.914 4.914 0 004.924 8.113a4.897 4.897 0 01-2.224.085 4.922 4.922 0 004.601 3.42A9.874 9.874 0 010 19.54a13.945 13.945 0 007.548 2.213c9.142 0 14.307-7.721 13.995-14.646A9.955 9.955 0 0024 4.557z"
                />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition duration-300 ease-in-out"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19.511 3H4.489C3.668 3 3 3.672 3 4.5v15c0 .828.668 1.5 1.489 1.5h15.022c.821 0 1.489-.672 1.489-1.5v-15c0-.828-.668-1.5-1.489-1.5zM8.846 18.396H6.275V9.899h2.571v8.497zM7.561 8.775c-.836 0-1.515-.68-1.515-1.515S6.725 5.745 7.561 5.745c.836 0 1.516.68 1.516 1.515 0 .836-.68 1.515-1.516 1.515zM18.447 18.396h-2.571v-4.106c0-.978-.02-2.236-1.362-2.236-1.363 0-1.571 1.064-1.571 2.163v4.179h-2.571V9.899h2.467v1.171h.035c.343-.65 1.181-1.334 2.432-1.334 2.599 0 3.079 1.712 3.079 3.937v5.723z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-6 text-sm">
          <p>
            &copy; {new Date().getFullYear()} VoltSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;