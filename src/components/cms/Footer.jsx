import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow p-4 text-center text-sm text-gray-600">
      COPYRIGHT &copy; {currentYear} ZEPHYR, All rights Reserved.
    </footer>
  );
};

export default Footer;
