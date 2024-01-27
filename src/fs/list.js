import { existsSync, readdir } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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