import { getRandomJoke, rateJoke } from "./index.js";
const jokeElement = document.getElementById("joke");
const jokeButton = document.getElementById("joke-button");
const jokeRating = document.querySelectorAll('input[name="score"]');
const weatherElement = document.getElementById("weather");
let currentJoke = null;
getRandomJoke()
    .then((joke) => {
    currentJoke = joke;
    jokeElement.innerHTML = `${joke.joke}`;
})
    .catch((error) => {
    console.error("Error fetching joke:", error);
});
jokeButton.addEventListener("click", () => {
    getRandomJoke()
        .then((joke) => {
        currentJoke = joke;
        jokeElement.innerHTML = `${joke.joke}`;
        jokeRating.forEach((radio) => {
            radio.checked = false;
        });
        console.log(joke);
    })
        .catch((error) => {
        console.error("Error fetching joke:", error);
    });
});
jokeRating.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (currentJoke) {
            rateJoke(currentJoke, parseInt(radio.value));
        }
    });
});
//# sourceMappingURL=view.js.map