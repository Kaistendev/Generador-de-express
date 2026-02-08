import fs from "fs";
import path from "path";

export async function createStructure(projectName, language) {
  try {
    const basePath = path.join(process.cwd(), projectName);
    fs.mkdirSync(basePath, { recursive: true });
    [
      "routes",
      "controllers",
      "middlewares",
      "services",
      "tests",
      "utils",
    ].forEach((dir) =>
      fs.mkdirSync(path.join(basePath, `src/${dir}`), { recursive: true })
    );

    const isTs = language === "TypeScript";
    const ext = isTs ? "ts" : "js";

    // app file
    fs.writeFileSync(
      path.join(basePath, `src/app.${ext}`),
      `
import express${isTs ? ", { Application }" : ""} from 'express';
const app${isTs ? ": Application" : ""} = express();
app.use(express.json());
app.get('/', (req, res) => { res.send('<h1>Hello World!</h1>') });
export default app;
  `
    );

    // server file
    fs.writeFileSync(
      path.join(basePath, `server.${ext}`),
      `
import app from './src/app.${ext}';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port http://localhost:\${PORT}\`));
  `
    );

    // package.json
    const scripts = isTs
      ? {
          start: "ts-node server.ts",
          dev: "nodemon server.ts",
          build: "tsc",
        }
      : {
          start: "node server.js",
          dev: "nodemon server.js",
        };

    fs.writeFileSync(
      path.join(basePath, "package.json"),
      JSON.stringify(
        {
          name: projectName,
          version: "1.0.0",
          main: `server.${ext}`,
          type: "module",
          scripts: scripts,
          dependencies: {
            express: "^5.2.1",
            dotenv: "^17.2.3",
            cors: "^2.8.5",
          },
          devDependencies: {
            nodemon: "^3.1.11",
            ...(isTs && {
              typescript: "^5.x.x",
              "@types/node": "^20.x.x",
              "@types/express": "^4.x.x",
              "ts-node": "^10.x.x",
            }),
          },
        },
        null,
        2
      )
    );

    // tsconfig.json
    if (isTs) {
      fs.writeFileSync(
        path.join(basePath, "tsconfig.json"),
        JSON.stringify(
          {
            compilerOptions: {
              target: "es6",
              module: "module",
              outDir: "./dist",
              rootDir: "./",
              strict: true,
              esModuleInterop: true,
              skipLibCheck: true,
              forceConsistentCasingInFileNames: true,
            },
            exclude: ["node_modules"],
          },
          null,
          2
        )
      );
    }
    //.env
    fs.writeFileSync(path.join(basePath, ".env"), `PORT=3000`);
    fs.writeFileSync(path.join(basePath, ".gitignore"), `node_modules .env`);
  } catch (error) {
    console.error(`❌ Error al crear la estructura del proyecto ${projectName}:`, error.message);
    throw error; // Rethrow to be caught by the global handler in index.js
  }
}
