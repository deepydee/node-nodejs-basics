import { createWriteStream } from 'node:fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToWrite.txt');

/**
 * Implement function that writes process.stdin data into file `fileToWrite.txt`
 * content using Writable Stream
 */
const write = async () => {
    const writeStream = createWriteStream(filePath);

    process.stdin.on('data', (chunk) => {
        writeStream.write(chunk);
    });

    await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });

    writeStream.end();
};

await write();