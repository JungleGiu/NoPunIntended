import { getRandomJoke, rateJoke } from "./index.js";
import type { Joke } from "./index.js";

const jokeElement = document.getElementById("joke") as HTMLDivElement;
const jokeButton = document.getElementById("joke-button") as HTMLButtonElement;
const jokeRating = document.querySelectorAll('input[name="score"]') as NodeListOf<HTMLInputElement>;
const weatherElement = document.getElementById("weather") as HTMLDivElement;
let currentJoke: Joke | null = null;

getRandomJoke()
  .then((joke: Joke) => {
    currentJoke = joke;
    jokeElement.innerHTML = `${joke.joke}`;
  })
  .catch((error: Error) => {
    console.error("Error fetching joke:", error);
  });

jokeButton.addEventListener("click", () => {
  getRandomJoke()
    .then((joke: Joke) => {
      currentJoke = joke;
      jokeElement.innerHTML = `${joke.joke}`;
      jokeRating.forEach((radio: HTMLInputElement) => {
        radio.checked = false;
      })
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
