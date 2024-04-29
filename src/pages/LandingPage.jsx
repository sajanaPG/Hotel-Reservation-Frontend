import React from "react";
import LandingPageTile from "../components/LandingPageTile";
import SectionTile from "../components/SectionTile";
import bgimage from "../images/bg-image.jpg";
import Deluxe from "../images/Deluxe.jpg";
import Premium from "../images/Premium.jpg";
import Standard from "../images/Standard.jpg";

function LandingPage() {
  return (
    <>
      <div
        className="landing-page"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <LandingPageTile />
      </div>
      <div className="categories-section">
        <div className="categories-section-bar">
          <p className="luxury-font">Room Categories</p>
          <p>Pick your dream vacation stay!</p>
        </div>
        <div className="tile-container">
          <SectionTile image={Standard} buttonText="STANDARD" />
          <SectionTile image={Premium} buttonText="PREMIUM" />
          <SectionTile image={Deluxe} buttonText="DELUXE" />
        </div>
        <div className="categories-section-bar">
          <p>Come, delight & breathe an air of luxury at the</p>
          <p className="logo">
            <span className="logo-top">HOTEL</span>
            <br />
            <span className="logo-bottom">COLOMBO</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
