import React from "react";

const Footer = () => {
  return (
    <div className="footer-section">
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Eftekhar Alam</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default Footer;
