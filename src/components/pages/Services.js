import React from 'react';
import '../../App.css';
import Navbar from '../Navbar';


import '../../App.css';
// import Cards from '../Cards';
import Footer from '../Footer';
import ServiceContent from '../ServiceContent';

function Services() {
  return (
    <>
    
      <Navbar />
      <ServiceContent />
      <Footer />
    </>
  );
}

export default Services;

// export default function Services() {
//   return <h1 className='services'>SERVICES</h1>;
// }
