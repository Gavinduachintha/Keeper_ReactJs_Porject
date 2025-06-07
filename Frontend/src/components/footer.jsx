import React from "react";
import "../assets/header.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div>Copyright © ZeN studio {currentYear}</div>
    </footer>
  );
};

export default Footer;
