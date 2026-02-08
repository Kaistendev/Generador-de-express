#!/usr/bin/env node
import { askQuestions } from "../lib/question.js";
import { createStructure } from "../lib/structure.js";
import { installDependencies } from "../lib/dependencies.js";

try {
  const answers = await askQuestions();

  await createStructure(answers.projectName, answers.language);
  await installDependencies(
    answers.projectName,
    answers.packageManager
  );

  console.log(
    `🎉 Proyecto ${answers.projectName} creado con éxito usando ${answers.packageManager}!`
  );
} catch (error) {
  console.error("❌ Ocurrió un error inesperado durante la creación del proyecto:", error.message);
  process.exit(1);
}
