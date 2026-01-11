import { execSync } from "child_process";
import path from "path";

export async function installDependencies(
  projectName,
  packageManager,
  language
) {
  const dependencies = ["express", "cors", "dotenv", "nodemon"];
  const devDependencies = [];

  if (language === "TypeScript") {
    devDependencies.push(
      "typescript",
      "ts-node",
      "@types/node",
      "@types/express",
      "@types/cors"
    );
  }

  const basePath = path.join(process.cwd(), projectName);

  const managers = {
    npm: { install: "npm install", dev: "npm install -D" },
    yarn: { install: "yarn add", dev: "yarn add -D" },
    pnpm: { install: "pnpm add", dev: "pnpm add -D" },
    bun: { install: "bun add", dev: "bun add -d" },
  };

  const installCmd = managers[packageManager].install;
  const devInstallCmd = managers[packageManager].dev;

  console.log(`📦 Instalando dependencias con ${packageManager}...`);

  // Install regular dependencies
  execSync(`${installCmd} ${dependencies.join(" ")}`, {
    cwd: basePath,
    stdio: "inherit",
  });

  // Install dev dependencies if any
  if (devDependencies.length > 0) {
    console.log(`🛠️ Instalando dependencias de desarrollo...`);
    execSync(`${devInstallCmd} ${devDependencies.join(" ")}`, {
      cwd: basePath,
      stdio: "inherit",
    });
  }

  console.log("✅ Dependencias instaladas con éxito!");
}
