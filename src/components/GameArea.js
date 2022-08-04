export default function GameArea({
  clickPosition,
  showSelectionModal,
  openModal,
}) {
  return (
    <div className="game-area-container">
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
