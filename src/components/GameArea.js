import { useEffect } from "react";

export default function GameArea({
  clickPosition,
  showSelectionModal,
  openModal,
  previouslyFound,
  allPositions,
  setShowModal,
  isGameOver,
}) {
  const VictoryModal = () => {
    useEffect(() => {
      setShowModal(false);
      alert("closing modal from victoryModal");
    }, []);

    return (
      <div className="victory-modal-container">
        <div className="victory-modal">
          <h5>You win!</h5>
          <p>Record your name</p>
          <input placeholder="your name here"></input>
          <button>OK</button>
        </div>
      </div>
    );
  };

  return (
    <div className="game-area-container">
      {previouslyFound.length === 4 ? <VictoryModal /> : null}
      <img
        id="img_ID"
        src="./superheroes-edit.jpg"
        // useMap="#superheroes-map"
        border="0"
        width={"100%"}
        alt=""
        onClick={clickPosition}
      />
    </div>
  );
}
