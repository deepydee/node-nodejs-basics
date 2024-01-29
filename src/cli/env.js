/**
 * Implement function that parses environment variables with prefix RSS_
 * and prints them to the console in the format RSS_name1=value1; RSS_name2=value2
 */
const parseEnv = () => {
    const rssEnvVariables = Object.entries(process.env)
        .filter(([key, _]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`);

    const formattedEnvVariables = rssEnvVariables.join('; ');

    console.log(formattedEnvVariables);
};

parseEnv();