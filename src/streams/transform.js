import { Transform } from 'node:stream';

/**
 * Implement function that reads data from process.stdin,
 * reverses text using Transform Stream and then writes it into process.stdout
 */
const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            this.push(
                chunk.toString()
                    .split('')
                    .reverse()
                    .join('')
            );
          callback();
        }
    });

    process.stdin
        .pipe(reverseTransform)
        .pipe(process.stdout);
};

await transform();