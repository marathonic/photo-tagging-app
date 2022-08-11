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
            // let inMinutes = null;
            // if (inSeconds > 60) {
            //   let mins = Math.floor(user.score / 6000);
            //   let secs = ((user.score % 6000) / 1000).toFixed(0);
            //   inMinutes = mins + "Min, " + secs < 10 ? "0" : "" + secs + "S";
            // }

            const formattedTime = inSeconds + " s";
            // const formattedTime = inSeconds < 60 ? inSeconds + " s" : inMinutes;

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
    </section>
  );
}
