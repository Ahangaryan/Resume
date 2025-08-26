"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { fetchAcfOptions } from '../services/wordpress';


const Header = () => {
  const [acf, setAcf] = useState<any>(null);
  useEffect(() => {
    fetchAcfOptions().then(setAcf).catch(() => setAcf(null));
  }, []);

  // Fallbacks
  const logo = acf?.acf?.logo?.url || "/assets/img/logo/logo.png";
  const email = acf?.acf?.email || "hamid@ahangaryan.ir";

  return (
    <header dir="ltr" className="tj-header-area header-absolute">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-wrap align-items-center">
            <div className="logo-box">
              <Link href="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="header-info-list d-none d-md-inline-block h-100 d-flex align-items-center">
              <ul className="ul-reset mb-0 d-flex align-items-center h-100">
                <li className="d-flex align-items-center h-100">
                  {email ? (
                    <a href={`mailto:${email}`} className="d-flex align-items-center h-100">{email}</a>
                  ) : (
                    <a href="mailto:hamid@ahangaryan.ir" className="d-flex align-items-center h-100">hamid@ahangaryan.ir</a>
                  )}
                </li>
              </ul>
            </div>
            <div className="header-menu">
              <nav>
                <ul>
                  <li><a href="#services-section">Services</a></li>
                  <li><a href="#works-section">Works</a></li>
                  <li><a href="#resume-section">Resume</a></li>
                  <li><a href="#skills-section">Skills</a></li>
                  <li><a href="#testimonials-section">Testimonials</a></li>
                  <li><a href="#contact-section">Contact</a></li>
                </ul>
              </nav>
            </div>
            <div className="header-button">
              <a href="#" className="btn tj-btn-primary">Hire me!</a>
            </div>
            <div className="menu-bar d-lg-none">
              <button>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const StickyHeader = () => {
  const [stickyClass, setStickyClass] = useState('sticky-out');
  const [show, setShow] = useState(false);
  const lastScroll = useRef(0);
  const [acf, setAcf] = useState<any>(null);

  useEffect(() => {
    fetchAcfOptions().then(setAcf).catch(() => setAcf(null));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 300) {
        setStickyClass('sticky');
        setShow(true);
      } else if (scroll < lastScroll.current) {
        if (scroll < 500) {
          setStickyClass('sticky-out');
          setShow(true);
        }
      } else {
        setStickyClass('');
        setShow(false);
      }
      lastScroll.current = scroll;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logo = acf?.acf?.logo?.url || "/assets/img/logo/logo.png";
  const email = acf?.acf?.email || "hamid@ahangaryan.ir";

  return (
    <header
      dir="ltr"
      className={`tj-header-area header-2 header-sticky ${stickyClass}`}
      style={{display: show ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999}}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-wrap align-items-center">
            <div className="logo-box">
              <Link href="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="header-info-list d-none d-md-inline-block">
              <ul className="ul-reset">
                <li><a href={`mailto:${email}`}>{email}</a></li>
              </ul>
            </div>
            <div className="header-menu">
              <nav>
                <ul>
                  <li><a href="#services-section">Services</a></li>
                  <li><a href="#works-section">Works</a></li>
                  <li><a href="#resume-section">Resume</a></li>
                  <li><a href="#skills-section">Skills</a></li>
                  <li><a href="#testimonials-section">Testimonials</a></li>
                  <li><a href="#contact-section">Contact</a></li>
                </ul>
              </nav>
            </div>
            <div className="header-button">
              <a href="#" className="btn tj-btn-primary">Hire me!</a>
            </div>
            <div className="menu-bar d-lg-none">
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
export { StickyHeader };
