import type { Joke } from "./types";
import type { Weather } from "./types";
export declare const getRandomJoke: () => Promise<Joke>;
export declare const rateJoke: (joke: Joke, score: 1 | 2 | 3) => Joke;
export declare const getWeather: () => Promise<Weather>;
//# sourceMappingURL=main.d.ts.map