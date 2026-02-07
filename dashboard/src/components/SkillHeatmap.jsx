import { Card, Text, SimpleGrid, Badge } from "@mantine/core";

const SkillHeatmap = ({ data }) => {
  const skillCount = {};

  data.forEach((c) => {
    c.skills.split(",").forEach((skill) => {
      const s = skill.trim();
      skillCount[s] = (skillCount[s] || 0) + 1;
    });
  });

  return (
    <Card shadow="sm" padding="lg">
      <Text fw={700} mb="sm">Skill Heatmap</Text>

      <SimpleGrid cols={3}>
        {Object.entries(skillCount).map(([skill, count]) => (
          <Badge
            key={skill}
            size="lg"
            variant="filled"
            color={count > 10 ? "green" : count > 5 ? "blue" : "gray"}
          >
            {skill} ({count})
          </Badge>
        ))}
      </SimpleGrid>
    </Card>
  );
};

export default SkillHeatmap;
