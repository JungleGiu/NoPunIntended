import { getRandomJoke, rateJoke, getWeather } from "./main.js";
const jokeElement = document.getElementById("joke");
const jokeButton = document.getElementById("joke-button");
const jokeBackground = document.querySelector(".joke-overlay");
const jokeRating = document.querySelectorAll('input[name="score"]');
let currentJoke = null;
const weatherElement = document.getElementById("weather");
let currentWeather = null;
const nextBlob = () => {
    switch (jokeBackground.className) {
        case "joke-overlay one":
            jokeBackground.className = "joke-overlay two";
            break;
        case "joke-overlay two":
            jokeBackground.className = "joke-overlay three";
            break;
        case "joke-overlay three":
            jokeBackground.className = "joke-overlay four";
            break;
        case "joke-overlay four":
            jokeBackground.className = "joke-overlay one";
            break;
    }
};
getRandomJoke()
    .then((joke) => {
    currentJoke = joke;
    jokeElement.innerHTML = `${joke.joke}`;
})
    .catch((error) => {
    console.error("Error fetching joke:", error);
});
jokeButton.addEventListener("click", () => {
    nextBlob();
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
jokeRating.forEach((input) => {
    input.addEventListener("change", (e) => {
        const target = e.target;
        const score = parseInt(target.value);
        if (currentJoke) {
            rateJoke(currentJoke, score);
        }
    });
});
getWeather()
    .then((weather) => {
    currentWeather = weather;
    weatherElement.innerHTML = `<img src="${weather.icon}" alt="${weather.description}">
    <p>${weather.location}</p>
    <p>${weather.description} <span>${weather.temperature}°C</span></p> <br>
    `;
})
    .catch((error) => {
    console.error("Error fetching weather:", error);
});
//# sourceMappingURL=view.js.map