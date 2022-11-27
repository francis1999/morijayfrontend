import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import HomeContent from '../HomeContent';
import Navbar from '../Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HomeContent />
      <Footer />
    </>
  );
}

export default Home;
