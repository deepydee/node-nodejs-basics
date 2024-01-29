import { createReadStream } from 'node:fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const readStream = createReadStream(filePath);

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    await new Promise((resolve, reject) => {
        readStream.on('end', resolve);
        readStream.on('error', reject);
    });
};

await read();