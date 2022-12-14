export default function Scores({ scores }) {
  let place = 0;
  return (
    <section className="scores-container">
      <h5 className="hall-fame">Hall of Fame</h5>
      <table className="scores-table">
        <tbody>
          <tr>
            <th>World Rank</th>
            <th className="th-name">Name</th>
            <th>Score</th>
          </tr>
          {scores.map((user) => {
            let inSeconds = (user.score / 1000).toFixed(2);

            const formattedTime = inSeconds + " s";

            return (
              <tr key={user.id}>
                <td className="td-place">{(place = place + 1)}</td>
                <td className="td-name">{user.name}</td>
                <td>{formattedTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <span className="hall-fame-foot">
        The Hall of Fame sits up to 100 legends!
      </span>
    </section>
  );
}
