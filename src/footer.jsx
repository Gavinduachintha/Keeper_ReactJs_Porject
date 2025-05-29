import React from "react";
import "./header.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div>Copyright © {currentYear}</div>
      <dev></dev>
    </footer>
  );
};

export default Footer;
