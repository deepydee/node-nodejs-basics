const parseEnv = () => {
    const rssEnvVariables = Object.entries(process.env)
        .filter(([key, _]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`);

    const formattedEnvVariables = rssEnvVariables.join('; ');

    console.log(formattedEnvVariables);
};

parseEnv();