import { input, select } from "@inquirer/prompts";
import chalk from "chalk";

export async function askQuestions() {
  const projectName = await input({
    message: "Nombre del proyecto:",
    default: "my-express-app",
  });

  const language = await select({
    message: "💻 Seleccione el lenguaje:",
    choices: [
      { name: chalk.yellow("JavaScript"), value: "JavaScript" },
      { name: chalk.blue("TypeScript"), value: "TypeScript" },
    ],
    default: "JavaScript",
  });

  const packageManager = await select({
    message: "Seleccione el gestor de paquetes:",
    choices: [
      { name: chalk.red("npm"), value: "npm" },
      { name: chalk.blue("yarn"), value: "yarn" },
      { name: chalk.green("pnpm"), value: "pnpm" },
      { name: chalk.white("bun"), value: "bun" },
    ],
    default: "npm",
  });

  return { projectName, language, packageManager };
}
