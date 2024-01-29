import { existsSync, readdir } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Implement function that prints all array of filenames from `files` folder
 * into console (if files folder doesn't exists Error with message `FS operation
 * failed` must be thrown)
 */
const list = async () => {
    const dir = join(__dirname, 'files');

    try {
        if (!existsSync(dir)) {
          throw new Error('FS operation failed');
        }

        const files = readdir(dir, (err, files) => {
            if (err) throw err;

            console.log(files);
        });
    } catch (err) {
        console.error(err);
    }
};

await list();