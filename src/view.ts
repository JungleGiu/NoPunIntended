import { getRandomJoke, jokesRecord } from "./index.js";
import type { Joke } from "./index.js";

const jokeElement = document.getElementById("joke") as HTMLDivElement;
const jokeButton = document.getElementById("joke-button") as HTMLButtonElement;
const weatherElement = document.getElementById("weather") as HTMLDivElement;

getRandomJoke()
  .then((joke: Joke) => {
    jokeElement.innerHTML = `${joke.joke}`;
    jokesRecord.push(joke);
  })
  .catch((error: Error) => {
    console.error("Error fetching joke:", error);
  });

jokeButton.addEventListener("click", () => {
  getRandomJoke()
    .then((joke: Joke) => {
      jokeElement.innerHTML = `${joke.joke}`;
      jokesRecord.push(joke);
      console.log(joke);
    })
    .catch((error: Error) => {
      console.error("Error fetching joke:", error);
    });
});
 