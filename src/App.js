import GameArea from "./components/GameArea";
import BountyBar from "./components/Header";
import Play from "./pages/Play";
import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
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
  const [isGameOver, setIsGameOver] = useState(false);
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

  useEffect(() => {
    if (isGameOver) {
      setShowModal(false);
      alert("closing modal from App js");
    }
  }, [isGameOver]);

  console.log(previouslyFound);

  const location = useLocation();
  const rectangularNav = {
    borderRadius: location.pathname === "/play" ? "0px" : "",
  };

  return (
    // Pages (from left to right on navbar):
    // i Information
    // Play (level select), game controller icon
    // Leaderboards
    <>
      <nav className="nav-bar" style={rectangularNav}>
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/scoreboard">Scores</Link>
          </li>
        </ul>
      </nav>
      {location.pathname === "/play" && (
        <BountyBar
          allPositions={allPositions}
          previouslyFound={previouslyFound}
        />
      )}
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
              setIsGameOver={setIsGameOver}
              isGameOver={isGameOver}
            />
          }
        />
        {/* Close <BrowserRouter />... */}
      </Routes>
    </>
  );
}
