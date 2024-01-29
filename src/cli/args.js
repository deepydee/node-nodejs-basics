/**
 * Implement function that parses command line arguments
 * (given in format --propName value --prop2Name value2,
 * you don't need to validate it) and prints them to the console in the format
 * propName is value, prop2Name is value2
 */
const parseArgs = () => {
    const args = process.argv.slice(2);

    for (let i = 0; i < args.length; i += 2) {
        // Assuming the format is always correct as per the given specification
        // Extract property name by removing the leading '--'
        const propName = args[i].slice(2);

        // Extract corresponding value
        const value = args[i + 1];

        console.log(`${propName} is ${value}`);
    }
};

parseArgs();