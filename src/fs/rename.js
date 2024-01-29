import { existsSync, rename as fsRename } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Implement function that renames file `wrongFilename.txt` to properFilename
 * with extension .md (if there's no file `wrongFilename.txt` or `properFilename.md`
 * already exists Error with message `FS operation failed` must be thrown)
 */
const rename = async () => {
    const src = join(__dirname, 'files', 'wrongFilename.txt');
    const dest = join(__dirname, 'files', 'properFilename.md');

    try {
        if (!existsSync(src)) {
          throw new Error('FS operation failed');
        }

        if (existsSync(dest)) {
          throw new Error('FS operation failed');
        }

        fsRename(src, dest, (err) => {
            if (err) throw err;
            console.log('Renamed!');
        });
    } catch (err) {
        console.error(err);
    }
};

await rename();