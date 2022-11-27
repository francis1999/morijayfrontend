import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import {Link} from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>WE SELL WHOLESALES AND RETAIL</h1>
      <p>What are you buying from us?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={ <Link to='/products'></Link> }
        >
          BUY PRODUCTS
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
