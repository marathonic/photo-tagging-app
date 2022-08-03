export default function GameArea({
  clickPosition,
  showSelectionModal,
  openModal,
}) {
  //find:
  //  Rogue, Martian Manhunter, Moon Knight, Ramona Flowers

  // const getClickCoordinates = (e) => {
  //   let rect = e.currentTarget.getBoundingClientRect();
  //   // let x = e.clientX - rect.left;
  //   let x = e.screenX;
  //   let y = e.offsetY;
  //   console.log(x);
  //   console.log(`left: ${x} top: ${y}`);
  // };

  const testFunc = () => {
    alert("Hello");
  };

  const getClickCoords = (e) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );
    // console.log("X at: " + xCoord);
    // console.log("Y at: " + yCoord);

    // Another function, maybe this one's parent:

    // const isMatch = () => {
    // if X matches (falls in the range of) the location of Rogue's head, the following const is true.
    const matchesX = xCoord >= 74 && xCoord <= 82;
    const matchesY = yCoord >= 83 && xCoord <= 91;
    // if (matchesX && matchesY) {
    //   console.log("Rogue");
    // }
    // };
  };

  // Attempting to position modal at mouse click position:

  // window.onload = function () {
  //   var ImageMap = function (map, img) {
  //       var n,
  //         areas = map.getElementsByTagName("area"),
  //         len = areas.length,
  //         coords = [],
  //         previousWidth = 856; // should be the original image width (856)
  //       for (n = 0; n < len; n++) {
  //         coords[n] = areas[n].coords.split(",");
  //       }
  //       this.resize = function () {
  //         var n,
  //           m,
  //           clen,
  //           x = img.offsetWidth / previousWidth;
  //         for (n = 0; n < len; n++) {
  //           clen = coords[n].length;
  //           for (m = 0; m < clen; m++) {
  //             coords[n][m] *= x;
  //           }
  //           areas[n].coords = coords[n].join(",");
  //         }
  //         previousWidth = document.body.clientWidth;
  //         return true;
  //       };
  //       window.onresize = this.resize;
  //     },
  //     imageMap = new ImageMap(
  //       document.getElementById("super-map-id"),
  //       document.getElementById("img_ID")
  //     );
  //   imageMap.resize();
  //   return;
  // };

  return (
    <div className="game-area-container">
      <img
        id="img_ID"
        src="./superheroes-edit.jpg"
        useMap="#superheroes-map"
        border="0"
        width={"100%"}
        alt=""
        onClick={clickPosition}
      />

      {/* We're not using the map anymore */}
      {/* <map id="super-map-id" name="superheroes-map"> */}
      {/* <area */}
      {/* shape="circle" */}
      {/* coords="640,1790,77" //552, 1058 for Mjolnir, 640, 1790 for Elektra */}
      {/* alt="test" */}
      {/* href="#" */}
      {/* title="title one" */}
      {/* style={{ cursor: "pointer", border: "red" }} */}
      {/* onClick={testFunc} */}
      {/* ></area> */}
      {/* </map> */}
    </div>
  );
}
