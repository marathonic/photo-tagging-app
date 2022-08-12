import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home({ allPositions }) {
  const navigate = useNavigate();
  const playGame = () => {
    navigate("/play");
  };

  return (
    <div className="home-container">
      <h4>Welcome</h4>
      <div className="level-select">
        {/* <img src={process.env.PUBLIC_URL="./superheroes-edit.jpg"} alt="level-one" /> */}
        <p>Please enjoy the game</p>
        <div className="level-previews">
          <div className="level-thumbnail">
            <img
              src="./superheroes-edit.jpg"
              alt="level-one"
              onClick={playGame}
            />
            <button onClick={playGame}>play</button>
          </div>
          {/* <div className="level-thumbnail">
            <img src="./universe.jpg" alt="level two" />
            <button>play</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
