export default function CandidateCard({ c }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{c.name}</h3>
      <p>Experience: {c.experience} years</p>
      <p>Skills: {c.skills}</p>
      <p>Total Score: {c.score}</p>
    </div>
  );
}
