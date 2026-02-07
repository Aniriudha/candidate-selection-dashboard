import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import { mockAI } from "./aiEvaluation.js";
import { calculateTotalScore } from "./ranking.js";

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function connectDB() {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ani9474kum095@",
    database: "candidate_selection",
  });
  console.log("MySQL connected");
}

connectDB();

// Get candidates
app.get("/candidates", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM candidates");
  res.json(rows);
});

// Run AI evaluation
app.post("/evaluate", async (req, res) => {
  const [candidates] = await db.execute("SELECT candidate_id FROM evaluations");

  for (const c of candidates) {
    await db.execute(
      `UPDATE evaluations
       SET crisis_score=?, sustainability_score=?, motivation_score=?
       WHERE candidate_id=?`,
      [mockAI(), mockAI(), mockAI(), c.candidate_id]
    );
  }

  res.json({ message: "AI evaluation completed" });
});

// Calculate rankings
app.post("/rankings/recalculate", async (req, res) => {
  await db.execute("DELETE FROM rankings");

  const [rows] = await db.execute("SELECT * FROM evaluations");

  const scored = rows.map(r => ({
    candidate_id: r.candidate_id,
    total: calculateTotalScore(r)
  }));

  scored.sort((a, b) => b.total - a.total);

  let rank = 1;
  for (const s of scored) {
    await db.execute(
      "INSERT INTO rankings (candidate_id, total_score, rank_position) VALUES (?, ?, ?)",
      [s.candidate_id, s.total, rank++]
    );
  }

  res.json({ message: "Rankings updated" });
});

// Dashboard data
app.get("/dashboard-data", async (req, res) => {
  const [data] = await db.execute(`
    SELECT
      c.name,
      c.experience,
      c.skills,
      e.crisis_score,
      e.sustainability_score,
      e.motivation_score,
      r.total_score,
      r.rank_position
    FROM candidates c
    JOIN evaluations e ON c.id = e.candidate_id
    JOIN rankings r ON c.id = r.candidate_id
    ORDER BY r.rank_position
  `);

  res.json(data);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
