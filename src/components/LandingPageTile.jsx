import React from "react";
import { Button } from "react-bootstrap";

function LandingPageTile() {
  return (
    <div>
      <div className="landing-page-tile">
        <p className="luxury-font">WELCOME TO</p>

        <p className="logo">
          <span className="logo-top">HOTEL</span>
          <br />
          <span className="logo-bottom">COLOMBO</span>
        </p>

        <p className="luxury-font">Your Luxury Destination</p>

        <p className="button-top">Be a Loyal Customer</p>
        <Button variant="outline-primary" className="center-tile-button">
          SIGN UP
        </Button>

        <p className="button-top">Plan Your Stay Today</p>
        <Button variant="primary" className="center-tile-button">
          BOOK NOW
        </Button>
      </div>
    </div>
  );
}

export default LandingPageTile;
