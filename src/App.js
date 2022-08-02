import GameArea from "./components/GameArea";
import Header from "./components/Header";
import Play from "./pages/Play";
import React, { useState, useEffect } from "react";
import { Modal } from "./components/Modal";
import db from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [lastClickPosition, setLastClickPosition] = useState({
    x: 0,
    y: 0,
  });
  const [clientClickPosition, setClientClickPosition] = useState({
    x: 0,
    y: 0,
  });
  const [lastFound, setLastFound] = useState("");
  const [devClickPosition, setDevClickPosition] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [previouslyFound, setPreviouslyFound] = useState([]);

  const openModal = (lastPosition) => {
    setShowModal(true);
  };

  console.log(allPositions);
  useEffect(
    () =>
      onSnapshot(collection(db, "positions"), (snapshot) =>
        setAllPositions(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );

  return (
    <div className="app-container">
      {/* We actually need a routed nav, not just a header! */}
      {/* <BrowserRouter> ...  */}
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          lastClickPosition={lastClickPosition}
          clientClickPosition={clientClickPosition}
        />
      ) : null}
      <Play
        openModal={openModal}
        setLastClickPosition={setLastClickPosition}
        lastClickPosition={lastClickPosition}
        setClientClickPosition={setClientClickPosition}
        lastFound={lastFound}
        setLastFound={setLastFound}
        allPositions={allPositions}
        previouslyFound={previouslyFound}
        setPreviouslyFound={setPreviouslyFound}
      />
      {/* Close <BrowserRouter />... */}
    </div>
  );
}
