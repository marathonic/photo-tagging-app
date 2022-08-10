export default function Scores({ scores }) {
  return (
    <section className="scores-container">
      <h5>Scores</h5>
      <table className="scores-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {scores.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
