import { input, select } from "@inquirer/prompts";
import chalk from "chalk";

export async function askQuestions() {
  const projectName = await input({
    message: "Nombre del proyecto:",
    default: "my-express-app",
    validate: (input) => {
      if (input.trim() === "") {
        return "El nombre del proyecto no puede estar vacío.";
      }
      // Basic validation for path traversal and invalid characters
      // Allows alphanumeric, hyphens, and underscores. Prevents starting with '.' or '..'
      const isValid = /^(?!(\.|\.\.)$)[a-zA-Z0-9_-]+$/.test(input);
      if (!isValid) {
        return "El nombre del proyecto solo puede contener letras, números, guiones y guiones bajos, y no puede ser '.' o '..'";
      }
      return true;
    },
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
