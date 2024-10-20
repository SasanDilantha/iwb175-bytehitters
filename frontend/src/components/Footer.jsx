import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} VoltSync. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
