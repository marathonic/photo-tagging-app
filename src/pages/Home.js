import React from "react";
import { Link } from "react-router-dom";

function Home({ allPositions }) {
  return (
    <div className="home-container">
      <h4>Choose level</h4>
      <div className="level-select">
        {/* <img src={process.env.PUBLIC_URL="./superheroes-edit.jpg"} alt="level-one" /> */}
        <div className="level-thumbnail">
          <img src="./superheroes-edit.jpg" alt="level-one" />
          <button>Play</button>
        </div>
        <div className="level-thumbnail">
          <img src="./universe.jpg" alt="level two" />
          <button>Play</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
