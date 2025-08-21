const jokeElement = document.getElementById('joke');
const jokeButton = document.getElementById('joke-button');
const getRandomJoke = async () => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        },
        method: 'GET'
    });
    const data = await response.json();
    return data.joke;
};
getRandomJoke().then((joke) => {
    jokeElement.innerHTML = joke;
}).catch((error) => {
    console.error('Error fetching joke:', error);
});
jokeButton.addEventListener('click', () => {
    getRandomJoke().then((joke) => {
        jokeElement.innerHTML = joke;
        console.log(joke);
    }).catch((error) => {
        console.error('Error fetching joke:', error);
    });
});
export {};
//# sourceMappingURL=index.js.map