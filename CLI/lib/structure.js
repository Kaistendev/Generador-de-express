import fs from "fs";
import path from "path";

export async function createStructure(projectName, language) {
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
}
