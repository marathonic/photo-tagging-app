import GameArea from "./components/GameArea";
import Header from "./components/Header";
import Play from "./pages/Play";

function App() {
  return (
    <div className="app-container">
      {/* We actually need a routed nav, not just a header! */}
      {/* <BrowserRouter> ...  */}
      <Play />
      {/* Close <BrowserRouter />... */}
    </div>
  );
}

export default App;
