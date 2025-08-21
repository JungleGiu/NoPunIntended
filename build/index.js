export const jokesRecord = [];
export const getRandomJoke = async () => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        },
        method: 'GET'
    });
    const data = await response.json();
    return data;
};
const rateJoke = (jokeId, score) => {
    const thisJoke = jokesRecord.find((joke) => joke.id === jokeId);
};
//# sourceMappingURL=index.js.map