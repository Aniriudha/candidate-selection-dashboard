import { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";
import CandidateCard from "./components/CandidateCard";
import ScoreChart from "./components/ScoreChart";
import { Card, Group, Text } from "@mantine/core";
import SkillHeatmap from "./components/SkillHeatmap";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/candidates")
      .then((res) => res.json())
      .then((candidates) => {
        // add rank & score (example logic)
        const scored = candidates.map((c, index) => ({
          ...c,
          score: c.experience * 2, // simple scoring logic
        }));

        // sort by score
        scored.sort((a, b) => b.score - a.score);

        // add rank
        const ranked = scored.map((c, index) => ({
          ...c,
          rank: index + 1,
        }));

        setData(ranked);
      })
      .catch(console.error);
  }, []);


  return (
    <div style={{ padding: 20 }}>
      <h1>Candidate Selection Dashboard</h1>

      {/* Summary Cards */}
      <Group mb="md">
        <Card shadow="sm" padding="lg">
          <Text>Total Candidates</Text>
          <Text fw={700}>{data.length}</Text>
        </Card>

        <Card shadow="sm" padding="lg">
          <Text>Top Score</Text>
          <Text fw={700}>{data.length > 0 ? data[0].score : 0}</Text>

        </Card>
      </Group>

      <h2>Leaderboard</h2>
<Leaderboard data={data.slice(0, 10)} />

<h2>Skill Heatmap</h2>
<SkillHeatmap data={data.slice(0, 10)} />

<h2>Score Visualization</h2>
<ScoreChart data={data} />

<h2>Candidate Profiles</h2>
{data.map((c) => (
  <CandidateCard key={c.id} c={c} />
))}

    </div>
  );
}

export default App;
