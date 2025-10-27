//  scrieți o aplicație simplă care creează un director, un fișier în director și apoi șterge directorul (puteți utiliza rimraf).

import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirToCreate = path.join(__dirname, "my-test-dir");
const fileToCreate = path.join(dirToCreate, "new-file.txt");
const fileContent = "Hello, world!";

async function main() {
  try {
    await fs.mkdir(dirToCreate);
    await fs.writeFile(fileToCreate, fileContent);
    await fs.rm(dirToCreate, { recursive: true, force: true });
  } catch (err) {
    console.error("Error: ", err.message);
  }
}

main();
