import GameArea from "./components/GameArea";
import Header from "./components/Header";
import Play from "./pages/Play";
import React, { useState, useEffect } from "react";
import { Modal } from "./components/Modal";
import db from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [lastClickPosition, setLastClickPosition] = useState({
    x: 0,
    y: 0,
  });
  const [clientClickPosition, setClientClickPosition] = useState({
    x: 0,
    y: 0,
  });

  const openModal = (lastPosition) => {
    setShowModal(true);
  };

  useEffect(() => {
    onSnapshot(collection(db, "positions"), (snapshot) => {
      console.log(snapshot);
    });
  });

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
      />
      {/* Close <BrowserRouter />... */}
    </div>
  );
}

export default App;
