import { Worker } from 'node:worker_threads';
import os from 'node:os';

/**
 * Implement function that creates number of worker threads
 * (equal to the number of host machine logical CPU cores) from file `worker.js`
 * and able to send data to those threads and to receive result of the
 * computation from them. You should send incremental number starting from 10
 * to each worker. For example: on host machine with 4 cores you should create 4
 * workers and send 10 to first worker, 11 to second worker, 12 to third worker,
 * 13 to fourth worker. After all workers will finish, function should log array
 * of results into console. The results are array of objects with 2 properties:
 *  - status - 'resolved' in case of successfully received value from worker or
 * 'error' in case of error in worker
 *  - data - value from worker in case of success or null in case of error in
 * worker
 * The results in the array must be in the same order that the workers were created
 */
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
