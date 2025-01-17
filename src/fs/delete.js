import { existsSync, rm } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Implement function that deletes file `fileToRemove.txt`
 * (if there's no file `fileToRemove.txt` Error with message `FS operation failed`
 * must be thrown)
 */
const remove = async () => {
    const filePath = join(__dirname, 'files', 'fileToRemove.txt');

    try {
        if (!existsSync(filePath)) {
          throw new Error('FS operation failed');
        }

        rm(filePath, { recursive: true }, (err) => {
            if (err) throw err;
            console.log('Removed!');
        });
    } catch (err) {
        console.error(err);
    }
};

await remove();