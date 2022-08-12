import BountyBar from "./components/Header";
import Play from "./pages/Play";
import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import db from "./firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import Home from "./pages/Home";
import Scores from "./pages/Scores";

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
  const [allPositions, setAllPositions] = useState([]);
  const [previouslyFound, setPreviouslyFound] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [scores, setScores] = useState([]);

  const openModal = (lastPosition) => {
    setShowModal(true);
  };

  // configure the coordinates
  useEffect(
    () =>
      onSnapshot(collection(db, "positions"), (snapshot) =>
        setAllPositions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    []
  );

  //  get the high scores and arrange in descending order
  useEffect(() => {
    const collectionRef = collection(db, "scores");
    const q = query(collectionRef, orderBy("score", "asc"));
    const unsub = onSnapshot(q, (snapshot) =>
      setScores(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, []);

  // Try switching to if(previouslyFound.length === allPositions.length)
  // We've removed the alert from the useEffect below
  useEffect(() => {
    if (previouslyFound.length === 4) {
      setIsGameOver(true);
      setTotalTime(Math.abs(new Date() - startTime));
    }
  }, [previouslyFound, startTime]);

  console.log(previouslyFound);

  const location = useLocation();
  const rectangularNav = {
    borderRadius: location.pathname === "/play" ? "0px" : "",
  };

  return (
    <>
      <nav className="nav-bar" style={rectangularNav}>
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/scores">Scores</Link>
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
        <Route path="/scores" element={<Scores scores={scores} />}></Route>
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
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              setGameTime={setGameTime}
              myScore={myScore}
              setMyScore={setMyScore}
              totalTime={totalTime}
              setTotalTime={setTotalTime}
            />
          }
        />
      </Routes>
    </>
  );
}
