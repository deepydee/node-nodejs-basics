import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const hashStream = createHash('sha256');

    createReadStream(filePath)
        .pipe(hashStream);

    hashStream.on('finish', () => {
        console.log('Hash:', hashStream.read().toString('hex'));
    });

    await new Promise((resolve, reject) => {
        hashStream.on('error', reject);
        hashStream.on('finish', resolve);
    });

    hashStream.end();
};

await calculateHash();