import { execSync } from "child_process";
import path from "path";

export async function installDependencies(
  projectName,
  packageManager
) {
  const basePath = path.join(process.cwd(), projectName);

  let installCommand;
  switch (packageManager) {
    case "npm":
      installCommand = "npm install";
      break;
    case "yarn":
      installCommand = "yarn install";
      break;
    case "pnpm":
      installCommand = "pnpm install";
      break;
    case "bun":
      installCommand = "bun install";
      break;
    default:
      console.warn(`Gestor de paquetes desconocido: ${packageManager}. Usando npm install.`);
      installCommand = "npm install";
  }

  console.log(`📦 Instalando dependencias con ${packageManager}...`);
  try {
    execSync(installCommand, {
      cwd: basePath,
      stdio: "inherit",
    });
    console.log("✅ Dependencias instaladas con éxito!");
  } catch (error) {
    console.error(`❌ Error al instalar las dependencias con ${packageManager}:`, error.message);
    throw error; // Rethrow to be caught by the global handler in index.js
  }
}
