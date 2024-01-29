import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createGunzip } from 'node:zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inFile = join(__dirname, 'files', 'archive.gz');
const outFile = join(__dirname, 'files', 'fileToCompress.txt');

/**
 * Implement function that decompresses `archive.gz` back to the
 * `fileToCompress.txt` with same content as before compression using zlib
 * and Streams API
 */
const decompress = async () => {
    pipeline(
        createReadStream(inFile),
        createGunzip(),
        createWriteStream(outFile),
        (err) => {
            if (err) {
              console.error('Pipeline failed', err);
            } else {
              console.log('File decompressed successfully');
            }
        }
      );
};

await decompress();