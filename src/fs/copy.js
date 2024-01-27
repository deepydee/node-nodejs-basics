import { existsSync, cp } from 'fs';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const src = join(__dirname, 'files');
    const dest = join(__dirname, 'files_copy');

    try {
        if (existsSync(dest)) {
          throw new Error('FS operation failed');
        }

        await mkdir(dest);
        cp(src, dest, { recursive: true }, (err) => {
            if (err) throw err;
            console.log('Copied!');
        });
    } catch (err) {
        console.error(err);
    }
};

await copy();
