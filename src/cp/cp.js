import { spawn } from 'node:child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
     // Create a child process with IPC enabled
    const child = spawn('node', [join(__dirname, 'files', 'script.js'), ...args], {
        stdio: ['pipe', 'pipe', process.stderr, 'ipc']
    });

    // Forward stdin from the master process to the child process
    process.stdin.pipe(child.stdin);

    // Forward stdout from the child process to the master process stdout
    child.stdout.pipe(process.stdout);

    // Handle child process exit
    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
