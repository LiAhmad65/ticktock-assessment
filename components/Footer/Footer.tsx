import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white rounded-lg shadow-sm flex items-center justify-center p-8">
      <p className="text-gray-500 text-sm font-normal">
        © {currentYear} tentwenty. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
