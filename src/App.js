import GameArea from "./components/GameArea";
import Header from "./components/Header";
import Play from "./pages/Play";
import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Modal } from "./components/Modal";
import db from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";
import Home from "./pages/Home";

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

  useEffect(
    () =>
      onSnapshot(collection(db, "positions"), (snapshot) =>
        setAllPositions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    []
  );

  console.log(previouslyFound);

  return (
    // Pages (from left to right on navbar):
    // i Information
    // Play (level select), game controller icon
    // Leaderboards
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/play">Play</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home allPositions={allPositions} />}></Route>
        <Route
          path="/play"
          element={
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
              showModal={showModal}
              clientClickPosition={clientClickPosition}
              setShowModal={setShowModal}
            />
          }
        />
        {/* Close <BrowserRouter />... */}
      </Routes>
    </>
  );
}
