import { faker } from "@faker-js/faker";
import fs from "fs";

const skillsList = [
  "Leadership",
  "Lean Manufacturing",
  "Crisis Response",
  "Sustainability",
  "Team Building",
  "Problem Solving",
  "Risk Management",
  "Quality Control",
];

let sql = "";

for (let i = 1; i <= 40; i++) {
  const name = faker.person.fullName();
  const exp = faker.number.int({ min: 1, max: 15 });
  const skills = faker.helpers.arrayElements(skillsList, 3).join(", ");

  const crisis = faker.number.int({ min: 1, max: 10 });
  const sustainability = faker.number.int({ min: 1, max: 10 });
  const motivation = faker.number.int({ min: 1, max: 10 });

  sql += `
INSERT INTO candidates (id, name, experience, skills)
VALUES (${i}, "${name}", ${exp}, "${skills}");

INSERT INTO evaluations (candidate_id, crisis_score, sustainability_score, motivation_score)
VALUES (${i}, ${crisis}, ${sustainability}, ${motivation});
`;
}

fs.writeFileSync("sample_data.sql", sql);
console.log("✅ sample_data.sql created with 40 candidates");
