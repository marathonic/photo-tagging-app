import GameArea from "./components/GameArea";
import Header from "./components/Header";
import Play from "./pages/Play";
import React, { useState } from "react";
import { Modal } from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="app-container">
      {/* We actually need a routed nav, not just a header! */}
      {/* <BrowserRouter> ...  */}
      {showModal ? <Modal setShowModal={setShowModal} /> : null}
      <Play openModal={openModal} />
      {/* Close <BrowserRouter />... */}
    </div>
  );
}

export default App;
