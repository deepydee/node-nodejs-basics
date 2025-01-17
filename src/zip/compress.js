import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inFile = join(__dirname, 'files', 'fileToCompress.txt');
const outFile = join(__dirname, 'files', 'archive.gz');

/**
 * Implement function that compresses file `fileToCompress.txt` to `archive.gz`
 * using zlib and Streams API
 */
const compress = async () => {
    pipeline(
        createReadStream(inFile),
        createGzip(),
        createWriteStream(outFile),
        (err) => {
            if (err) {
              console.error('Pipeline failed', err);
            } else {
              console.log('File compressed successfully');
            }
        }
      );
};

await compress();