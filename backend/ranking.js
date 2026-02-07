export function calculateTotalScore(c) {
  return (
    c.crisis_score * 0.4 +
    c.sustainability_score * 0.3 +
    c.motivation_score * 0.3
  );
}
