import React from 'react';

import '../style/AboutPage.css';

function ImageSection() {
  return (
    <div className="image-section">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVudGFsJTIwcmlvbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        alt="Rental Room"
      />

      <img
        src="https://i.pinimg.com/1200x/b2/1e/20/b21e20a1b125c9c8c6132bee6752b1b0.jpg"
        alt=""
      />

      <img
        src="https://i.pinimg.com/1200x/de/72/39/de723949dd1d53707a537dc005b8a3e1.jpg"
        alt=""
      />
    </div>
  );
}

export default ImageSection;
