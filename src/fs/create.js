import { existsSync, promises as fsPromises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Implement function that creates new file fresh.txt with content `I am fresh
 * and young` inside of the files folder (if file already exists Error with
 * message FS operation failed must be thrown)
 */
const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');

    try {
      if (existsSync(filePath)) {
        throw new Error('FS operation failed');
      }

      await fsPromises.writeFile(filePath, 'I am fresh and young');
    } catch (err) {
      console.error(err);
    }
};

await create();