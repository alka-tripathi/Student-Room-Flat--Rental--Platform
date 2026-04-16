import React from 'react';
import ImageSection from '../components/ImageSection';
import AboutSection from '../components/AboutSection';
import AboutMe from '../components/AboutMe';
import '../style/aboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      {/*  Heading */}
      <h1 className="about-title">About Rental.co</h1>

      {/*  Sections */}
      <div className="about-content">
        <ImageSection />
        <AboutSection />
        <AboutMe />
      </div>
    </div>
  );
}

export default AboutPage;
