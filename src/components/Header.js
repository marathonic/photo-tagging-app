const BountyBar = ({ allPositions, previouslyFound }) => {
  const persons = allPositions.map((person) => {
    const conditionalGray = {
      filter: previouslyFound.includes(person.name)
        ? "brightness(120%) opacity(50%)"
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
      <ul className="finder-container">{persons}</ul>
    </header>
  );
};

export default BountyBar;
