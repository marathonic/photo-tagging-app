import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ allPositions }) {
  const navigate = useNavigate();
  const playGame = () => {
    navigate("/play");
  };

  return (
    <div className="home-container">
      <h4>Welcome</h4>
      <div className="level-select">
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
        </div>
      </div>
    </div>
  );
}

export default Home;
