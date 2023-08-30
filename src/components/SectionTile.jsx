import React from "react";
import { Button } from "react-bootstrap";

function SectionTile(props) {
  return (
    <div className="section-tile">
      <div className="tile-image">
        <img src={props.image} alt="Tile" width={"100%"} />
      </div>
      <Button variant="primary" className="section-tile-button">
        {props.buttonText}
      </Button>
    </div>
  );
}

export default SectionTile;
