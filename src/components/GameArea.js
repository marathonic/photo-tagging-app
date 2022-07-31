export default function GameArea() {
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
    console.log("HELLO!!!");
    alert("Hello");
  };

  window.onload = function () {
    // const imgWidth = document.body.clientWidth / 2469;
    var ImageMap = function (map, img) {
        var n,
          areas = map.getElementsByTagName("area"),
          len = areas.length,
          coords = [],
          previousWidth = 856; // should be the original image width (856)
        for (n = 0; n < len; n++) {
          coords[n] = areas[n].coords.split(",");
        }
        this.resize = function () {
          var n,
            m,
            clen,
            x = img.offsetWidth / previousWidth;
          // x = imgWidth;
          for (n = 0; n < len; n++) {
            clen = coords[n].length;
            for (m = 0; m < clen; m++) {
              coords[n][m] *= x;
            }
            areas[n].coords = coords[n].join(",");
          }
          previousWidth = document.body.clientWidth;
          return true;
        };
        window.onresize = this.resize;
      },
      imageMap = new ImageMap(
        document.getElementById("super-map-id"),
        document.getElementById("img_ID")
      );
    imageMap.resize();
    return;
  };

  return (
    <>
      <div className="game-area-container">
        <img
          id="img_ID"
          src="./superheroes-edit.jpg"
          useMap="#superheroes-map"
          border="0"
          width={"100%"}
          alt=""
        />
      </div>
      <map id="super-map-id" name="superheroes-map">
        <area
          shape="circle"
          coords="640,1790,60" //552, 1058 for Mjolnir, 640, 1790 for Elektra
          alt="test"
          href=""
          title="title one"
          style={{ cursor: "pointer", border: "red" }}
          onClick={testFunc}
        ></area>
      </map>
    </>
  );
}

//<-------------OLD CODE DOCUMENT BACKUP BELOW ----------->

/*
export default function GameArea() {
  //find:
  //  Rogue, Martian Manhunter, Moon Knight, Ramona Flowers

  const getClickCoordinates = (e) => {
    let rect = e.currentTarget.getBoundingClientRect();
    // let x = e.clientX - rect.left;
    let x = e.screenX;
    let y = e.offsetY;
    console.log(x);
    console.log(`left: ${x} top: ${y}`);
  };

  const testFunc = () => {
    console.log(window.innerWidth);
    alert("Hello");
  };

  const imgHeight = window.innerHeight / 856;

  // window.onload = function () {
  //   const imgWidth = document.body.clientWidth / 2469;
  //   var ImageMap = function (map) {
  //       var n,
  //         areas = map.getElementsByTagName("area"),
  //         len = areas.length,
  //         coords = [],
  //         previousWidth = imgWidth; // should be the original image width (856)
  //       for (n = 0; n < len; n++) {
  //         coords[n] = areas[n].coords.split(",");
  //       }
  //       this.resize = function () {
  //         var n,
  //           m,
  //           clen,
  //           x = document.body.clientWidth / previousWidth;
  //         // x = imgWidth;
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
  //     imageMap = new ImageMap(document.getElementById("super-map-id"));
  //   imageMap.resize();
  // };

  const adjustedX = window.innerWidth / 640;
  const adjustedY = window.innerHeight / 1790;
  const radiusTest = 30;

  return (
    <div className="game-area-container">
      <img
        src="./superheroes-edit.jpg"
        alt="supers"
        className="superheroes-img"
        id="superheroes-map"
        useMap="#superheroes-map"
        onClick={getClickCoordinates}
      />
      <map name="superheroes-map" id="super-map-id">
        <area
          shape="circle"
          coords={`${adjustedX * 640}, ${adjustedY}, ${radiusTest} `} //552, 1058 for Mjolnir, 640, 1790 for Elektra
          alt="test"
          href="#"
          style={{ cursor: "pointer", border: "red" }}
          onClick={testFunc}
        ></area>
      </map>
    </div>
  );
}

*/
