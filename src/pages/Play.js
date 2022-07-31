import Header from "../components/Header";
import GameArea from "../components/GameArea";

export default function Play() {
  return (
    <>
      {/* We don't need a header here!!! We'll have Navbar. */}
      <Header />
      {/* ^We don't need a header here!!! We'll have Navbar. */}
      {/* So do we even  need a separate <GameArea /> ? We could just do all that right here */}
      <GameArea />
    </>
  );
}
