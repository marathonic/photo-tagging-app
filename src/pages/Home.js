import React from "react";
import { Link } from "react-router-dom";

function Home({ allPositions }) {
  return (
    <div className="home-container">
      <h4>Welcome</h4>
      <div className="level-select">
        {/* <img src={process.env.PUBLIC_URL="./superheroes-edit.jpg"} alt="level-one" /> */}
        <p>Please choose a stage</p>
        <div className="level-previews">
          <div className="level-thumbnail">
            <img src="./superheroes-edit.jpg" alt="level-one" />
            <button>play</button>
          </div>
          <div className="level-thumbnail">
            <img src="./universe.jpg" alt="level two" />
            <button>play</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
