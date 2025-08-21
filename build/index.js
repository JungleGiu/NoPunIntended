export const jokesRecord = [];
export const getRandomJoke = async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
        method: "GET",
    });
    const data = await response.json();
    return data;
};
export const rateJoke = (joke, score) => {
    const existingJoke = jokesRecord.find((record) => record.id === joke.id);
    if (existingJoke) {
        existingJoke.score = score;
        existingJoke.date = new Date().toISOString();
        console.log(`Joke ${joke.id} rating has been updated`, existingJoke);
    }
    else {
        const newRecord = { ...joke, score, date: new Date().toISOString() };
        jokesRecord.push(newRecord);
        console.log(`Joke ${joke.id} rating has been added`, newRecord);
    }
};
//# sourceMappingURL=index.js.map