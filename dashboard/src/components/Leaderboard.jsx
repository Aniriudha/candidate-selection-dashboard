export default function Leaderboard({ data }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Total Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.id}>
            <td>{c.rank}</td>
            <td>{c.name}</td>
            <td>{c.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
