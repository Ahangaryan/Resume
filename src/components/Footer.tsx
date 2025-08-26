
"use client";
import React, { useEffect, useState } from 'react';
import { fetchAcfOptions } from '../services/wordpress';


const Footer = () => {
  const [acf, setAcf] = useState<any>(null);
  useEffect(() => {
    fetchAcfOptions().then(setAcf).catch(() => setAcf(null));
  }, []);
  const logo = acf?.acf?.logo?.url || "/assets/img/logo/logo.png";
  const copyright = acf?.acf?.footer_copyright || `© ${new Date().getFullYear()} Hamid Ahangaryan. All Rights Reserved.`;
  return (
    <footer className="tj-footer-area">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="footer-logo-box">
              <a href="#"><img src={logo} alt="Footer Logo" /></a>
            </div>
            <p>{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
