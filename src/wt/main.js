import { Worker } from 'node:worker_threads';
import os from 'node:os';

const performCalculations = async () => {
    const numWorkers = os.cpus().length;
    const workers = [];
    const promises = [];

    for(let i = 0; i < numWorkers; i++) {
        const worker = new Worker(new URL('./worker.js', import.meta.url));
        workers.push(worker);

        const data = 10 + i;
        worker.postMessage(data);

        const promise = new Promise((resolve, reject) => {
            worker.on('message', (result) => {
                resolve({ status: 'resolved', data: result });
                worker.terminate();
            });
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });

        promises.push(promise);
    }

    try {
        const results = await Promise.all(promises);
        console.log(results);
    } catch (err) {
        console.error(err);
    }
};

await performCalculations().catch(console.error);
