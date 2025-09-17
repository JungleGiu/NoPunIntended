import type { Joke } from "./types.js";
import type { Weather } from "./types.js";
export declare const getRandomJoke: () => Promise<Joke>;
export declare const rateJoke: (joke: Joke, score: 1 | 2 | 3) => Joke;
export declare const getLocation: () => Promise<GeolocationPosition>;
export declare const getWeather: () => Promise<Weather>;
