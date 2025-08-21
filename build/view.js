import { getRandomJoke, jokesRecord } from "./index.js";
const jokeElement = document.getElementById('joke');
const jokeButton = document.getElementById('joke-button');
const weatherElement = document.getElementById('weather');
getRandomJoke().then((joke) => {
    jokeElement.innerHTML = `${joke.joke}`;
    jokesRecord.push(joke);
}).catch((error) => {
    console.error('Error fetching joke:', error);
});
jokeButton.addEventListener('click', () => {
    getRandomJoke().then((joke) => {
        jokeElement.innerHTML = `${joke.joke}`;
        jokesRecord.push(joke);
        console.log(joke);
    }).catch((error) => {
        console.error('Error fetching joke:', error);
    });
});
//# sourceMappingURL=view.js.map