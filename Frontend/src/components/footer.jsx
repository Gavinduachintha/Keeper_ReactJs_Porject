import React from "react";
import "../assets/header.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-section">Copyright © ZeN studio {currentYear}</div>
    </footer>
  );
};

export default Footer;
