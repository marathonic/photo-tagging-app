import Header from "../components/Header";
import GameArea from "../components/GameArea";
import { useState } from "react";

export default function Play({
  openModal,
  setLastClickPosition,
  lastClickPosition,
  setClientClickPosition,
  lastFound,
  setLastFound,
  allPositions,
  previouslyFound,
  setPreviouslyFound,
}) {
  console.log(allPositions);

  const clickPosition = (e) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    console.log("Coordinates clicked: ");
    console.log(xCoord, yCoord);

    // we could bundle these into const rogue
    // We want to rework this logic to work alongside our Firebase integration
    // Loop over each object in our database, and
    // if the click coordinates here match those values,
    // get the [name] value, which will be 'rogue' in this case.
    // reworked: const matchesX = xCoord >= myObj.xMin && myObj.xCoord <= xMax;
    // reworked: const matchesY = yCoord >= myObj.yMin && yCoord <= myObj.yMax;
    // reworked: if (matchesX && matchesY) {
    // reworked: console.log(`You found ${myObj.name}!`); // <--- "You found rogue!"
    // reworked: setLastFound(myObj.name); // <--- lastFound === 'rogue'
    // reworked: }
    // const matchesX = xCoord >= 74 && xCoord <= 82;
    // const matchesY = yCoord >= 83 && xCoord <= 91;
    // if (matchesX && matchesY) {
    // console.log("You found Rogue!");
    // setLastFound("rogue");
    // IMPORTANT:
    // Change lastFound below to be myObj.name;
    // setPreviouslyFound(...previouslyFound, lastFound);
    // }
    //what we're trying to figure out:
    // Take the click coordinates and check if it falls between the ranges
    // of any 1 object inside of our database(allPositions).
    // If so, console log the object's --name-- property.
    for (let i = 0; i < allPositions.length; i++) {
      const curr = allPositions[i];
      let found = "found";
      // same as saying: if (xCoord => curr.xMin && xCoord <= curr.xMax) {
      if (curr.xMin <= xCoord && xCoord <= curr.xMax) {
        if (curr.yMin <= yCoord && yCoord <= curr.yMax) {
          // WHY WE NEED LASTFOUND:
          // We want lastFound because we need to ask the player:
          // Who is that? / Who did you find?
          // Then they'll pick one of the options, and that's where lastFound comes in,
          // because we will check that the name of that clicked character is === lastFound
          // all previously found characters will have their images greyed out
          // if the clicked character is not yet part of previouslyFound, add it to previouslyFound.
          // Alternatively, we could also display info about the character when the click coordinates match those of someone in previouslyFound.
          // For example, if we find Rogue, and then we click on her again, we could get a modal that says:
          // <img src= curr.headshot />, <h4>{curr.name}</h4> (same as: Rogue). <span>{curr.affiliation}</span>(same as: Affiliation: X-Men), description, etc.
          setLastFound(curr.name);
          found = curr.name;
          setPreviouslyFound((prevState) => {
            const prev = prevState.filter((person) => person !== found);
            return [...prev, found];
          });
        }
      }

      // setPreviouslyFound();
    }

    // lastClickPosition is used to place the modal
    setLastClickPosition({
      x: xCoord,
      y: yCoord,
    });
    openModal();

    // new code:
    var rect = e.target.getBoundingClientRect(); // get some position, scale,... properties of the item
    let mousePos = { x: 0, y: 0 };
    mousePos.x = e.clientX - rect.left; // get the mouse position relative to the element
    mousePos.y = e.clientY - e.target.scrollTop; //

    // test console log
    console.log(window.innerWidth);
    setClientClickPosition({ x: mousePos.x, y: mousePos.y });
  };

  return (
    <>
      {/* We don't need a header here!!! We'll have Navbar. */}
      <Header />
      {/* ^We don't need a header here!!! We'll have Navbar. */}
      {/* So do we even  need a separate <GameArea /> ? We could just do all that right here */}
      <GameArea clickPosition={clickPosition} openModal={openModal} />
    </>
  );
}
