const BountyBar = ({ allPositions, previouslyFound }) => {
  const persons = allPositions.map((person) => {
    const conditionalGray = {
      filter: previouslyFound.includes(person.name)
        ? "brightness(70%) contrast(70%)"
        : "brightness(120%)",
    };

    return (
      <li className="finder-li" key={person.name}>
        <img
          src={person.thumbnail}
          alt={person.className}
          className="finder-thumbnail"
          style={conditionalGray}
        />
      </li>
    );
  });
  return (
    <header className="headr">
      {/* 05 August, 23:33, 
      message for future self from tomorrow:
       CONTINUE HERE!!!
       Let's get the finder container stick to the top once
       we've scrolled past the navbar!
       */}
      <ul className="finder-container">{persons}</ul>
    </header>
  );
};

export default BountyBar;
