import path from 'path';
import os from 'os';
import http from 'http';
import url from 'url';
import fs from 'fs';

/**
 * You should refactor file (you can add additional imports if needed)
 * `cjsToEsm.cjs` - rewrite it to it's equivalent in ECMAScript notation
 * (and rename it to `esm.mjs`)
 */
const { release, version } = os;
const { createServer } = http;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import './files/c.js';

const random = Math.random();
let unknownObject;

if (random > 0.5) {
    unknownObject = JSON.parse(fs.readFileSync(path.join(__dirname, './files/a.json')));
} else {
    unknownObject = JSON.parse(fs.readFileSync(path.join(__dirname, './files/b.json')));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };

