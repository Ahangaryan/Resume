import React from 'react';
import Preloader from './Preloader';
import BackToTop from './BackToTop';
import Header, { StickyHeader } from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Preloader />
    <BackToTop />
  <Header />
  <StickyHeader />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
