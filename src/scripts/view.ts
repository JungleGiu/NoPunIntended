import { getRandomJoke, rateJoke, getWeather } from "./main.js";
import type { Joke } from "./types.js";
import type { Weather } from "./types.js";

const jokeElement = document.getElementById("joke") as HTMLDivElement;
const jokeButton = document.getElementById("joke-button") as HTMLButtonElement;
const jokeBackground = document.querySelector(
  ".joke-overlay"
) as HTMLDivElement;
const jokeRating = document.querySelectorAll(
  'input[name="score"]'
) as NodeListOf<HTMLInputElement>;
let currentJoke: Joke | null = null;

const weatherElement = document.getElementById("weather") as HTMLDivElement;
let currentWeather: Weather | null = null;

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
  .then((joke: Joke) => {
    currentJoke = joke;
    jokeElement.innerHTML = `${joke.joke}`;
  })
  .catch((error: Error) => {
    console.error("Error fetching joke:", error);
  });

jokeButton.addEventListener("click", () => {
  nextBlob();
  getRandomJoke()
    .then((joke: Joke) => {
      currentJoke = joke;
      jokeElement.innerHTML = `${joke.joke}`;
      jokeRating.forEach((radio: HTMLInputElement) => {
        radio.checked = false;
      });
      console.log(joke);
    })
    .catch((error: Error) => {
      console.error("Error fetching joke:", error);
    });
});

jokeRating.forEach((input) => {
  input.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    const score = parseInt(target.value) as 1 | 2 | 3;
    if (currentJoke) {
      rateJoke(currentJoke, score);
    }
  });
});

getWeather()
  .then((weather: Weather) => {
    currentWeather = weather;
    weatherElement.innerHTML = `<img src="${weather.icon}" alt="${weather.description}">
    <p>${weather.location}</p>
    <p>${weather.description} <span>${weather.temperature}°C</span></p> <br>
    `;
  })
  .catch((error: Error) => {
    console.error("Error fetching weather:", error);
  });
