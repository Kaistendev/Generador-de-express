#!/usr/bin/env node
import { askQuestions } from "../lib/question.js";
import { createStructure } from "../lib/structure.js";
import { installDependencies } from "../lib/dependencies.js";

const answers = await askQuestions();

await createStructure(answers.projectName, answers.language);
await installDependencies(
  answers.projectName,
  answers.packageManager,
  answers.language
);

console.log(
  `🎉 Proyecto ${answers.projectName} creado con éxito usando ${answers.packageManager}!`
);
