export interface Joke {
    id: string;
    joke: string;
    score?: 1 | 2 | 3;
    date?: string;
}
export declare const jokesRecord: Joke[];
export declare const getRandomJoke: Function;
export declare const rateJoke: (joke: Joke, score: 1 | 2 | 3) => void;
//# sourceMappingURL=index.d.ts.map