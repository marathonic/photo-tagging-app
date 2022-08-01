import GameArea from "./components/GameArea";
import Header from "./components/Header";
import Play from "./pages/Play";
import React, { useState } from "react";
import { Modal } from "./components/Modal";

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
