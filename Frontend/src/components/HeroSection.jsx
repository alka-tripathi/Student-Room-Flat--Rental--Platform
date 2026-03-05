import React from 'react';
import HeroImage from './HeroImage';
import HeroText from './HeroText.jsx';
import '../style/heroSection.css';

function HeroSection() {
  return (
    <div className="hero-container">
      <HeroImage></HeroImage>
      <HeroText></HeroText>
    </div>
  );
}

export default HeroSection;
