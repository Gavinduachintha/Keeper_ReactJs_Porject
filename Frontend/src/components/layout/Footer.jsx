import React from "react";
import "../../styles/global/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-section">Copyright © ZeN studio {currentYear}</div>
    </footer>
  );
};

export default Footer;
